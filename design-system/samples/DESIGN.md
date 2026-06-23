---
version: alpha
name: movingbox
description: >
  코랄(#ff6242 계열) 강조색과 잉크 그레이를 축으로 한, 전환(견적 신청) 중심
  한국어 마케팅 랜딩 시스템. 흰 캔버스를 기본으로 다크 패널(#35363a)·옅은
  코랄 틴트(#fff5f3)·연회색(#f4f5f7) 섹션을 번갈아 깔아 리듬을 만든다.
  타입은 Pretendard Variable 단일 패밀리(400~800)에 큰 헤드라인 음수 트래킹,
  카드는 그림자 없이 면색·hairline 보더로 분리하는 flat 스타일이 시그니처다.
  코랄 CTA가 페이지 전체에 반복 등장하고 우측 떠있는 퀵 CTA가 항상 노출된다.

colors:
  # --- Brand & Accent (coral) ---
  primary: "#ff6242"            # 강조 텍스트·아이콘·포인트(최다 강조색)
  primary-soft: "#ff7053"       # 보조 코랄 텍스트
  primary-strong: "#ff876f"     # CTA fill(주요 버튼 배경)
  on-primary: "#ffffff"         # 코랄 면 위 텍스트
  primary-tint: "#fff5f3"       # 옅은 코랄 면(카드/스트립)
  # --- Surface ---
  canvas: "#ffffff"             # 기본 페이지 배경
  surface-soft: "#f4f5f7"       # 연회색 면(입력·칩·섹션 구분)
  surface-dark: "#35363a"       # 다크 섹션/패널/푸터 배경
  surface-dark-alt: "#2b2b2b"   # 더 어두운 리본/푸터 변형
  on-dark: "#ffffff"            # 다크 면 위 텍스트
  # --- Text (ink scale) ---
  ink: "#252527"                # body 기본 텍스트
  ink-soft: "#56585c"           # 보조 텍스트
  ink-muted: "#74767b"          # 캡션·메타
  ink-faint: "#babdc4"          # 가장 옅은 보조/플레이스홀더
  # --- Lines ---
  hairline: "#e2e3ea"           # 기본 1px 보더(입력 등)
  hairline-strong: "#d0d2da"    # 칩 보더(약간 진한 hairline)
  border-selected: "#1a1a1a"    # 선택 칩 1px 보더
  # --- Semantic / external brand ---
  scrim: "#000000"              # 히어로 사진 위 오버레이 base(opacity는 opacity.scrim)
  info: "#007aff"               # 보조 강조(인터넷 상담 보더/배경, iOS 블루)
  kakao: "#fee500"              # 카카오톡 상담 브랜드색(외부)
  kakao-ink: "#3c1e1e"          # 카카오 버튼 위 텍스트

typography:
  display:
    fontFamily: Pretendard
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.8px
    fontFeature: kern
  headline:
    fontFamily: Pretendard
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: normal
    fontFeature: kern
  title-lg:
    fontFamily: Pretendard
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.56px
    fontFeature: kern
  title:
    fontFamily: Pretendard
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: normal
    fontFeature: kern
  subhead:
    fontFamily: Pretendard
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: normal
    fontFeature: kern
  body-lg:
    fontFamily: Pretendard
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.36px
    fontFeature: kern
  body:
    fontFamily: Pretendard
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.32px
    fontFeature: kern
  body-sm:
    fontFamily: Pretendard
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
    fontFeature: kern
  caption:
    fontFamily: Pretendard
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: normal
    fontFeature: kern
  caption-xs:
    fontFamily: Pretendard
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
    fontFeature: kern
  micro:
    fontFamily: Pretendard
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: normal
    fontFeature: kern
  phone:
    fontFamily: Pretendard
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.5px
    fontFeature: kern

rounded:
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  2xl: 16px
  pill: 50px
  full: 9999px

spacing:
  xxs: 2px
  xs: 6px
  sm: 10px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 40px
  section: 96px

motion:
  duration-fast: 150ms
  duration-base: 220ms
  duration-slow: 400ms
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"

zIndex:
  base: 0
  floating-a: 98
  floating-b: 99
  header: 100

opacity:
  scrim: 0.75

border:
  hairline: 1px
  thick: 2px
  ring: 6px

focus:
  ring-color: "{colors.primary-strong}"
  ring-width: 1px
  ring-offset: 0px

icon:
  size-sm: 16px
  size-md: 20px
  size-lg: 24px
  logo-w: 160px
  logo-h: 50px

components:
  # --- Buttons ---
  # NOTE(a11y): button-primary 계열은 흰 텍스트 on primary-strong(#ff876f) =
  #   2.35:1 (실측) → WCAG AA fail. 원본 사이트 충실 목적의 의도적 보존.
  #   AA가 필요하면 button-primary-aa(ink 텍스트 6.52:1)로 대체. Known Gaps #2 참조.
  button-primary:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"     # a11y: 2.35:1 (AA fail, 원본 보존)
    typography: "{typography.body-lg}"
    rounded: "{rounded.xl}"
    motion: "{motion.duration-fast}"
    padding: 16px 20px
  button-primary-aa:                       # 접근성 대안: 같은 코랄 면 + ink 텍스트
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.ink}"            # a11y: 6.52:1 (AA pass)
    typography: "{typography.body-lg}"
    rounded: "{rounded.xl}"
    padding: 16px 20px
  button-primary-wide:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.lg}"
    padding: 16px 40px
  button-primary-2xl:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.2xl}"
    padding: 16px 20px
  button-cta-sm:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.lg}"
    padding: 12px
  button-ghost-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 0 12px
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "{border.hairline}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 0 12px
  button-outline-selected:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "{border.hairline}"
    borderColor: "{colors.border-selected}"
    rounded: "{rounded.pill}"
    padding: 0 12px
  button-chip-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 0 16px
  button-info-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "{border.thick}"
    borderColor: "{colors.info}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 10px 12px
  button-kakao:
    backgroundColor: "{colors.kakao}"
    textColor: "{colors.kakao-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 10px
  # --- Forms ---
  input:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.ink-muted}"
    border: "{border.hairline}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 0 16px
    height: 48px
  input-focus:
    border: "{border.hairline}"
    borderColor: "{colors.primary-strong}"
    ringColor: "{focus.ring-color}"
    ringWidth: "{focus.ring-width}"
    ringOffset: "{focus.ring-offset}"
  checkbox:
    # 네이티브 0px 숨김 + 커스텀 마크(미캡처) — Known Gaps 참조
    accentColor: "{colors.primary-strong}"
  # --- Containment ---
  card:
    backgroundColor: "{colors.canvas}"
    border: "{border.hairline}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.md}"
  card-tint:
    backgroundColor: "{colors.primary-tint}"
    rounded: "{rounded.2xl}"
  card-soft:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.xl}"
  # --- Feedback ---
  badge:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.micro}"
    rounded: "{rounded.full}"
  # --- Navigation / structure (signature) ---
  pulldown:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption-xs}"
    rounded: "{rounded.pill}"
    elevation: "rgba(37,40,45,0.15) 0 0 2.4px 0"
    padding: 2px 6px
  nav-header:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    zIndex: "{zIndex.header}"
    # height: 원본 computed 107px(데스크톱 1440). 골든 예제는 72px(mobile)/88px(desktop)
    #   채택 — 헤더 내부 콘텐츠 높이만 반영한 시각 등가값. 둘 다 관측 근거 기록.
    height: 88px              # 채택값(desktop). 원본 computed 107px은 padding 포함.
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.ink-faint}"
  quick-cta:
    zIndex: "{zIndex.floating-b}"
  hero-scrim:
    backgroundColor: "{colors.scrim}"
    opacity: "{opacity.scrim}"
