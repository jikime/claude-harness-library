---
name: task-spec
description: 확정된 ARCHITECTURE.md와 PRD.md를 받아 AI 개발 에이전트가 하나씩 구현할 수 있는 TASKS.md로 분해하는 작업 매뉴얼. Agent Operating Guide 전문(명령·테스트·구조·코드스타일·git·3단계 boundaries)과 추적 가능한(FR·컴포넌트 참조) 작고 검증 가능한 태스크를 규정한다. task-planner 에이전트가 따른다.
---

# 태스크 분해 매뉴얼 (task-spec)

목적: 설계를 **외부 AI 에이전트가 한 번에 하나씩 안전하게 구현**할 수 있는 작고 리뷰 가능한 청크로 쪼갠다. TDD처럼 각 태스크가 특정 요구 한 조각을 풀고 검증된다.

## 시작 전 — 그라운딩 프로브
`ARCHITECTURE.md`와 `PRD.md`를 정독한다. 컴포넌트·데이터·API·FR을 태스크 매핑 대상으로 목록화한다. 기존 코드베이스가 있으면 디렉터리·테스트·빌드 방식을 탐색해 Operating Guide에 실제 값을 채운다.

## TASKS.md 출력 형식

> **깊이(lite/full)**: lite여도 Agent Operating Guide·추적성(Maps to)·실행 가능한 Verification·boundaries(⚠️/🚫)는 **그대로 유지**한다. 축소는 태스크 분량(작은 범위 = 적은 태스크)에만 적용한다.

```
# TASKS: {제품명}

## 0. Links — PRD: ./PRD.md · ARCHITECTURE: ./ARCHITECTURE.md

## Agent Operating Guide (구현 에이전트가 먼저 읽는다)
### Tech Stack         — 버전 핀 (ARCHITECTURE에서 가져옴)
### Commands           — 설치/실행/빌드/테스트/린트 전체 명령 (예: npm test, npm run build)
### Testing            — 프레임워크 · 테스트 파일 위치 · 커버리지 기대
### Project Structure  — 디렉터리 매핑 (src/ tests/ app/ 등)
### Code Style         — 말 대신 실제 코드 예시 1개 (네이밍·패턴)
### Git Workflow       — 브랜치 네이밍 · 커밋 포맷 · PR 요건
### Boundaries (3단계)
  - ✅ Always (승인 불필요): 예) 커밋 전 테스트 실행
  - ⚠️ Ask first (사람 검토): 예) DB 스키마 변경, 의존성 추가, 외부 API 키 사용
  - 🚫 Never (하드 스톱): 예) 시크릿 커밋, prod 설정 변경, node_modules 편집

## Tasks
### T-001 {태스크명}
- Maps to: FR-00X / ARCH 컴포넌트명   ← 추적성 (필수)
- Description: 무엇을 만드는가 (한 조각)
- Files: 만들/고칠 파일 경로
- Depends on: T-00Y (없으면 "none")
- Parallelizable: yes/no
- Verification: 이 태스크가 끝났음을 어떻게 확인하나 (실행할 테스트/명령)
- Acceptance: 통과 기준 (PRD AC와 연결)
- Self-check: "완료 후 스펙 항목 대조해 누락 표시"

### T-002 …
```

## 분해 원칙
- **작고 독립 리뷰 가능**: 한 태스크 = 한 PR로 리뷰 가능한 크기. 너무 크면 쪼갠다.
- **추적성 필수**: 모든 태스크가 FR-### 또는 ARCH 컴포넌트를 명시 참조한다. 어떤 FR/컴포넌트도 담당 태스크가 없으면 안 된다(orphan 금지).
- **의존 순서**: 선행 태스크를 명시하고, PRD §18 Build Plan의 Phase로 묶는다. 병렬 가능한 것을 표시한다.
- **검증 내장**: 각 태스크에 실행 가능한 verification(테스트/명령)을 단다. "동작 확인" 같은 모호한 표현 금지.
- **모듈성**: 백엔드/프론트/DB/API 등 도메인으로 묶어, 구현 에이전트가 한 번에 관련 정보만 보도록 한다(지시 과다 방지).
- **Boundaries 필수**: ⚠️/🚫 boundary는 비워두지 않는다. 최소한 "시크릿 커밋 금지"는 항상 포함.

## 품질 체크
- [ ] 모든 FR-### / 컴포넌트가 최소 한 태스크로 추적되는가
- [ ] 모든 태스크가 Maps to(FR/컴포넌트)를 갖는가
- [ ] 모든 태스크에 실행 가능한 Verification이 있는가
- [ ] Agent Operating Guide의 6영역(Commands/Testing/Structure/Style/Git/Boundaries)이 모두 채워졌는가
- [ ] Boundaries의 ⚠️/🚫가 구체적으로 명시됐는가
- [ ] 의존 순서·Phase가 일관되는가
