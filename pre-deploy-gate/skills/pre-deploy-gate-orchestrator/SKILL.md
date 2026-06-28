---
name: pre-deploy-gate-orchestrator
description: 현재 프로젝트를 배포 전에 4축(현황 분석·코드 리뷰·보안 게이트·기능 확인)으로 종합 점검해 go/no-go 리포트와 HTML 대시보드를 artifacts에 남기고 사람 승인 게이트에서 멈추는 개발 하네스 입구. 현황 분석·코드 품질·기능은 프로젝트 로컬 에이전트(project-analysis-reviewer·code-quality-reviewer·functional-smoke-checker), 보안은 보안 팀(code-security-reviewer·supply-chain-deploy-verifier·security-triage-risk-rater)을 운영한다. 트리거 — "배포 전 점검", "릴리스 전 종합 점검", "이 변경 배포해도 되나", "종합 게이트", "보안만 점검", "시크릿/취약점/공급망 점검", "다시/부분 재실행". 보안만 필요하면 축 지정(보안) 모드로 실행한다. 운영 보안 태세는 security-posture-orchestrator를 쓴다.
---

# 배포 전 종합 게이트 오케스트레이터

현재 프로젝트를 배포 전에 4축으로 점검해 **종합 go/no-go**를 내는 팀장. **자기완결형** — 모든 축을 프로젝트 로컬 에이전트로 운영한다(전역 팀 비의존). 한 번에 모든 축을 돌리지 않고 **모드로 두께를 제어**한다.

## 자연어 라우팅
"배포 전 점검", "릴리스 전 종합 점검", "이 변경 배포해도 되나", "종합 게이트", "배포 전 품질+보안 확인", "보안만 점검", "시크릿/취약점/공급망·이미지 서명 점검", "다시 점검", "{축}만 다시" → 이 스킬. "보안만"은 축 지정(보안) 모드로 처리한다. 운영 보안 태세는 `security-posture-orchestrator`.

## 4축 ↔ 담당 (모두 프로젝트 로컬 에이전트)
| 축 | 담당 에이전트 | 보조 스킬 | 산출물 |
|---|---|---|---|
| ① 현황 분석 | `project-analysis-reviewer` | — | `01-analysis.md` |
| ② 코드 리뷰 | `code-quality-reviewer`(**보안 제외**) | `code-review`/`simplify`/`sc:analyze` | `02-code-review.md` |
| ③ 보안 게이트 | 보안 팀(`code-security-reviewer`·`supply-chain-deploy-verifier`·`security-triage-risk-rater`) | `reviewing-predeploy-security`/`triaging-security-findings` | `sec/01·02·03` |
| ④ 기능 확인 | `functional-smoke-checker` | `verify`/`run`/`sc:test` | `04-functional-smoke.md` |

**보안 단일 권위**: `code-quality-reviewer`가 발견한 보안 의심은 별도 보고하지 않고 ③의 rater(`security-triage-risk-rater`)로 합류시켜 중복을 제거한다.

**성능·DB 단일 권위**: 성능·DB 인덱스/쿼리 판정은 `code-quality-reviewer`가 단독으로 한다. `project-analysis-reviewer`는 구조·스키마를 **지도화만** 하고 성능 위반 등급을 매기지 않는다(① ↔ ② 중복 보고 방지).

## 실행 모드
| 모드 | 트리거 | 돌리는 축 |
|---|---|---|
| **빠른(기본)** | "배포 전 점검", "이 변경 괜찮아?" | ②(변경분) + ③ 코드 보안만(변경분, `code-security-reviewer` + rater) |
| **종합** | "릴리스 전 전체", "종합 게이트" | ① + ② + ③ 보안 팀 전체(+공급망) + ④ |
| **축 지정** | "보안만 점검", "성능만/분석만 다시" | 해당 축만(예: 보안만 = ③ 보안 팀 전체), README stale 갱신 |

**공급망은 릴리스 전용**: `supply-chain-deploy-verifier`(이미지·서명·SBOM·CI 공급망)는 **종합 모드 또는 "보안만/공급망" 명시 요청에서만** 돌린다. 일반 코드 diff엔 이미지·서명 산출물이 없어 N-A만 양산하므로 빠른 모드에선 생략한다.

## Phase 0 · 모드·재실행 확인
1. `artifacts/pre-deploy-gate/` 확인 → **초기 / 부분 재실행 / 새 실행** 분기.
2. 범위(변경분/전수)와 깊이(빠른/종합) 결정. 불명확하면 빠른+변경분으로 가정하고 명시.
3. run 디렉터리: `artifacts/pre-deploy-gate/{run-id}/`. 보안 산출물은 그 아래 `sec/`.

