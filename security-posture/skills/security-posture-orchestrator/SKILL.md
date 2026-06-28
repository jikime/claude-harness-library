---
name: security-posture-orchestrator
description: 운영 중인 서비스의 보안 태세를 4개 도메인(클라우드·인프라·네트워크 / 위협 탐지·모니터링 / ID·접근·데이터 보호 / IR·복원력·컴플라이언스)으로 평가하는 팀을 운영해 성숙도 스코어카드·갭·리메디에이션 백로그와 HTML 대시보드를 artifacts에 남기고 사람 승인 게이트에서 멈추는 오케스트레이터. "운영 보안 체크리스트"를 SSOT로 쓴다. 트리거 — "운영 보안 점검", "보안 태세 평가", "클라우드 보안 감사", "IR 준비도 점검", "컴플라이언스 갭 분석", "분기 보안 점검", "태세 다시 평가". 배포 전 코드/산출물 점검은 pre-deploy-gate-orchestrator를 쓴다.
---

# 운영 보안 태세 오케스트레이터

운영 서비스의 보안 태세를 4 도메인으로 평가해 **성숙도 스코어카드 + 리메디에이션 백로그**를 내는 팀장. 개발 게이트(`pre-deploy-gate`)와 완전히 분리된 상시/주기 점검이다.

## 자연어 라우팅
"운영 보안 점검/태세 평가", "클라우드 보안 감사", "IR 준비도", "컴플라이언스 갭", "분기 보안 점검", "태세 다시/도메인만 다시" → 이 스킬. "배포 전/PR 점검" → `pre-deploy-gate-orchestrator`.

## 팀 구성 (Agent Team)
| 도메인 | 감사관 | 산출물 |
|---|---|---|
| ① 클라우드·인프라·네트워크 | `cloud-infra-network-auditor` | `01-cloud-infra-network.md` |
| ② 위협 탐지·모니터링 | `threat-detection-monitoring-auditor` | `02-threat-detection-monitoring.md` |
| ③ ID·접근·데이터 보호 | `identity-data-protection-auditor` | `03-identity-data-protection.md` |
| ④ IR·복원력·컴플라이언스 | `ir-resilience-compliance-auditor` | `04-ir-resilience-compliance.md` |
| 종합 채점 | `posture-maturity-synthesizer` | `posture-scorecard.md` |

감사관은 `assessing-security-posture`, 평가자는 `scoring-posture-maturity` 매뉴얼을 따른다. 기준 정본은 `assessing-security-posture` 스킬의 `references/ops-security-checklist.md`(스킬과 함께 배포).

## Phase 0 · 적용 가능성·모드·재실행 확인
1. **증거 사전점검(적용 가능성 게이트)**: 대상에 운영 증거가 있는지 먼저 본다 — IaC(Terraform/K8s/Helm)·클라우드 설정·정책/런북/플레이북·모니터링 설정·접근 검토 기록·컴플라이언스 문서. **운영 발자국이 거의 없으면**(예: 평범한 코드 레포) 4 도메인을 다 띄우지 않는다. 대부분 N-A/미검증이 될 것임을 사용자에게 알리고, **증거 있는 도메인만** 평가하거나 배포 전 코드/산출물 점검이면 `pre-deploy-gate`를 권한다.
2. `artifacts/security-posture/` 확인 → **초기 / 부분 재평가 / 새 실행** 분기.
3. 범위 모드: **전체 태세 평가(기본)** = 증거가 있는 도메인 / **도메인 지정** = "클라우드만"·"IR만" 등.
4. **라이브 클라우드 접근 승인**: 자격증명이 있고 라이브 조회가 필요하면, 어떤 read-only 조회(메타데이터/설정만)를 할지 사용자에게 알리고 승인을 받는다. 미승인이면 파일 증거로만 판정(나머지 미검증).
5. run 디렉터리: `artifacts/security-posture/{run-id}/`.
6. 부분 재평가면 해당 도메인 파일만 갱신하고 나머지는 README에서 stale 처리.

## Phase 1 · 도메인 평가 (병렬, 증거 있는 도메인만)
1. **증거 있는 도메인만 띄운다.** Phase 0 사전점검에서 도메인 증거가 없으면 그 감사관을 돌리지 말고 도메인을 N-A/미검증으로 표기한다. 특히 **② 위협탐지(SIEM·EDR·UEBA)는 모니터링 설정·탐지 규칙·런북이 제공될 때만** 띄운다(코드/IaC만으로는 미검증만 양산).
2. `TeamCreate` → `TaskCreate` **병렬**: 선택된 감사관(목표·증거 출처·read-only 경계·라이브 승인 여부·산출 경로 전달).
3. 각 감사관은 IaC·설정·문서(+승인된 경우 메타데이터 read-only 라이브)로 평가해 도메인 파일 저장. 겹치는 통제는 `SendMessage`로 공유.
4. `TaskUpdate`/`TaskGet`으로 진행 추적, 지연 시 범위 축소.

## Phase 2 · 종합 채점
1. 4 도메인 완료 후 `TaskCreate`로 `posture-maturity-synthesizer` 실행.
2. 도메인별 성숙도 점수·갭 우선순위·리메디에이션 백로그 → `posture-scorecard.md`.

## Phase 3 · 통합·대시보드
1. 오케스트레이터가 스코어카드를 기준으로 `posture-dashboard.html` 생성 — 도메인별 성숙도(레이더/카드)·갭 표·Top 우선순위. 단일 파일, 브라우저에서 바로 열림, 모바일 폭 확인. 대시보드 숫자는 스코어카드와 일치.
2. 일시 stamp, `artifacts/README.md` 상태·stale 갱신.

## Phase 4 · 사람 승인 게이트
- 종합 성숙도·Top 갭·백로그를 사용자에게 제시한다.
- **리메디에이션을 자동 실행하지 않는다.** 평가 채택·컴플라이언스 준비 판정 전 무엇을·왜 승인하는지 명시하고 멈춘다.
- 승인 전에는 컴플라이언스 "준비 완료/달성"으로 표기하지 않는다.

## Phase 5 · 정리
- `TeamDelete`로 팀 정리.
- 개선점은 `artifacts/improvement-log.md`에 기록.

## 실패 시 대응
- 산출물 저장 실패 → 재시도 후 차단 보고(헛보고 금지).
- 접근/증거 부재 → 해당 통제 **미검증**으로 남기고 태세를 양호로 위장하지 않는다.
- 라이브 접근은 **사용자 승인 후, 메타데이터/설정 조회만**(시크릿·데이터 추출·변경 명령 금지). 승인 없으면 파일 증거로만 판정한다.

## 산출물 계약
```
artifacts/security-posture/{run-id}/
  01-cloud-infra-network.md
  02-threat-detection-monitoring.md
  03-identity-data-protection.md
  04-ir-resilience-compliance.md
  posture-scorecard.md          # 성숙도 + 갭 + 백로그
  posture-dashboard.html
```

## 품질 체크
- [ ] 적용 가능성 사전점검을 했다(운영 발자국 없으면 도메인 축소/pre-deploy-gate 안내)
- [ ] 모든 통제가 4상태로 판정되고 N-A/미검증이 정직히 표기됐다
- [ ] 감사(생성)와 채점(synthesizer)이 분리됐다
- [ ] 라이브 조회는 승인 후 메타데이터만 했다(시크릿/데이터 추출·변경 없음)
- [ ] 리메디에이션 자동 실행 없이 사람 승인 게이트에서 멈췄다
- [ ] HTML 대시보드 숫자가 스코어카드와 일치한다
- [ ] README 산출물 지도·stale를 갱신했다