---

## Overview

movingbox는 이사 견적 신청 **전환**을 목표로 한 단일 길이 한국어 랜딩
시스템이다. 흰 캔버스(`{colors.canvas}`)를 바탕으로 코랄 강조색
(`{colors.primary}` 계열)과 잉크 그레이(`{colors.ink}` 스케일)를 축으로 쓴다.
면색 섹션(다크 `{colors.surface-dark}` · 코랄틴트 `{colors.primary-tint}` ·
연회색 `{colors.surface-soft}`)과 흰 캔버스를 번갈아 깔아 리듬을 만들고,
코랄 CTA(`button-primary`)가 페이지 전체에 반복 등장한다.

### Key Characteristics

- **코랄 강조 + 잉크 그레이 2색 축** — 강조는 코랄(`{colors.primary}`),
  본문·구조는 잉크(`{colors.ink}`~`{colors.ink-faint}`).
- **면색 교차 리듬** — 흰 캔버스 ↔ 다크 패널(`{colors.surface-dark}`) ↔
  코랄틴트(`{colors.primary-tint}`)를 번갈아 풀블리드로 구획.
- **flat 카드** — 그림자 거의 없음. 면색 + hairline 보더(`{colors.hairline}`)로
  분리(`card` 계열).
- **반복 CTA** — 코랄 CTA가 hero·selector·checklist·final + 우측 floating에서
  4회+ 반복(`button-primary`, `quick-cta`).
