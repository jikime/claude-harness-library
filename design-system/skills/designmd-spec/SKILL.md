---
name: designmd-spec
description: design.md(DESIGN.md) 포맷의 단일 진실 원천(SSOT) 작업 매뉴얼. DESIGN.md의 YAML 프론트매터 스키마(version·name·description·colors·typography·rounded·spacing·components), 토큰 상호참조 문법 {group.token}, 본문 12섹션 구조, lint 규칙(broken-ref·contrast-ratio·orphaned-tokens)을 규정한다. designmd-author가 DESIGN.md를 집필할 때, design-system-reviewer가 무결성을 검증할 때 공통으로 따른다.
---

# designmd-spec — DESIGN.md 포맷 SSOT

DESIGN.md는 한 사이트의 디자인 시스템을 **기계가 읽는 토큰(프론트매터)** + **사람이 읽는 의도(본문)**로 동시에 적는 단일 파일이다. 토큰은 정의를 담고, 본문은 "왜·언제 쓰는가"를 담는다.

## 1. 프론트매터 스키마 (YAML)

상단 `---` 사이에 토큰을 둔다. 순서: `version → name → description → colors → typography → rounded → spacing → components`.

```yaml
version: alpha            # 포맷 버전 라벨
name: <kebab-or-short>    # 시스템 이름 (예: figma-design-analysis)
description: >            # 시스템의 시각적 성격을 2~4문장으로. 색·타이포·시그니처를 서술.
  ...

colors:                   # 평면 키:값(hex). 의미 기반 역할명 사용 (primary, ink, canvas, hairline ...)
  primary: "#000000"
  on-primary: "#ffffff"
  ink: "#000000"
  canvas: "#ffffff"
  hairline: "#e6e6e6"
  surface-soft: "#f7f7f5"
  # block-*, accent-*, semantic-* 등 도메인 역할은 발견된 만큼 추가

typography:               # 역할별 객체. 각 역할은 아래 6필드를 가진다.
  display-xl:
    fontFamily: <family>
    fontSize: 86px
    fontWeight: 340       # 가변 폰트면 실제 측정값(320/330/340/480/540/700 등)
    lineHeight: 1.00      # 단위 없는 배수
    letterSpacing: -1.72px
    fontFeature: kern
  body: { fontFamily: ..., fontSize: 18px, fontWeight: 320, lineHeight: 1.45, letterSpacing: -0.26px, fontFeature: kern }
  # display-lg, headline, subhead, card-title, body-lg, body, body-sm, link, button, eyebrow, caption ...

rounded:                  # 반경 스케일. 작은→큰 + pill/full.
  xs: 2px
  sm: 6px
  md: 8px
  lg: 24px
  xl: 32px
  pill: 50px
  full: 9999px

spacing:                  # 8px 기반 간격 스케일.
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

# --- 아래 그룹은 모두 present-gated: 사이트에 있을 때만 넣고, 없으면 키 자체를 생략한다 ---
motion:                   # 트랜지션/애니메이션. 관측(transition/animation computed)될 때만.
  duration-fast: 120ms
  duration-base: 240ms
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
zIndex:                   # 레이어링 스케일. overlay/sticky/nav/modal 캡처 시.
  base: 0
  dropdown: 1000
  sticky: 1100
  overlay: 1200
  modal: 1300
  toast: 1400
opacity:                  # 투명도 스케일(disabled·hover overlay·scrim 등). alpha를 임시 합성하지 말고 토큰화.
  disabled: 0.4
  scrim: 0.6
border:                   # stroke 두께 스케일(색은 colors.hairline 등이 담당).
  hairline: 1px
  thick: 2px
focus:                    # focus-ring (접근성·포커스 가시성). 폼/버튼 focus 트리거로 관측.
  ring-color: "{colors.primary}"
  ring-width: 2px
  ring-offset: 2px
icon:                     # 아이콘 시스템. svg 크기·stroke·세트 관측 시.
  size-sm: 16px
  size-md: 20px
  size-lg: 24px
  stroke: 1.5px
  set: lucide
# 상황형(있을 때만): dataviz(차트 카테고리 색) · gradient · blur(backdrop) · skeleton(로딩) · themes(light/dark 오버라이드)
dataviz: { cat-1: "#...", cat-2: "#..." }
themes:                   # 멀티 테마. 라이트/다크 등 시맨틱 토큰 오버라이드 묶음.
  dark: { canvas: "{primitives.gray-950}", ink: "{primitives.gray-50}" }

components:               # 컴포넌트마다 토큰 참조로 정의. 직접 hex/px 금지, 참조 우선.
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    focus: "{focus.ring-color}"      # 상태/모션/레이어 토큰도 참조 가능
    motion: "{motion.duration-fast}"
    padding: 10px 20px
  # 변형은 별도 항목으로: button-primary-pressed, pricing-tab-selected, color-block-section-navy ...
```

