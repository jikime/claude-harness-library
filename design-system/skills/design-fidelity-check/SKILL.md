---
name: design-fidelity-check
description: 디자인 시스템 산출물을 객관적으로 검수하는 작업 매뉴얼. 모드 A는 DESIGN.md 무결성(broken-ref·contrast-ratio·orphaned-tokens·완성도)과 골든 예제↔원본 스크린샷 라운드트립 일치를 검증한다. 모드 B는 생성된 페이지가 DESIGN.md 토큰과 examples/layout.md를 실제로 지키는지(off-system 색/폰트 차단·접근성·반응형·AI 티)를 검증한다. 모드 C는 기존 프로젝트 적용(retrofit)이 시스템 적합성과 기능 비회귀를 지키는지 검증한다. design-system-reviewer 에이전트가 따른다. 생성과 분리된 회의적 평가자.
---

# design-fidelity-check — 검수 매뉴얼 (모드 A/B/C)

검수자는 **생성하지 않는다.** 만든 사람(author/builder)이 자기 결과를 합격시키지 못하므로, 회의적으로 본다. 모든 판정은 가능한 한 외부 신호(토큰 값·대비 수치·스크린샷 대조)에 묶고, `합격 / 조건부 / 불합격`과 구체 수정 지시를 남긴다.

> **경로 규칙(다중 사이트)**: 검수 대상·리포트는 사이트 네임스페이스 `artifacts/sites/{slug}/` 아래에 있다(Orchestrator가 슬러그를 지정). 리포트는 `artifacts/sites/{slug}/reviews/`에 저장. 본문 예시의 경로는 이 규칙으로 치환해 읽는다.

## 공통 출력 형식

`artifacts/sites/{slug}/reviews/{대상}.md`:
```markdown
# 검수 리포트 — {대상} (모드 A/B/C)
판정: 합격 | 조건부 합격 | 불합격
요약: ...
## 위반/결함 (심각도 순)
- [critical] {위치} — {무엇이} {왜 문제} → {수정 지시}
- [major] ...
- [minor] ...
## 통과 항목
- ...
## 재실행 지시
- 누구(author/builder)에게 / 무엇만 다시
```
라운드 상한 3회. 3회 후 미통과면 best를 유지하고 사람 승인 에스컬레이션.

---

## 모드 A — DESIGN.md 무결성 + 라운드트립

대상: `artifacts/sites/{slug}/DESIGN.md`(드래프트) (+ `.../examples/{archetype}/example.html` ↔ `reference-*.png`).

### A1. broken-ref
- 본문·components의 모든 `{group.token}`이 프론트매터에 정의돼 있는가. 없는 참조를 전부 나열.

### A2. contrast-ratio (WCAG AA)
- 각 component의 `textColor` ↔ `backgroundColor` 쌍의 명암비 계산. 본문 텍스트 ≥4.5:1, 큰 텍스트(24px+/bold 18px+) ≥3:1.
- 미달 쌍을 `검정#000 on lime#dceeb1 = 1.4:1 ❌`처럼 수치와 함께.
- 색블록 위 텍스트(예: navy 블록 inverse-ink)도 검사.

### A3. orphaned-tokens
- 정의됐으나 components·본문 어디서도 참조 안 되는 토큰 → 삭제 후보로 표시(불합격 아님, 경고).

### A4. 완성도 (designmd-spec 대비)
- 프론트매터 8키(version~components) 존재. 타이포 역할 6필드 충족. 본문 11~12섹션 존재.
- 색 역할이 의미 기반인가. 변형이 components 항목으로 분리됐는가. Known Gaps가 추정/미관측을 정직히 적었는가.
- **표준 컴포넌트 커버리지**: `analysis/tokens.md`(또는 캡처)에서 **사이트에 존재가 확인된** 표준 컴포넌트(button·pulldown·field·input·textarea·select·checkbox·radio·switch·date·card·table·tabs·dialog·popover·alert·toast·tooltip·badge·calendar)가 DESIGN.md components에 빠짐없이 들어갔는가. 존재하는데 누락된 것을 지적 → author 회송. 단, **사이트에 없는 컴포넌트를 요구하지 않는다**(present-gated). 상호작용 트리거 실패로 미관측인 항목은 Known Gaps에 적혔는지 확인.
- **동적·구조 토큰 커버리지(present-gated)**: 인벤토리에 관측된 `motion`·`zIndex`·`opacity`·`border`·`focus`·`icon`(+ 상황형 dataviz·gradient·blur·skeleton·themes)이 DESIGN.md에 토큰 그룹으로 들어갔는가. 특히 **오버레이를 캡처했다면 zIndex가, 폼/버튼이 있으면 focus-ring이** 있어야 정합. 관측됐는데 누락이면 지적, 미관측이면 Known Gaps 확인. 없는 그룹을 강요하지 않는다.
- **3계층 방향**: primitive 층이 있으면 semantic이 이를 참조하는가, 역참조(primitive→semantic) 없는가(`tier-direction`).