- **단일 가변 폰트** — Pretendard Variable 하나로 400~800 운용, 큰 헤드라인은
  음수 트래킹(`{typography.display}` 등).
- **떠있는 퀵 CTA** — 우측 fixed 퀵메뉴(`quick-cta`, `{zIndex.floating-b}`)가
  항상 노출.

## Colors

> Source pages: `home`(`https://movingbox.example/ko`) — 단일 페이지 1회 관측.
> 모든 토큰 `seen on: home`. 교차출현 검증 전이라 canonical 확정은 다른 페이지
> 누적 시. primitive 색 램프는 미노출(LightningCSS 인라인 컴파일) → semantic 직행.

### Brand & Accent (coral)

- `{colors.primary}` `#ff6242` — 최다 강조색(135회). 강조 텍스트·아이콘·포인트.
- `{colors.primary-soft}` `#ff7053` — 보조 코랄 텍스트(70회). primary 인접 톤.
- `{colors.primary-strong}` `#ff876f` — CTA 면색(bg 19회). 주요 버튼 배경.
  `{colors.on-primary}` 흰 텍스트를 얹는다(대비 주의 — Known Gaps 참조).
- `{colors.primary-tint}` `#fff5f3` — 옅은 코랄 면(체크리스트 프로모 섹션 등).

### Surface

- `{colors.canvas}` `#ffffff` — 기본 페이지 배경.
- `{colors.surface-soft}` `#f4f5f7` — 입력·칩 배경, 섹션 구분 연회색.
- `{colors.surface-dark}` `#35363a` — 다크 패널·푸터·언어 토글 배경.
  `{colors.surface-dark-alt}` `#2b2b2b`는 더 어두운 푸터/리본 변형.
- 다크 면 위 텍스트는 `{colors.on-dark}`.

### Text (ink scale)

회색이 한 페이지에 10종+ 혼재(발산 신호)해, 실측 빈도가 높은 값을 기준으로
4단 잉크 스케일로 수렴 정리했다(임의 통일 아님, Known Gaps에 발산 기록).

- `{colors.ink}` `#252527` — body 기본(91회).
- `{colors.ink-soft}` `#56585c` — 보조 텍스트.
- `{colors.ink-muted}` `#74767b` — 캡션·메타(19회).
- `{colors.ink-faint}` `#babdc4` — 가장 옅은 보조·플레이스홀더.

### Lines

- `{colors.hairline}` `#e2e3ea` — 기본 1px 보더(입력 등).
- `{colors.hairline-strong}` `#d0d2da` — 칩 보더(약간 진함).
- `{colors.border-selected}` `#1a1a1a` — 선택 칩 1px 보더.

### Semantic / External

- `{colors.scrim}` `#000000` — 히어로 사진 위 라디얼 오버레이 base.
  alpha는 `{opacity.scrim}`(0.75)로 분리 토큰화(흰 헤드라인 가독 확보).
- `{colors.info}` `#007aff` — 인터넷 상담 보더/배경(iOS 시스템 블루).
- `{colors.kakao}` `#fee500` / `{colors.kakao-ink}` `#3c1e1e` — 카카오톡 상담
  버튼(외부 브랜드색, 시스템 통일 대상 아님).

## Typography

### Font Family

- **주 패밀리**: `Pretendard`(가변 폰트). computed
  `pretendard, "pretendard Fallback", sans-serif`. mono·보조 패밀리 미관측.
- **폴백**: `"pretendard Fallback", sans-serif`.
- **오픈소스 대체**: Pretendard는 그 자체가 오픈소스(SIL OFL)라 대체 불필요.
  미설치 환경에서는 `Pretendard JP` 또는 시스템 sans-serif로 폴백.

### Hierarchy