### 필드 규칙
- **색**: hex 문자열, 따옴표 필수. 역할명은 *의미 기반*(primary/ink/canvas/hairline/surface-soft/block-*/accent-*/semantic-*). 같은 hex라도 역할이 다르면 다른 키.
- **타이포**: `fontFamily·fontSize·fontWeight·lineHeight·letterSpacing·fontFeature` 6필드 고정. 크기는 px, lineHeight는 배수.
- **rounded/spacing**: 작은→큰 순. spacing은 8px 배수 기반.
- **동적·구조 토큰(present-gated)**: `motion`(duration·easing) · `zIndex`(레이어 스케일) · `opacity`(disabled·scrim 등, alpha를 토큰화) · `border`(stroke 두께) · `focus`(ring color/width/offset) · `icon`(size·stroke·set). 사이트에 관측될 때만 넣는다. `themes`는 라이트/다크 등 시맨틱 오버라이드를 담는다.
- **상황형**: `dataviz`·`gradient`·`blur`·`skeleton`은 해당 UI가 있을 때만.
- **components**: 값은 가능한 한 `{group.token}` 참조. 색·타이포·반경뿐 아니라 `focus`·`motion`·`zIndex`도 토큰 참조. `padding`/`size`처럼 토큰에 없는 1회성 수치만 직접.

## 1.5 표준 컴포넌트 어휘 (있으면 이 이름으로)

사이트에 아래 컴포넌트가 **존재하면** 일관된 토큰명으로 components에 넣는다. **없으면 만들지 않는다**(present-gated). 사이트 고유 컴포넌트(예: color-block-section, quick-menu-strip)는 자유 명명하되, 아래 표준 역할에 해당하면 표준명을 우선한다.