### A5. 라운드트립 대조 (핵심)
- `example.html`을 (Playwright로 스크린샷 떠서 또는 직접 렌더해) `reference-*.png`와 대조:
  - 섹션 순서 일치 / 섹션별 색블록 토큰 일치 / 그리드 컬럼 수 일치 / 여백 리듬 근사.
  - 데스크톱·모바일 둘 다. 불일치는 "hero가 중앙정렬인데 원본은 좌측정렬" 식으로.
- 라운드트립이 크게 어긋나면 DESIGN.md 또는 layout.md가 원본을 못 담은 것 → analyzer/author로 회송.

### A6. 디자인시스템 쇼케이스 검증 (`artifacts/sites/{slug}/design-system.html`)
- **off-system 0건**: 쇼케이스가 DESIGN.md 토큰만 쓰는가(컴포넌트 하드코드 hex/폰트 0). 모드 B B1과 동일 기준으로 grep.
- **완성도(전시 누락 점검) — 핵심**: 모든 토큰 그룹과 컴포넌트가 한 번 이상 전시되는가.
  - `colors` 전 토큰이 스와치로(역할명+hex). `typography` 전 역할이 견본으로. `rounded`·`spacing`·`elevation` 스케일 전시. `components` 전 항목·변형이 실제 렌더로.
  - **동적·구조 토큰(present-gated)**: DESIGN.md에 있으면 전시 — `motion`(전환 데모/easing 곡선), `zIndex`(레이어 순서표), `opacity`(투명도 스텝), `border`(두께 샘플), `focus`(포커스 링 데모), `icon`(크기·stroke 샘플), `themes`(라이트/다크 토글), 상황형(dataviz 색·skeleton·gradient). primitive 층이 있으면 램프로 전시. 없는 그룹은 강요하지 않음.
  - **표준 컴포넌트 + 상태**: DESIGN.md에 든 표준 컴포넌트(폼 컨트롤·tabs·table·dialog·tooltip·alert·badge·popover·toast·calendar·pulldown 등)와 그 상태 변형(`-hover`/`-focus`/`-disabled`/`-checked`/`-error`/`-open`)이 갤러리에 실제 렌더되는가. 정적 표현이 어려운 오버레이(dialog/toast 등)는 열린 상태 1컷으로 전시.
  - 빠진 토큰/컴포넌트를 목록으로 지적 → builder 회송.
- **자기완결·렌더**: 단일 HTML이 브라우저에서 바로 열리는가(Playwright로 렌더해 깨짐·빈 칸 확인). 대표 합성 섹션이 주 아키타입을 반영하는가.
- **대비**: 스와치/견본이 다크 위 색을 다크 배경에 얹어 정확히 보여주는가(잉크 반전 정확성).

### A7. 확장/통합(증분 병합) 검수 — 같은 사이트에 페이지 추가 시
흐름 A 확장/통합에서만 수행. 검증된 시스템이 새 페이지로 오염되지 않았는지 본다.

- **추가 무결성**: 신규 토큰/컴포넌트가 기존과 충돌 없이 더해졌는가. broken-ref·orphaned 재점검.
- **충돌 처리**: `analysis/merge-notes.md`/`reviews/merge-conflicts.md`의 충돌이 **덮어쓰기 없이** 기록됐는가. 같은 역할의 값이 silent overwrite로 바뀌지 않았는가(기존 DESIGN.md와 diff). 충돌은 변형 분리 또는 사람 승인 대상으로 남겨야 한다.
- **provenance**: Source pages·`seen on:`이 새 페이지를 반영하도록 갱신됐는가. 1회 관측(콘텐츠 의심) 값이 canonical 시스템 토큰으로 승격되지 않았는가.
- **발산**: 새 페이지가 서브브랜드로 발산하는데 같은 시스템에 억지 병합되지 않았는가(발산이면 분리 권고).
- **새 아키타입 라운드트립**: 새 페이지 example.html ↔ 새 reference 대조.
- **하위 산출물 stale**: DESIGN.md 변경 후 `design-system.html`·골든 example이 재생성됐는가, 안 됐으면 `stale` 표기됐는가.
- **수렴**: 새 페이지에서 신규 토큰/컴포넌트가 거의 없으면 "충분히 포착됨" 신호로 보고.

---

## 모드 B — 페이지의 디자인시스템 준수

대상: `artifacts/sites/{slug}/pages/{name}/index.html` (기준: `.../DESIGN.md` + `.../examples/{archetype}/layout.md`).

