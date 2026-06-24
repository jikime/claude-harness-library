---
name: prd-pipeline-orchestrator
description: 아이디어를 받아 AI 개발 에이전트가 추가 질문 없이 구현 가능한 기획 산출물 3종(PRD.md → ARCHITECTURE.md → TASKS.md)을 단계별 검증 게이트와 함께 생성하고, 외부 에이전트가 만든 구현 코드를 그 기준으로 리뷰하는 4단계 파이프라인의 입구·진행 관리자. 사용 키워드 — "PRD 만들어줘", "서비스 기획서", "요구사항 문서", "MVP 설계", "제품 명세서", "이 아이디어를 서비스로", "아키텍처 설계해줘", "시스템 설계", "태스크 쪼개줘", "구현 작업 분해", "구현 리뷰해줘", "코드가 스펙대로인지", "PRD만 다시", "아키텍처부터 다시", "태스크만 업데이트", "이전 PRD 기반으로", "재실행", "보완".
---

# PRD Pipeline Orchestrator (전체 진행표)

막연한 아이디어를 **AI 개발 에이전트가 추가 질문 없이 구현을 시작할 수 있는** 기획 산출물로 바꾸는 4단계 파이프라인의 진행 관리자다. 핵심 가치는 "PRD 한 장"이 아니라 **단계 사이의 구현가능성·정합성 게이트**와 **재실행 가능한 포장**이다.

```
idea → [1] PRD.md → [2] ARCHITECTURE.md → [3] TASKS.md → [4] 구현 리뷰
         (prd-author)  (architecture-designer)  (task-planner)  (implementation-reviewer)
           ↑ 각 단계 사이 readiness-reviewer 게이트(검증 훅) ↑
```

## 팀 (역할 카드는 `.claude/agents/`)
- `prd-author` — Required Analysis + 19블록 PRD 작성 (`prd-spec` 따름)
- `architecture-designer` — C4 + Product ADR로 시스템 설계 (`architecture-spec` 따름)
- `task-planner` — Agent Operating Guide + 추적 가능한 태스크 분해 (`task-spec` 따름)
- `implementation-reviewer` — 구현 코드를 TASKS/PRD/ARCH 기준 리뷰 (`implementation-review` 따름)
- `readiness-reviewer` — **별도 평가자**. 각 산출물 구현가능성 + 단계 간 정합성 게이트 (`readiness-check` 따름)

협업 패턴은 **순차 핸드오프 파이프라인**이다(라이브 Agent Team 아님 — 근거: `artifacts/adr/0001-sequential-pipeline.md`). 각 단계는 상류 산출물 **파일**을 읽어 일하고, 단계 사이에 readiness-reviewer가 점진적 게이트를 건다.

## 실행 모드 (먼저 분기)

`artifacts/{product-slug}/` 존재 여부와 사용자 요청으로 모드를 정한다.

| 모드 | 트리거 | 처리 |
| --- | --- | --- |
| 초기 실행 | 아이디어만 있음, 해당 slug 산출물 없음 | 1→2→3 전 단계 생성 + 게이트 |
| 부분 재실행 | "PRD만 다시", "아키텍처부터 다시", "태스크만 업데이트", "이전 PRD 기반으로", "보완", "재실행" | 지정 단계부터만 재생성, 하류는 즉시 `stale` |
| 구현 리뷰 | TASKS와 실제 코드가 있음, "구현 리뷰", "스펙대로인지" | 4단계만 실행 |

부분 재실행 시: 바뀐 단계의 하류 산출물을 `artifacts/README.md`에서 `stale`로 표시하고, 그 stale 산출물을 최종 판단에 쓰지 않는다.

## 실행 흐름

### 0. 준비
1. `product-slug`를 정한다(아이디어 한 줄을 kebab-case로). 사용자 입력이 있으면 `artifacts/{slug}/idea.md`로 저장한다.
2. `artifacts/` 존재 여부를 확인하고 모드를 분기한다.
3. **질문 최소화**: 제품 도메인 정보가 부족하면 합리적으로 가정하되, 가정은 반드시 PRD §4 Assumptions에 기록하도록 prd-author에 지시한다. 필수 정보(예: 결제·법적 책임처럼 가정이 위험한 항목)만 사용자에게 묻는다.