| 토큰 | size | weight | lh | ls | use |
|---|---|---|---|---|---|
| `{typography.display}` | 40px | 700 | 1.3 | -0.8px | 히어로 헤드라인 |
| `{typography.headline}` | 32px | 700 | 1.4 | normal | 섹션 H2 |
| `{typography.title-lg}` | 28px | 600 | 1.4 | -0.56px | 카드/서비스 제목 |
| `{typography.title}` | 24px | 600 | 1.4 | normal | H3·블록 제목 |
| `{typography.subhead}` | 20px | 500 | 1.6 | normal | 소제목·탭 텍스트 |
| `{typography.body-lg}` | 18px | 600 | 1.4 | -0.36px | CTA 라벨·강조 링크 |
| `{typography.body}` | 16px | 400 | 1.5 | -0.32px | 본문·내비 링크 |
| `{typography.body-sm}` | 14px | 400 | 1.5 | normal | 리뷰 본문·메타 |
| `{typography.caption}` | 13px | 600 | 1.4 | normal | 칩·가격 강조 |
| `{typography.caption-xs}` | 12px | 400 | 1.5 | normal | 마이크로 라벨·언어 토글 |
| `{typography.micro}` | 11px | 700 | 1.4 | normal | 뱃지 숫자 |
| `{typography.phone}` | 24px | 700 | 1.2 | -0.5px | 전화번호 시그니처 |

### Principles

- **큰 글자일수록 더 좁힌다** — 헤드라인일수록 음수 트래킹을 키운다
  (`{typography.display}` -0.8px → `{typography.body}` -0.32px). normal 트래킹은
  주로 32px·24px·작은 라벨에 한정.
- **행간** — 본문 ~1.4~1.5, 단락형 본문은 1.6으로 넉넉, 헤드라인 1.3~1.4.
- **굵기 운용** — 400(본문)·500(소제목)·600(라벨/제목)·700(헤드라인)·800(가격
  강조 caption 일부). 가변 폰트라 정수 단계로만 사용.

### Note on Font Substitutes

Pretendard는 오픈소스(OFL)라 그대로 임베드 가능하다. CDN 미가용 시 시스템
sans-serif(애플 SD산돌고딕Neo, Noto Sans KR)로 폴백하되 음수 트래킹 값은 유지한다.

## Layout

### Spacing System

8px 기반 근사(버튼 패딩·거터 실측). gap 일부는 추정.

| 토큰 | px | 근거 |
|---|---|---|
| `{spacing.xxs}` | 2px | 언어 토글 패딩 |
| `{spacing.xs}` | 6px | 작은 칩 패딩 |
| `{spacing.sm}` | 10px | 카톡/상담 버튼 패딩 |
| `{spacing.md}` | 12px | 칩·소형 버튼 |
| `{spacing.lg}` | 16px | CTA 패딩·입력 좌우 |
| `{spacing.xl}` | 24px | 모바일 거터 |
| `{spacing.2xl}` | 40px | 데스크톱 거터·와이드 버튼 좌우 |
| `{spacing.section}` | 96px | 섹션 간 수직 여백(추정 — Known Gaps) |

### Grid & Container

- 주 컨테이너 `max-width: 1280px`, 좌우 padding `{spacing.2xl}`(40px, desktop).
  보조 컨테이너 1200px / `{spacing.xl}`.
- 모바일 거터는 `{spacing.xl}`(24px)로 축소. 섹션 면색은 풀블리드 유지.
- 정렬: 헤드라인·카피 좌측 정렬 중심. 히어로·최종 CTA는 중앙 정렬.

### Whitespace Philosophy

흰 캔버스와 면색 섹션을 번갈아 깔아 큰 수직 여백으로 구획한다. 카드 내부는
보더·면색으로 분리하므로 그림자 없는 flat 밀도가 기본이다.

> 페이지 합성(섹션 순서·그리드 배치 상세)은 `examples/home/layout.md`가 ground
> truth. 본문 리듬 한 줄: 흰 캔버스 ↔ 다크/코랄틴트 면색 섹션 교차 + 반복 코랄 CTA.

## Elevation & Depth

| 레벨 | 값 | 용처 |
|---|---|---|
| 0 flat | none | 다수 카드·버튼(면색·hairline 보더로 분리) |
| 1 soft (e1) | `rgba(37,40,45,0.15) 0 0 2.4px 0` | 떠있는 작은 요소(`pulldown` 등) |