### B1. 토큰 준수 (off-system 차단) — 가장 중요
- HTML/`tailwind.config`에 등장하는 모든 색·폰트·반경·간격이 DESIGN.md 토큰에 있는가.
- DESIGN.md에 없는 hex/폰트/그림자 발견 시 **critical**. 위치와 함께 "DESIGN.md의 어떤 토큰으로 교체"를 지시.
- DESIGN.md "Don't" 목록 위반(예: 색블록에 그림자, 사각 CTA, mid-gray 텍스트, 한 화면 primary 2개) 전수 점검.

### B2. 합성 준수 (examples/layout.md 대비)
- 섹션 순서·그리드·여백 리듬·반응형 붕괴가 해당 archetype layout.md와 맞는가.
- 인접 섹션 레이아웃 다양화됐는가, 동일 3컬럼 반복/중앙정렬 남용 아닌가.

### B3. 접근성
- 토큰쌍 대비 AA. CTA hover/active/focus 상태. 터치 타깃 ≥44px. 이미지 alt.

### B4. 반응형
- 모바일 폭(560)에서 텍스트 겹침·표 넘침·차트 깨짐·가로 스크롤 없는지. `h-screen` 미사용, `min-h-[100dvh]`.

### B5. 완전 출력 + AI 티
- 플레이스홀더 주석·스켈레톤·생략 0건. 반복 요소 실제 N개.
- AI 티: 순수 #000/과채도/네온/보라 그라데이션(DESIGN.md에 없으면) 금지. 한국어면 번역투·상투어·둥근 숫자·가짜 이름 점검.

---

## 모드 C — 기존 프로젝트 적용(retrofit) 검수

대상: 흐름 C에서 `design-system-applier`가 만든 `artifacts/sites/{slug}/apply/{project}/`의 `state.md`·`crosswalk.md`·`changes.md` + **실제 교정된 사용자 코드 파일**. 기준: `sites/{slug}/DESIGN.md` + `examples/{archetype}/layout.md`. 두 축을 본다 — **(1) 시스템 적합성, (2) 기능 비회귀.** 적용은 동작을 깨면 안 된다.

### C1. 시스템 적합성 (off-system 제거)
- 교정된 파일/스타일에 남은 off-system 색·폰트·반경·간격을 grep으로 전수. DESIGN.md 토큰으로 교체됐는가. 남은 raw hex/px는 **critical**로 위치와 함께 지적.
- `crosswalk.md`의 매핑이 실제 코드에 반영됐는가(매핑표엔 있는데 코드엔 옛 값이 남은 누락 탐지).
- DESIGN.md "Don't" 목록 위반이 새로 생기지 않았는가.

### C2. 합성 적합성 (layout.md 대비)
- 교정된 페이지의 섹션 순서·그리드·여백 리듬이 해당 `examples/{archetype}/layout.md`에 수렴했는가. **적용했는데 레이아웃이 여전히 어긋나면(= "반영 안 됨") 지적** → applier 회송.

### C3. 기능 비회귀 (핵심)
- import/참조 경로가 깨지지 않았는가. 컴포넌트 props·동작·상태 로직이 보존됐는가(스타일만 바뀌어야 하고 마크업 구조 변경은 최소).
- 빌드/타입체크가 통과하는가(`changes.md`가 손댄 파일 기준으로 확인 안내). 클래스 치환으로 동작에 쓰이는 기능 클래스를 지우지 않았는가.
- 내용(텍스트·데이터·링크)이 보존됐는가 — 디자인 적용은 콘텐츠를 바꾸지 않는다.

### C4. 변경 명시·승인
- `changes.md`가 무엇을·왜·어느 파일을 바꿨는지 빠짐없이 적었는가. **diff 승인 게이트 없이** 사용자 파일을 덮어쓰지 않았는가.
- 신규(맨바닥) 프로젝트인데 흐름 C로 잘못 처리하지 않았는가(그 경우 흐름 B 회송 권고).

---

## 검수 튜닝 (회의적 평가자)
- 통과/탈락 경계를 수치로 고정한다(대비 4.5:1, off-system 0건). "대체로 괜찮음"으로 통과시키지 않는다.
- 양쪽에서 늘 통과하는 항목은 차별력이 없다 — 더 도전적인 케이스(색블록 위 텍스트 대비, 모바일 풀블리드, Don't 위반)에 집중.
- 자기평가 편향 전제: builder/author가 "지켰다"고 적어도 산출물 자체를 직접 검증한다.

## 하지 말 것
- 산출물을 직접 고치지 않는다(수정은 author/builder). 검수자는 결함과 지시만.
- 라벨만 붙이고 통과시키지 않는다 — 판정과 근거를 반드시 남긴다.