| 그룹 | 표준 토큰명 |
|---|---|
| Actions | `button`(+변형), `pulldown`(드롭다운 메뉴) |
| Forms | `field`(label+control+help/error 래퍼), `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `date`(date picker) |
| Containment | `card`, `table`, `tabs`, `dialog`(모달), `popover` |
| Feedback | `alert`, `toast`, `tooltip`, `badge` |
| Date | `calendar` |

### 상태 변형 표기
컴포넌트의 상태는 **별도 항목**으로 분리한다(산문에 묻지 않는다). 접미사 규약:
`-hover` · `-focus`(포커스 링) · `-active`/`-pressed` · `-disabled` · `-checked`/`-selected`(checkbox/radio/switch/tab) · `-error`/`-invalid`(폼) · `-open`(dialog/popover/pulldown/calendar 펼침).

예: `checkbox`, `checkbox-checked`, `checkbox-disabled` / `input`, `input-focus`, `input-error` / `tabs`, `tab-selected`.

관측하지 못한 상태(정적 캡처 한계)는 지어내지 말고 **Known Gaps**에 "{컴포넌트} {상태} 미관측"으로 남긴다.

## 1.6 토큰 3계층 아키텍처 (primitive → semantic → component)

완전한 디자인 시스템은 토큰을 3계층으로 본다. DESIGN.md는 이 계층을 표현할 수 있다.

- **primitive(global)**: 의미 없는 원시 값 — 색 램프·기본 단위. 사이트가 체계적 램프(예: CSS 변수로 노출된 `--blue-500`, 50~900 스케일)를 가질 때만 `primitives:` 그룹으로 캡처(**present-gated**).
  ```yaml
  primitives:
    blue-500: "#0071e3"
    gray-950: "#0a0a0a"
    space-4: 16px
  ```
- **semantic**: 역할·의미. primitive를 참조한다. 우리의 `colors`·`typography`·`spacing` 등 기존 그룹이 이 계층이다.
  ```yaml
  colors: { primary: "{primitives.blue-500}", ink: "{primitives.gray-950}" }
  ```
- **component**: 컴포넌트별. semantic을 참조한다. 우리의 `components`가 이 계층이다.

규칙: **primitive 층은 선택**이다. 마케팅/단순 사이트는 semantic 직행으로 충분하다(기존 방식 유지). 단, 사이트가 명시적 원시 램프를 노출하면 primitives로 캡처하고 semantic이 이를 참조해 재사용·테마(다크 등)를 가능케 한다. 계층을 건너뛰어도 되지만(semantic이 raw hex를 직접 가져도 됨), **역참조 금지**(primitive가 semantic을 참조하지 않음). `themes`의 오버라이드는 semantic 토큰을 다른 primitive로 다시 묶는 방식으로 표현한다.

## 2. 토큰 상호참조 문법

`{group.token}` 형태로 참조한다. 예: `{colors.primary}`, `{typography.button}`, `{rounded.pill}`, `{spacing.xxl}`, `{primitives.blue-500}`, `{motion.duration-base}`, `{zIndex.modal}`, `{focus.ring-color}`, `{icon.size-md}`.

- 프론트매터 components와 **본문 산문 모두**에서 이 문법을 쓴다. 본문에서 색·컴포넌트를 언급할 땐 풀어쓰지 말고 토큰으로 가리킨다(예: "lime 블록" → `{colors.block-lime}`).
- 참조 대상은 반드시 프론트매터에 정의돼 있어야 한다(없으면 broken-ref). primitive·동적 그룹 참조도 동일.

## 3. 본문 섹션 구조 (프론트매터 아래, `---` 다음)

순서를 고정한다. 각 섹션은 토큰을 참조하며 "왜·언제"를 설명한다.

1. **## Overview** — 시스템의 성격, Key Characteristics 불릿(시그니처 패턴).
2. **## Colors** — Brand & Accent / Surface / Text / Semantic 그룹으로 각 색의 역할·사용처. 첫 줄에 `> Source pages:` 출처.
3. **## Typography** — Font Family(주·보조 + 폴백 + 오픈소스 대체 폰트), Hierarchy 표(토큰·size·weight·lh·ls·use), Principles, Note on Font Substitutes.
4. **## Layout** — Spacing System, Grid & Container(max-width·컬럼·gutter), Whitespace Philosophy.
5. **## Elevation & Depth** — 레벨 표(0 flat~3 modal), 그림자 대신 쓰는 장치(색블록 등).
6. **## Shapes** — Border Radius Scale 표, `border`(stroke 두께), 사진/일러스트 기하.
6.5 **## Foundations (present-gated)** — 관측된 것만: `motion`(duration·easing) · `zIndex`(레이어 스케일·overlay 순서) · `opacity` · `focus`(ring) · `icon`(size·stroke·set) · `themes`(라이트/다크) · 상황형(dataviz·gradient·blur·skeleton). 없으면 이 섹션 생략하고 Known Gaps에 미관측 표기.
7. **## Components** — Buttons, Inputs & Forms, Cards & Containers, 시그니처 섹션, Navigation, Footer 등. 각 컴포넌트는 토큰 매핑 + 사용처.
8. **## Do's and Don'ts** — Do / Don't 불릿. 시스템을 지키는·깨뜨리는 행동을 구체적으로.
9. **## Responsive Behavior** — Breakpoints 표, Touch Targets, Collapsing Strategy, Image Behavior.
10. **## Iteration Guide** — 페이지를 만들 때 따를 순서(가장 중요한 결정부터).
11. **## Known Gaps** — 추정값·미관측 상태(다크모드·에러 상태 등)를 정직하게 표기.

> 본문은 산문이되 모든 시각 주장에 토큰을 단다. "검은 버튼"이 아니라 "`{colors.primary}` 버튼".

## 4. Lint 규칙 (검수 기준)

`npx @google/design.md lint DESIGN.md`가 잡는 것을 reviewer가 동일하게 점검한다.

| 규칙 | 의미 | 점검 |
|---|---|---|
| `broken-ref` | 정의 안 된 토큰 참조 | 본문·components의 모든 `{x.y}`가 프론트매터에 존재하는가 — **모든 그룹**(colors·typography·rounded·spacing·primitives·motion·zIndex·opacity·border·focus·icon·themes) |
| `contrast-ratio` | 텍스트/배경 대비 부족 | 각 component의 textColor↔backgroundColor가 WCAG AA(본문 4.5:1, 큰 텍스트 3:1) 충족 |
| `orphaned-tokens` | 어디서도 안 쓰는 토큰 | 정의됐으나 참조 안 되는 토큰 표시(삭제 후보). 모든 그룹 대상 |
| `tier-direction` | 계층 역참조 | primitive가 semantic/component를 참조하지 않는가(방향: primitive←semantic←component) |

대비 계산: relative luminance 기반 명암비. 통과 못 하면 해당 색쌍을 리포트에 수치와 함께 적는다.

## 5. 작성·검증 원칙

- **토큰 우선, hex 최소**: components와 본문은 참조로 묶고, raw hex/px는 토큰에 없는 1회성에만.
- **의미로 명명**: 색은 보이는 색이 아니라 역할로 이름 짓는다.
- **정직한 Known Gaps**: 스크린샷 픽셀에서 추정한 값, 관측 못 한 상태(다크모드·에러·애니메이션)는 추정/미관측으로 명시한다.
- **변형은 별도 항목**: `-pressed`, `-selected`, `-navy` 등 상태/변형은 산문에 묻지 말고 components 항목으로.
- **examples/와의 분업**: DESIGN.md는 토큰·컴포넌트·규칙을 담는다. *페이지 합성(섹션 순서·그리드·여백 리듬)*은 `examples/{archetype}/layout.md`가 담당하므로 DESIGN.md 본문엔 리듬을 한 줄 요약만 남기고 상세는 examples로 넘긴다.
- **다중 페이지 provenance(누적 시스템)**: 한 사이트의 DESIGN.md는 여러 페이지 기여로 누적된다. Colors 섹션의 `> Source pages:`에 분석된 페이지를 모두 적고, 가능하면 토큰·컴포넌트에 `seen on:` 출처를 단다. **여러 페이지에서 반복된 토큰 = canonical 시스템 토큰**, **한 페이지에서만 나온 값 = 콘텐츠·일회성 의심**으로 구분(후자는 Known Gaps 또는 "1회 관측"으로 표기). 새 페이지를 통합할 때 같은 역할의 값이 충돌하면 덮어쓰지 말고 변형 항목으로 분리하거나 충돌로 표기해 사람 승인을 받는다.
