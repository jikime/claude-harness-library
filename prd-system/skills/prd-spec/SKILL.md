---
name: prd-spec
description: 아이디어를 AI 개발 에이전트가 구현 가능한 19블록 PRD.md로 작성하는 작업 매뉴얼. Required Analysis, EARS 기반 기능 요구사항, 가정·미해결질문 명시, 서비스 유형별 Special Rules, 버전 명시 기술 스택 기본값을 규정한다. prd-author 에이전트가 따른다.
---

# PRD 작성 매뉴얼 (prd-spec)

목적: **PRD를 읽은 AI 개발 에이전트가 추가 질문 없이 구현을 시작**할 수 있게 한다. 단순 기획서가 아니라 구현 가능한 요구사항 명세서를 쓴다.

## 핵심 원칙
1. **구현 가능성 우선** — "사용자 친화적 UI"(나쁨) → "shadcn/ui 기반 반응형, 모바일 375px+, 다크모드"(좋음). 모든 요구는 검증 가능하게.
2. **무엇은 정밀하게, 어떻게는 여지를 둔다** — PRD는 요구·합격기준·인터페이스 계약을 못박되, 내부 구현 방식은 ARCHITECTURE에 맡긴다(과잉규정 금지).
3. **why 우선** — Problem/Goals는 "왜 지금 이걸 만드는가"를 먼저 잡는다.
4. **MVP 우선** — MVP 요청 시 최소 기능으로 축소, 나머지는 §17 Future Scope로.
5. **질문 최소화, 가정은 가시화** — 부족하면 합리적으로 가정하되 **모든 가정을 §4에 기록**한다. 몰래 가정 금지. 가정이 위험한 항목(결제·법적 책임 등)만 사람에게 묻는다.
6. **내용 보존** — 사용자가 준 사실·수치는 창작·왜곡하지 않는다.

## 시작 전 — 그라운딩 프로브
쓰기 전에 read-only로 근거를 잡는다: `idea.md`를 정독하고, 기존 코드베이스가 있으면 구조·스택·기존 패턴을 탐색한다. 추정으로 채우지 말고 관측된 것에 기반한다.

## Required Analysis → `analysis.md` (PRD 전에 작성)
중간 산출물. Cagan식 기회 평가를 겸한다.
- **Product**: 문제 정의 · 대상 사용자 · 핵심 가치 · 수익 모델 · MVP 범위
- **User**: Primary User · Secondary User · Pain Point · Expected Outcome
- **Technical**: 인증 / 결제 / 파일 업로드 / AI 기능 / 관리자 기능 / 외부 API 필요 여부
- **서비스 유형 판정**: SaaS / AI / Agent 중 무엇인가 (복수 가능) → Special Rules 적용 결정

## 기술 스택 기본값 (미지정 시, 버전 명시)
- Frontend: Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS · shadcn/ui
- Backend: Next.js API Route / Server Actions
- DB: PostgreSQL (+ Prisma ORM)
- Auth: NextAuth (Auth.js)
- AI: OpenAI API (모델은 ARCHITECTURE에서 확정)
- Deploy: Vercel

정확한 패치 버전 핀은 ARCHITECTURE.md에서 확정한다. 스택을 가정했다면 §4 Assumptions에 기록한다.

## PRD.md 출력 형식 — 19블록

