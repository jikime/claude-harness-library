---
name: design-system-apply
description: 이미 만들어진 UI/코드베이스에 확정된 디자인 시스템(DESIGN.md + examples/layout.md)을 입히는 retrofit 작업 매뉴얼. 맨바닥 새 페이지 생성(page-generation)과 달리, 기존 프로젝트 상태를 점검하고, 기존 색·폰트·간격을 DESIGN.md 토큰에 매핑(크로스워크)하고, 기존 파일을 diff로 증분 교정한다. 내용·동작 보존, off-system만 교정, 변경 명시, 파일 변경 전 승인이 핵심. design-system-applier 에이전트가 따른다.
---

# design-system-apply — 기존 프로젝트 적용(retrofit) 매뉴얼

목표는 "이미 돌아가는 UI"를 **동작은 그대로 둔 채 디자인 시스템에 수렴**시키는 것이다. 새로 만드는 게(page-generation) 아니라, 기존 코드를 **측정 → 매핑 → diff 교정**한다.

> **경로 규칙(다중 사이트)**: 적용 산출물은 `artifacts/sites/{slug}/apply/{project}/` 아래에 둔다(Orchestrator가 slug 지정). 기준 입력은 `artifacts/sites/{slug}/DESIGN.md` + `.../examples/{archetype}/layout.md`.

## 트리거
- 사용자가 **기존 프로젝트/코드베이스**에 디자인 시스템을 "적용/입혀/반영"해달라고 할 때(흐름 C). 맨바닥 새 페이지 요청은 흐름 B(page-generation).

## 0. 디자인 시스템 선택 (Orchestrator가 수행, 여기선 전제)
`artifacts/sites/*/DESIGN.md`를 스캔해 사용 가능한 시스템 목록을 사용자에게 제시하고 어떤 걸 적용할지 확정한 상태로 들어온다. 0개면 흐름 A 안내, 1개면 확인, 2개+면 선택. 선택된 `sites/{slug}/`가 기준.

## 1. 프로젝트 상태 점검 → `apply/{project}/state.md`

기존 UI에 적용이 "반영 안 되는" 가장 큰 원인은 **현재 프로젝트 형태를 모른 채 generic 출력을 얹기 때문**이다. 먼저 코드베이스를 측정한다.

- **스택**: `package.json`/락파일/설정으로 프레임워크(React/Next/Vue/Svelte/순수 HTML)·빌드툴(Vite/Next/Webpack)·언어(TS/JS) 식별.
- **스타일링 방식** (적용 지점이 여기서 갈린다):
  - Tailwind(`tailwind.config.*` 존재) → **config의 theme.extend에 토큰 주입**이 1차 적용점.
  - CSS 변수/`:root` 토큰 → 변수 값 교체가 1차 적용점.
  - CSS Modules / SCSS → 컴포넌트별 스타일 파일 교정.
  - CSS-in-JS(styled/emotion) / 인라인 → 테마 객체·스타일 블록 교정.
  - 기존 디자인 토큰/디자인시스템 유무(있으면 충돌·중복 주의).
- **인벤토리**: 페이지/라우트, 재사용 컴포넌트, 전역 스타일 진입점(globals.css·theme.ts 등)을 Glob/Grep으로 목록화.
- **신규 vs 기존 판정**: UI가 사실상 비어 있으면(보일러플레이트만) **신규** → Orchestrator에 "흐름 B로 보내라" 보고. 실질 UI가 있으면 **retrofit** 계속.

## 2. 토큰 크로스워크 → `apply/{project}/crosswalk.md`

기존에 실제로 쓰인 값을 DESIGN.md 토큰에 매핑한다.