## Phase 1 · 축 실행 (병렬)
`TeamCreate`로 팀을 만들고 목표·출력형식·도구/출처·경계 4요소를 담아 `TaskCreate`로 위임한다. 모든 축은 프로젝트 로컬 에이전트(`subagent_type`)로 실행한다.
1. **③ 보안** — `code-security-reviewer`를 실행하고 `security-triage-risk-rater`로 triage한다(검토자는 `reviewing-predeploy-security`, 평가자는 `triaging-security-findings` 매뉴얼). **`supply-chain-deploy-verifier`는 종합 모드 또는 "보안만/공급망" 명시 요청에서만** 추가로 병렬 실행한다(빠른 모드 생략). 무거운 스캐너(semgrep·trivy fs)는 변경분 한정이 기본, 전수 스캔은 종합/승인 시에만. 산출물은 이 run의 `sec/`에 저장. "보안만" 요청이면 이 ③축만 실행한다.
2. **② 코드 리뷰** — `code-quality-reviewer` 실행(보안 제외, 아키/성능/스타일), 결과 `02-code-review.md`.
3. **① 분석**(종합 모드) — `project-analysis-reviewer` 실행, 결과 `01-analysis.md`.
4. **④ 기능**(종합 모드) — `functional-smoke-checker` 실행, 결과 `04-functional-smoke.md`.
5. 축 간 보안 의심은 rater로 전달(`SendMessage` 또는 파일 참조).

진행은 `TaskUpdate`/`TaskGet`으로 추적하고 지연 시 범위를 좁힌다.

## Phase 2 · 통합
1. 각 축 산출물을 읽어 `pre-deploy-gate-report.md`로 통합한다: 축별 요약 + 발견 + **종합 go/no-go** + 운영지표(게이트 통과율·미검증 수 등).
2. **종합 go/no-go 규칙**: 어느 축이든 확정 Critical 또는 보안 no-go가 있으면 전체 **no-go**. High만 있고 승인된 예외면 **conditional**. 그 외 **go(권고)**.
3. `pre-deploy-gate-dashboard.html` 생성 — 축별 카드·상태 배지·발견 표·운영지표. 단일 파일, 브라우저에서 바로 열림, 모바일 폭에서 표 넘침·겹침 없는지 확인. 대시보드 숫자는 리포트와 일치해야 한다.

## Phase 3 · 사람 승인 게이트
- 종합 go/no-go를 사용자에게 제시한다.
- **배포·머지·릴리스는 실행하지 않는다.** 무엇을·왜 승인하는지와 승인 시 일어날 일을 명시하고 멈춘다.
- 사용자의 명시적 승인 전에는 산출물을 "배포 가능"으로 바꾸지 않는다. 승인 후에만 상태를 갱신한다.

## Phase 4 · 정리·기록
- 보안 팀 `TeamDelete` 정리.
- `artifacts/README.md`의 축별 상태·stale·승인 갱신. 부분 재실행으로 최종 리포트를 다시 안 만들었으면 리포트는 `stale`/`needs-review`로.
- 개선점은 `artifacts/improvement-log.md`에.

## 산출물 계약
```
artifacts/pre-deploy-gate/{run-id}/
  01-analysis.md              # ① project-analysis-reviewer (종합)
  02-code-review.md           # ② code-quality-reviewer (보안 제외)
  sec/01-code-findings.md     # ③
  sec/02-supplychain-findings.md
  sec/03-triage-report.md     # ③ 위험도·예외·보안 go/no-go
  04-functional-smoke.md      # ④ (종합)
  pre-deploy-gate-report.md   # 통합 go/no-go + 운영지표
  pre-deploy-gate-dashboard.html
```
각 항목 **통과/위반/N-A/미검증** + 증거. 도구·테스트 부재는 미검증.

## 실패 시 대응
- 산출물 저장 실패 → 재시도 후 차단 보고(헛보고 금지).
- 특정 축 도구/에이전트 부재 → 그 축을 **미검증**으로 표기하고 전체를 통과로 위장하지 않는다.
- 보안 축 no-go면 다른 축 결과와 무관하게 종합 no-go.

## 품질 체크
- [ ] 보안 발견이 한 번만 보고됐다(code-quality-reviewer 보안 의심 → rater 합류)
- [ ] 성능·DB 판정이 code-quality-reviewer로 단일화됐다(① 분석과 중복 안 됨)
- [ ] 빠른 모드에서 공급망 축을 돌리지 않았다(종합/명시 요청에서만)
- [ ] N-A/미검증이 정직히 표기됐다
- [ ] 종합 go/no-go 규칙이 적용됐다
- [ ] HTML 대시보드 숫자가 리포트와 일치한다
- [ ] 배포·머지 전 사람 승인 게이트에서 멈췄다
- [ ] README 산출물 지도·stale·승인을 갱신했다
