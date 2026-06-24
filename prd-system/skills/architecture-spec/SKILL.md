---
name: architecture-spec
description: 확정된 PRD.md를 받아 AI 개발 에이전트가 구현 가능한 ARCHITECTURE.md로 전개하는 작업 매뉴얼. C4 모델(Context/Container/Component), PRD 요약을 받은 상세 데이터·인터페이스 설계, NFR 실현 방안, Product ADR(되돌리기 어려운 결정)을 규정한다. architecture-designer 에이전트가 따른다.
---

# 아키텍처 설계 매뉴얼 (architecture-spec)

목적: PRD의 **무엇(what)**을 **어떻게(how)**로 옮긴다. PRD §10/§11의 요약을 상세 설계로 전개하고, 되돌리기 어려운 결정을 ADR로 남긴다. 다이어그램(C4)은 "무엇처럼 생겼나", ADR은 "왜 그렇게 됐나"를 담아 서로를 참조한다.

## 시작 전 — 그라운딩 프로브
`PRD.md` 전체(특히 §4 Assumptions, §7 FR, §8 NFR, §10 Data, §11 API, §15 Dependencies)를 정독한다. 기존 코드베이스가 있으면 현재 아키텍처·스택·패턴을 read-only로 탐색해 근거를 잡는다. PRD의 각 FR-###을 추적 대상으로 목록화한다.

## ARCHITECTURE.md 출력 형식

```
# Architecture: {제품명}

## 0. Links — PRD: ./PRD.md · TASKS: ./TASKS.md (생성 후)

## 1. System Context (C4 Level 1)
   Mermaid. 시스템 + 외부 행위자(사용자 역할) + 외부 시스템(결제·OpenAI·이메일 등)

## 2. Container View (C4 Level 2)
   Mermaid. 배포 단위(Web 앱, API, DB, 백그라운드 워커, 외부 서비스).
   컨테이너별: 책임 + 기술 스택 + **버전 핀**(예: Next.js 15.x, PostgreSQL 16)

## 3. Component View (C4 Level 3) — 핵심 컨테이너만
   주요 모듈/레이어와 책임. 각 컴포넌트가 담당하는 FR-### 명시(추적성)

## 4. Data Design (상세)
   PRD §10 요약을 전개: 엔티티별 전체 스키마(필드·타입·제약), 관계(ERD Mermaid),
   인덱스 전략, 마이그레이션 고려. (예: Prisma schema 스니펫)

## 5. Interface Design (상세)
   PRD §11 요약을 전개: 엔드포인트별 Method/경로/Request/Response/상태코드/에러,
   내부 모듈 인터페이스, 외부 연동 계약(웹훅·콜백 포함)

## 6. NFR Realization
   PRD §8의 Performance/Security/Accessibility/Scalability를 "어떻게 달성하는가"로.
   (예: 캐싱 전략, 인증 흐름, rate limit 구현 위치, 수평 확장 지점)

## 7. Product ADRs
   되돌리기 어렵거나 구조에 영향을 주는 결정만. 각 ADR:
   - Status: Proposed / Accepted / Superseded
   - Context: 어떤 (비)기능 요구가 이 결정을 강제했는가
   - Decision: 무엇을 택했는가
   - Alternatives rejected: 버린 대안과 이유
   - Consequences: 트레이드오프·결과
   - Confidence: 높음/중간/낮음 (낮으면 재검토 트리거 명시)

## 8. Deployment View
   실행/배포 토폴로지(Vercel·DB 호스팅·환경 분리·시크릿 관리 위치)

## 9. Risks & Tech Debt
   알려진 위험, 의도적으로 미룬 부채, 모니터링 지점
```

## 설계 원칙
- **PRD 요구를 빠짐없이 커버**: 모든 FR-###이 최소 한 컴포넌트로 매핑돼야 한다(orphan FR 금지). PRD에 없는 기능을 임의 추가하지 않는다.
- **PRD 가정·미해결질문 처리**: PRD §4 각 가정과 §19 각 질문을 아키텍처에서 **해소하거나 명시적으로 이월**한다(미해소 시 §9 또는 ADR에 남김).
- **버전 핀**: 스택은 구체 버전까지. "최신"이라 쓰지 않는다.
- **과설계 금지**: MVP 범위에 맞춘다. §9에 미래 확장 지점만 표시하고 지금 구현하지 않는다.
- C4와 ADR은 서로 참조한다(컴포넌트 ↔ 그 컴포넌트를 만든 결정).

## 품질 체크
- [ ] 모든 PRD FR-###이 컴포넌트로 추적되는가 (양방향 orphan 없음)
- [ ] PRD §10/§11 요약이 상세 스키마·API 계약으로 전개됐는가
- [ ] 되돌리기 어려운 결정마다 ADR(대안·트레이드오프·confidence 포함)이 있는가
- [ ] NFR이 "어떻게 달성"으로 구체화됐는가
- [ ] PRD의 각 가정·미해결질문이 해소 또는 이월됐는가
- [ ] 스택 버전이 핀됐는가