- **수집**: Grep으로 하드코드 색(hex/rgb/hsl)·폰트 패밀리·반경·간격·그림자를 전수 수집(어느 파일·몇 회).
- **매핑표**: `기존값 → DESIGN.md 토큰`. 예: `#111 (47곳) → {colors.ink}`, `#2b6cff (12곳) → {colors.primary}`, `font: 'Roboto' → {typography.fontFamily}`(없으면 Font Substitutes).
- **off-system 갭**: DESIGN.md 어느 토큰에도 안 맞는 값 목록 → "가장 가까운 토큰으로 수렴" 후보 + 정말 시스템에 없으면 Known Gaps로(임의 신규 토큰 발명 금지).
- **충돌**: 같은 역할에 기존이 여러 값을 쓰면(예: 텍스트색 3종) canonical 토큰 하나로 수렴하되, 의미가 다른 변형이면 별도 표기.

## 3. 증분 적용안(diff) → `apply/{project}/changes.md`

실제 파일을 바꾸기 전에 **변경안**을 만든다. 스타일링 방식별 1차 적용점부터.

- **토큰 주입(전역 우선)**: Tailwind면 `tailwind.config`의 colors/fontFamily/borderRadius/spacing에 DESIGN.md 토큰 주입. CSS 변수면 `:root` 값 교체. 이 한 번으로 다수 컴포넌트가 토큰을 타게 만든다.
- **컴포넌트 클래스/스타일 치환**: 하드코드 색·폰트·반경·간격을 크로스워크 매핑대로 토큰 참조로 교체. 마크업 구조는 최소 변경.
- **레이아웃 수렴(반드시 layout.md 참조)**: 대상 페이지의 아키타입을 골라 `examples/{archetype}/layout.md`의 섹션 순서·그리드·여백 리듬·반응형 붕괴와 대조. 어긋난 부분(간격 리듬·컨테이너 max-width·색블록 복귀 등)을 교정안에 포함. **"토큰만 바꾸고 레이아웃은 그대로" 면 적용이 덜 된 것** — layout.md까지 맞춘다.
- **DESIGN.md Don't 준수**: 색블록 그림자·사각 CTA 등 금지 항목을 새로 위반하지 않는다.
- `changes.md`에 **파일별로 무엇을·왜** 적는다(토큰 매핑 근거 포함).

## 4. diff 승인 게이트 (필수)
사용자 코드 파일을 바꾸기 전에 변경안(대상 파일·diff 요약·이유)을 보여주고 **명시적 승인**을 받는다. 승인 후에만 Edit로 적용한다. 큰 변경은 전역 토큰 주입 → 컴포넌트 → 레이아웃 순으로 단계 승인 가능.

## 5. 적용 + 비회귀 확인
- 승인된 변경만 Edit로 반영. 적용 후 `changes.md`를 "적용 내역"으로 갱신.
- **기능 비회귀 자가 점검**(합격 판정은 reviewer 모드 C): import·동작 클래스·props·상태 로직 보존, 빌드/타입체크 통과(`npm run build`/`tsc --noEmit` 등 있으면 안내), 콘텐츠 불변.

## 품질 체크 (회송 전 자체 점검)
- [ ] state.md가 스택·스타일링 방식·인벤토리를 정확히 잡았는가(신규/기존 판정 포함).
- [ ] crosswalk가 하드코드 값을 빠짐없이 토큰에 매핑했는가(off-system 갭 명시).
- [ ] 전역 토큰 주입이 1차 적용점에 들어갔는가(컴포넌트마다 raw 값 반복 아님).
- [ ] **레이아웃이 layout.md에 수렴했는가**(토큰만 바뀐 게 아니라).
- [ ] 내용·동작 보존, 모든 변경이 changes.md에 명시.
- [ ] 파일 변경 전 승인을 받았는가.

## 하지 말 것
- 새 standalone HTML로 사용자 프로젝트를 대체하지 않는다 — 기존 파일을 교정한다.
- 승인 없이 파일을 덮어쓰지 않는다.
- 내용·동작을 바꾸지 않는다 — 스타일/토큰/레이아웃 정렬만.
- DESIGN.md에 없는 색/폰트를 추가하거나 토큰을 발명하지 않는다 — 가장 가까운 토큰 수렴 또는 Known Gaps.
- 자기 결과를 합격 처리하지 않는다 — reviewer 모드 C 전까지 `미검증`.