이 시스템은 그림자 대신 **면색 블록 + hairline 보더**로 깊이를 표현한다(flat).
다크 패널(`{colors.surface-dark}`)·코랄틴트(`{colors.primary-tint}`)가 섹션
구분 장치 역할을 한다. 카드 드롭/모달 그림자는 미관측(Known Gaps).

## Shapes

### Border Radius Scale

| 토큰 | px | 용처 |
|---|---|---|
| `{rounded.sm}` | 6px | 칩/세그먼트 모서리 |
| `{rounded.md}` | 8px | 입력·옵션 칩·flat 카드 |
| `{rounded.lg}` | 10px | 보조 CTA(카톡·상담) |
| `{rounded.xl}` | 12px | 주요 CTA 버튼 |
| `{rounded.2xl}` | 16px | 큰 CTA·코랄틴트 카드 |
| `{rounded.pill}` | 50px | 카테고리/언어 토글 |
| `{rounded.full}` | 9999px | 원형 아바타·뱃지 |

### Border (stroke)

- `{border.hairline}` 1px — 기본 보더(입력·칩·카드).
- `{border.thick}` 2px — 강조 보더(인터넷 상담 `{colors.info}`).
- `{border.ring}` 6px — 사진/아바타 흰 테두리 링크.

사진·일러스트는 직사각형 또는 6px 흰 테두리. 아바타·카운트 뱃지는 원형
(`{rounded.full}`).

## Foundations

### Motion

| 토큰 | 값 | 용처 |
|---|---|---|
| `{motion.duration-fast}` | 150ms | 링크·텍스트 색 hover |
| `{motion.duration-base}` | 220ms | 페이드/등장(opacity·transform) |
| `{motion.duration-slow}` | 400ms | transform·복합 탭 강조(크기·굵기 동반) |
| `{motion.easing-standard}` | `cubic-bezier(0.4, 0, 0.2, 1)` | 기본 이징(Material standard) |

duration 범위 0.15~0.4s, 기본 이징은 Material standard. 스크롤·키프레임 정밀
타이밍은 미계측(Known Gaps).

### z-index

| 토큰 | z | 요소 |
|---|---|---|
| `{zIndex.base}` | 0 | 기본 흐름 |
| `{zIndex.floating-a}` | 98 | fixed 퀵 패널 하위 레이어 |
| `{zIndex.floating-b}` | 99 | 떠있는 퀵 CTA(`quick-cta`) |
| `{zIndex.header}` | 100 | fixed nav(`nav-header`) |

정렬: base < floating(98–99) < header(100). 드롭다운/모달/토스트 레이어 미관측.

### opacity

- `{opacity.scrim}` 0.75 — 히어로 사진 위 `{colors.scrim}` 오버레이.
- disabled/hover opacity 토큰은 미관측(Known Gaps).

### focus

- `{focus.ring-color}`(`{colors.primary-strong}`)로 보더가 전환되고
  UA outline 3px(ink색)이 동반. 커스텀 box-shadow 링은 없음 — 사실상 보더 색
  변화로 포커스를 표현(`input-focus` 참조).

### icon

- 인라인 svg + 비트맵 img 혼용. 로고 svg viewBox `0 0 153 48`, 렌더
  `{icon.logo-w}`×`{icon.logo-h}`(160×50), 면 채움(stroke none).
- 크기 토큰 `{icon.size-sm}`/`{icon.size-md}`/`{icon.size-lg}` 합성. 라인
  아이콘 stroke-width 일관 토큰은 미관측 → lucide/heroicons 식별 불가(커스텀/
  비트맵 추정, Known Gaps).

## Components

### Buttons