```
# PRD: {제품명}

## 0. Related Artifacts / Links
- ARCHITECTURE: ./ARCHITECTURE.md (생성 후) · TASKS: ./TASKS.md (생성 후)
- 디자인/레포/참고: (있으면 링크, 없으면 "TBD")

## 1. Product Overview        — 한 문단 + (선택) 고객 관점 한 문장

## 2. Problem Statement       — 해결할 문제 + Context(경쟁 구도·왜 지금)

## 3. Goals
### Business Goals  ### User Goals  ### Success Metrics(측정 가능한 KPI)

## 4. Assumptions             — 표: [가정 / 근거 / 검증상태(가정|검증됨|확인 필요)]
                                추론한 스택·서비스유형·범위를 전부 여기 기록

## 5. User Personas           — Primary / Secondary (목표·맥락·pain)

## 6. User Flow               — Mermaid flowchart TD

## 7. Functional Requirements — FR-### 단위, EARS 문법 (아래 참조)

## 8. Non-Functional Requirements — Performance / Security / Accessibility / Scalability

## 9. Screens                 — Screen별: 목적 / 구성 요소 / 사용자 행동

## 10. Data Model (요약)       — 엔티티 목록·핵심 필드·관계만. 상세 스키마·인덱스는 ARCHITECTURE

## 11. API Summary (요약)      — 핵심 엔드포인트와 목적만. 상세 Req/Res는 ARCHITECTURE

## 12. Edge Cases             — EARS Unwanted Behaviors 패턴으로 (오류·실패·재시도)

## 13. Security Considerations — 인증 / 권한 / 입력 검증 / Rate Limit

## 14. Analytics              — 추적 이벤트 / KPI / 전환율

## 15. Dependencies & Impact  — 외부 의존(결제·외부 API·서드파티) / 내부 영향 / 선행 조건

## 16. Out of Scope           — 이번 릴리스에서 "일부러 안 하는" 것 (≠ Future Scope)

## 17. Future Scope           — MVP 이후 확장

## 18. Build Plan             — Phase 1(핵심) / Phase 2(고도화) / Phase 3(확장)

## 19. Open Questions         — 아직 못 정한 것 / 추가 입력 필요. 없으면 "없음" 명시
```

## EARS 문법 (§7 기능 요구사항·§12 엣지케이스)
형식: `While <전제>, when <트리거>, the <시스템> shall <응답>`. 절은 항상 이 순서.
5개 패턴:
- **Ubiquitous**: `The system shall <응답>` — 항상 성립하는 속성
- **Event-Driven**: `When <트리거>, the system shall <응답>`
- **State-Driven**: `While <상태>, the system shall <응답>`
- **Optional**: `Where <기능 존재>, the system shall <응답>`
- **Unwanted Behavior**: `If <원치 않는 조건>, then the system shall <대응>` — §12 Edge Cases에 활용

각 FR은 아래를 갖춘다:
```
### FR-001 {기능명}
- Requirement (EARS): When 사용자가 …, the system shall …
- Acceptance Criteria: 테스트 가능한 합격 기준 + 샘플 입력/출력
- (선택) Example: 실제 코드/데이터 예시 1개
```

## Special Rules (서비스 유형별 자동 포함)
- **SaaS**: 회원가입 · 로그인 · 권한(RBAC) · 구독/결제 · 관리자 기능을 FR·Screens·Data에 자동 포함
- **AI 서비스**: Prompt 설계 · Model 선택 · Token 비용 · Evaluation · Guardrail 섹션 자동 포함
- **Agent 서비스**: Agent 정의 · Skill 정의 · Tool 정의 · Workflow 정의 · Memory 정의 · Human Review Point 자동 포함

## 품질 체크 (제출 전 자가 점검)
- [ ] 모든 FR이 EARS로 작성돼 트리거·응답이 명시됐는가
- [ ] 모든 FR에 테스트 가능한 Acceptance Criteria가 있는가
- [ ] 내린 모든 가정이 §4에 기록됐는가 (몰래 가정 없음)
- [ ] §19 Open Questions 블록이 존재하는가 (빈칸이면 "없음")
- [ ] §10/§11이 **요약** 수준인가 (상세는 ARCHITECTURE로 미뤘는가)
- [ ] 서비스 유형에 맞는 Special Rules가 적용됐는가
- [ ] §16 Out of Scope로 범위 경계가 명시됐는가
- [ ] 막연한 표현("직관적", "빠른")을 측정 가능한 기준으로 바꿨는가