### 1. PRD 단계
1. `prd-author`를 dispatch한다. 위임에 4요소를 담는다: 목표(`artifacts/{slug}/PRD.md` 작성) · 출력 형식(`prd-spec`의 19블록 + EARS) · 입력/근거(`idea.md`, 있으면 기존 코드베이스를 read-only 그라운딩 프로브) · 경계(내용 창작 금지, 가정은 §4에 기록).
2. 중간 산출물 `artifacts/{slug}/analysis.md`(Required Analysis = Cagan식 기회 평가 겸용)와 최종 `PRD.md`가 나온다.
3. **게이트(PRD)**: `readiness-reviewer`를 dispatch해 `readiness-check`의 PRD 항목으로 검증 → `artifacts/{slug}/readiness.md`에 추가.

### 2. ARCHITECTURE 단계
1. PRD 게이트 통과 후 `architecture-designer`를 dispatch한다. 입력: `PRD.md`(특히 §10 Data·§11 API 요약을 상세로 전개) + 그라운딩 프로브.
2. 산출물 `artifacts/{slug}/ARCHITECTURE.md`.
3. **게이트(PRD↔ARCH 정합)**: readiness-reviewer가 추적성(모든 FR이 컴포넌트로 매핑되는가) + ADR 적정성 검증.

### 3. TASKS 단계
1. `task-planner`를 dispatch한다. 입력: `ARCHITECTURE.md` + `PRD.md`.
2. 산출물 `artifacts/{slug}/TASKS.md` (Agent Operating Guide 전문 + 추적 가능한 태스크).
3. **게이트(ARCH↔TASKS 정합)**: readiness-reviewer가 추적성 + 6대 운영영역 + boundaries 검증.

### 4. 구현 리뷰 단계 (코드가 있을 때만)
1. `implementation-reviewer`를 dispatch한다. 입력: `TASKS.md`·`PRD.md`·`ARCHITECTURE.md` + 실제 코드(read-only 프로브).
2. 산출물 `artifacts/{slug}/implementation-review.md` — 태스크별 통과/탈락, 추적성 갭, boundary 위반, 보안. **판정은 권고**다.

### 게이트 실패 처리 (종료 계약)
- readiness 게이트 실패 시 해당 단계 생성자에게 readiness.md의 지적과 함께 되돌린다.
- 최대 **2라운드**. 2라운드 후에도 미통과거나 수렴이 정체되면 **사람에게 에스컬레이션**하고 멈춘다. 라운드가 품질을 떨어뜨리면 best 버전으로 롤백한다.

### 마무리 — 사람 승인 게이트 (능동)
산출물을 `사용 가능(=구현 착수용)`으로 바꾸기 전에 **멈추고** 사용자에게 명시적으로 묻는다:
1. README의 산출물 상태를 갱신한다(생성된 것은 `사람 승인 필요`).
2. 사용자에게 **무엇을·왜 승인해야 하는지**와 **PRD §19 Open Questions의 답**을 요청한다. (예: "Open Questions 3건을 확정해 주시면 산출물을 구현 착수용으로 승격합니다.")
3. 사용자의 명시적 승인 + Open Questions 답을 받기 전에는 상태를 `사용 가능`으로 바꾸지 않고, 다음 행동(구현 리뷰 진행, 외부 핸드오프)도 하지 않는다.
4. 구현 리뷰의 merge/배포 판단은 항상 권고로 두고 자동 실행하지 않는다.

## 산출물 계약 (`artifacts/{product-slug}/`)
| 파일 | 단계 | 만든 Agent | 다음에 읽는 Agent |
| --- | --- | --- | --- |
| `idea.md` | 입력 | 사용자/Orchestrator | prd-author |
| `analysis.md` | 1-중간 | prd-author | prd-author, readiness-reviewer |
| `PRD.md` | 1-최종 | prd-author | architecture-designer |
| `ARCHITECTURE.md` | 2 | architecture-designer | task-planner |
| `TASKS.md` | 3 | task-planner | (외부 구현), implementation-reviewer |
| `readiness.md` | 게이트 | readiness-reviewer | Orchestrator, 사람 |
| `implementation-review.md` | 4 | implementation-reviewer | 사람 |

공통: `artifacts/README.md`(산출물 지도·상태), `artifacts/improvement-log.md`, `artifacts/adr/`.
산출물을 만들거나 갱신할 때마다 `artifacts/README.md`의 해당 행 상태(`작성중`/`사용 가능`/`사람 승인 필요`/`stale`/`needs-review`)를 갱신한다.

## 품질 체크
- 모든 단계가 **파일**로 핸드오프됐는가(대화로만 지나간 단계 없음).
- 부분 재실행 시 하류 stale 처리가 됐는가.
- 사람 승인 게이트가 라벨만 붙이지 않고 **실제로 멈추고 물었는가**.
- 추적성: 모든 FR-### → ARCH 컴포넌트 → TASK로 이어지는가.