- `button-primary` — 주요 견적신청 CTA. `{colors.primary-strong}` 면 +
  `{colors.on-primary}` 텍스트, `{rounded.xl}`, "→" 동반. 변형:
  `button-primary-wide`(풀폭 `{rounded.lg}`), `button-primary-2xl`(큰 CTA
  `{rounded.2xl}`), `button-cta-sm`(소형 `{typography.caption}`).
  - **접근성 등급**: 흰 텍스트 on `{colors.primary-strong}` = **2.35:1**(실측)
    으로 **WCAG AA fail**(본문 4.5:1·큰 텍스트 3:1 모두 미달). 라벨이
    18px/600이라 "큰 텍스트" 면제도 받지 못한다. 시스템 시그니처라 **원본 충실
    목적의 의도적 보존**이며, 이는 라운드트립 충실성 ↔ 접근성의 트레이드오프다.
    AA가 요구되는 맥락에서는 같은 코랄 면에 `{colors.ink}` 텍스트를 쓰는
    `button-primary-aa`(**6.52:1**, AA pass)로 대체한다. "원본 재현" vs "AA 보정"
    의 채택은 사람 승인 게이트 사항(Known Gaps #2).
- `button-ghost-dark` — `{colors.surface-dark}` 면 칩(카테고리 active·언어 토글).
- `button-outline` — 흰 면 + `{colors.hairline-strong}` 보더(카테고리 미선택).
  선택 시 `button-outline-selected`(`{colors.border-selected}` 보더).
- `button-chip-soft` — `{colors.surface-soft}` 옵션 칩("1톤(원룸)").
- `button-info-outline` — `{border.thick}` `{colors.info}` 보더(인터넷 상담).
- `button-kakao` — `{colors.kakao}` 면 + `{colors.kakao-ink}` 텍스트(외부 브랜드).

> hover/active/disabled 결과 면색은 미캡처(transition만 정의됨) → Known Gaps.

### Inputs & Forms

- `input` — `{colors.surface-soft}` 면, `{colors.hairline}` 1px 보더,
  `{rounded.md}`, height 48px, placeholder `{colors.ink-muted}`.
- `input-focus` — 보더가 `{colors.primary-strong}`로 전환(+UA outline).
- `checkbox` — 네이티브가 0px로 숨겨진 커스텀 체크박스. accent
  `{colors.primary-strong}` 추정. checked 비주얼 미캡처(Known Gaps).
- label/help/error 래퍼(`field`) 구조는 미관측.

### Cards & Containers

- `card` — 흰 면 + `{colors.hairline}` 보더 + `{rounded.md}`. flat(그림자 없음).
- `card-tint` — `{colors.primary-tint}` 코랄 면(체크리스트 프로모), `{rounded.2xl}`.
- `card-soft` — `{colors.surface-soft}` 연회색 면.
- 리뷰·서비스·체크리스트 블록 모두 면색 + 보더로 구성된 flat 카드.

### Feedback

- `badge` — 원형 카운트 뱃지("N"), `{typography.micro}` + `{rounded.full}` +
  `{colors.primary-strong}` 면.

### Navigation & Structure (signature)

- `nav-header` — fixed, `{zIndex.header}`, 투명 배경(히어로 위 오버레이). 좌
  로고 · 중 텍스트 내비 · 우 전화(`{typography.phone}`) + 코랄 CTA. 스크롤 시
  배경 변화는 미관측. **높이**: 원본 computed 107px(데스크톱 1440, padding 포함)
  vs 채택값 88px(desktop)/72px(mobile, 헤더 내부 콘텐츠 등가 높이). 컴포넌트
  스펙은 채택값(88px)을 따른다 — 둘 다 관측 근거를 남긴다(Known Gaps #7).
- `pulldown` — 언어 토글 트리거(`{colors.surface-dark}` 면, `{rounded.pill}`,
  e1 그림자). 열린 메뉴 DOM 미검출(present-but-uncaptured, Known Gaps).
- `quick-cta` — 우측 fixed 퀵메뉴(`{zIndex.floating-b}`): 카톡상담
  (`button-kakao`)·전화·무료견적 신청을 묶어 항상 노출. 모바일 하단바화 추정.
- `footer` — 다크(`{colors.surface-dark}`) 풀폭 푸터. 회사정보·약관·링크 컬럼,
  `{colors.ink-faint}` 회색 텍스트.
- `hero-scrim` — 히어로 사진 위 `{colors.scrim}` + `{opacity.scrim}` 라디얼
  오버레이로 흰 헤드라인 가독 확보.

## Do's and Don'ts

### Do

- CTA 면색은 항상 `{colors.primary-strong}` + `{colors.on-primary}`로 통일한다
  (AA가 필요한 맥락은 `button-primary-aa`의 `{colors.ink}` 텍스트로 대체).
- 코랄 텍스트(`{colors.primary}`/`{colors.primary-soft}`)는 **대형(24px+)·
  헤드라인 강조에만** 쓴다(흰 면 위 2.97:1이라 소형은 대비 미달).
- 섹션은 흰 캔버스 ↔ `{colors.surface-dark}`/`{colors.primary-tint}` 면색을
  번갈아 깔아 리듬을 만든다.
- 카드는 그림자 대신 `{colors.hairline}` 보더 + 면색으로 분리한다(flat).
- 헤드라인이 클수록 음수 트래킹을 키운다(`{typography.display}` 계열).
- 본문 회색은 4단 잉크 스케일(`{colors.ink}`~`{colors.ink-faint}`)로 수렴한다.
- 신뢰 배지·파트너 로고처럼 원본의 일회성 외부 브랜드 면색(보험사 블루·정부
  그린 등)은 새 토큰으로 추가하지 말고 시스템 다크 패널(`{colors.surface-dark}`/
  `{colors.surface-dark-alt}`) + `{colors.info}`/`{colors.primary}` 보더로 수렴한다.

### Don't

- 강조색을 `{colors.primary-strong}`(면색용)으로 본문 텍스트에 쓰지 않는다
  (텍스트 강조는 `{colors.primary}`).
- **흰 면 위 소형 본문·캡션(≤16px)을 `{colors.primary}`/`{colors.primary-soft}`
  코랄로 칠하지 않는다** — 2.97:1로 AA(4.5:1) 미달. 작은 텍스트는 잉크 스케일을
  쓰고, 코랄은 대형 강조에만.
- 카드에 임의의 드롭 그림자를 넣지 않는다(flat 시스템).
- 인벤토리에 없는 회색(#666/#888/#ccc 등 레거시)을 새로 도입하지 않는다 —
  잉크 스케일로 수렴.
- `{colors.kakao}`/`{colors.info}`를 브랜드 강조색으로 전용하지 않는다(외부·
  보조 한정).
- 신뢰 배지용으로 그린 등 새 surface 색 토큰을 추가하지 않는다(1회 관측 콘텐츠
  색의 canonical 승격은 provenance 위배 — 시스템 색으로 수렴).
- `{colors.primary-strong}` 면 위에 작은 본문 텍스트를 흰색으로 길게 얹지
  않는다(대비 경계 — Known Gaps #2).

## Responsive Behavior

### Breakpoints (관측 기준)

| 폭 | 거동 |
|---|---|
| 1440 (desktop) | 가로 텍스트 내비 풀노출, 다열 카드(3~4열), 우측 floating 패널 |
| 768 (tablet) | 내비 압축(전화/CTA 강조), 카드 2열 |
| 390 (mobile) | 카테고리 아이콘 가로 스크롤/그리드, 카드 1열 스택, floating 하단바화(추정) |

### Touch Targets

CTA·칩 버튼 높이 ~48px 수준(`input` height 48px 동급). 모바일에서 헤드라인·
CTA는 세로 풀폭.

### Collapsing Strategy

다열 → 2열(tablet) → 1열 스택(mobile). 거터 `{spacing.2xl}`(40px) →
`{spacing.xl}`(24px). 색·타입 토큰은 브레이크포인트 간 유지(레이아웃만 재배치).

### Image Behavior

히어로 사진은 풀블리드 + `hero-scrim` 유지(폭만 축소). 일러스트는 컨테이너 폭에
맞춰 스케일.

## Iteration Guide

페이지를 만들 때 다음 순서로 결정한다.

1. **섹션 면색 리듬 정하기** — 흰 캔버스 기준선에 다크(`{colors.surface-dark}`)·
   코랄틴트(`{colors.primary-tint}`)·연회색(`{colors.surface-soft}`) 면색 섹션을
   배치(상세 리듬은 `examples/home/layout.md`).
2. **CTA 배치** — `button-primary` 계열을 hero·중간·final + 우측 `quick-cta`에
   반복 배치.
3. **타입 스케일 적용** — `{typography.display}`→`{typography.body}` 위계,
   헤드라인 음수 트래킹 유지.
4. **카드 구성** — `card`/`card-tint`/`card-soft`를 flat + hairline 보더로.
5. **컨테이너·거터** — 1280 / `{spacing.2xl}` desktop → `{spacing.xl}` mobile.
6. **상태/상호작용** — 미관측 상태(hover·error 등)는 Known Gaps를 참고해
   임의 창작하지 말고 보수적으로.

## Known Gaps

> 모든 토큰은 `home` 단일 페이지 1회 관측. 교차출현 검증 전이라 canonical
> 확정은 다른 페이지 누적 후. 아래는 추정/미관측을 정직히 기록한 것.

1. **회색 발산** — 한 페이지에 회색 10종+ 혼재(`#333`/`#666`/`#888`/`#ccc`/
   `#1a1a1a`/`#212429`/`#838383`/`#6e6e6e` 등). 본 문서는 빈도 높은 값으로 4단
   잉크 스케일로 수렴 정리했으나, **canonical 회색은 다른 페이지 누적 시 확정**.
   임의 통일 아님 — `reviews/merge-conflicts.md` 후보.
2. **대비(contrast) — 실측 + 접근성 대안** (사람 승인 게이트 사항).
   - **button-primary 계열**: 흰 텍스트(`{colors.on-primary}`) on
     `{colors.primary-strong}` `#ff876f` = **2.35:1**(실측, WCAG 상대휘도 공식).
     라벨 18px/600은 "큰 텍스트"(≥18.66px bold 또는 ≥24px) 면제를 받지 못해
     본문 4.5:1 대상 → **AA fail**(큰 텍스트 3:1로 봐도 2.35 < 3.0). hero·
     selector·calculator·checklist·final·floating에서 6회+ 반복되는 시그니처라
     영향 최대. 이는 **원본 사이트 자체가 쓰는 대비**라 라운드트립 충실성과
     접근성이 충돌한다.
     - **대안 (a)** 텍스트색을 `{colors.ink}`로 → on `#ff876f` = **6.52:1**
       (실측, AA pass). 별도 컴포넌트 `button-primary-aa`로 분리해 둠.
     - **대안 (b)** 면색을 더 진한 코랄로 내려 흰 텍스트 4.5:1 확보 — 단 현
       팔레트에 그 값이 없어 **미관측 색 신규 도입**이 필요(다음 페이지 누적 시
       hover/press 면색 확인 후 권장, provenance 신중).
     - **채택 판단은 사람 승인**: "원본 재현"(현 흰 텍스트 보존) vs "AA 보정"
       (`button-primary-aa` 채택) 중 게이트에서 선택. 기본 컴포넌트는 원본
       충실로 두되 등급(AA fail)을 명시함.
   - **코랄 텍스트**: `{colors.primary}` `#ff6242` on 흰 캔버스 = **2.97:1**
     (실측). 13~16px 본문·캡션 강조 텍스트는 4.5:1 실패, 18px도 3:1 경계 미달.
     → 코랄 텍스트는 대형(24px+)·헤드라인 강조에 한정(Do/Don't 규칙화 완료).
   - **통과 쌍(참고)**: `button-kakao`(`#3c1e1e` on `#fee500`) ≈ 11.76:1,
     `button-info-outline`(`{colors.ink}` on 흰) 15.30:1, 다크 면 흰 텍스트
     12.07:1 — 양호.
3. **primitive 색 램프** — 미노출(LightningCSS 인라인). semantic 직행 — 3계층 중
   primitive 층 없음.
4. **button hover/active/disabled** 결과 면색 — transition만 정의, 색 변화 직접
   캡처 실패.
5. **pulldown 열린 메뉴** — 클릭 후 메뉴 DOM 미검출(present-but-uncaptured).
6. **checkbox checked/커스텀 마크** — 네이티브 0px 숨김, 커스텀 비주얼 미캡처.
   accent 색은 추정.
7. **section 수직 간격·nav 높이** — `{spacing.section}` 96px는 **추정**(full-page
   관측, 섹션별 정확 margin 미측정, 보강 권장). `nav-header` 높이는 원본 computed
   107px(padding 포함) vs 채택값 88px(desktop)/72px(mobile) 불일치 — 컴포넌트
   스펙은 채택값 88px을 따르고 원본값도 근거로 병기(컴포넌트 스펙 ↔ 관측값 구분).
8. **field error/유효성 상태** — 폼 제출 미수행, 미관측.
9. **다크모드** — `--lightningcss-dark` 빈 값, 실제 다크 테마 미노출. `themes`
   그룹 생략.
10. **스크롤·키프레임 애니메이션** 정밀 타이밍 — 미계측.
11. **미관측 컴포넌트** — dialog/modal·toast·tooltip·popover·tabs(role)·table·
    calendar·date picker·select·radio·switch·textarea는 home에 없어 components에
    넣지 않음. 견적 계산기 결과·상담 폼·콘텐츠 페이지 누적 시 출현 가능.
