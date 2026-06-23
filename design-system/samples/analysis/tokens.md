# moveuniversity — 토큰 인벤토리

> source page: `https://moveuniversity.kr/ko` (home 아키타입, 단일 페이지 1회 관측)
> 캡처: Playwright(chromium headless) — desktop 1440 / tablet 768 / mobile 390, deviceScaleFactor 2, computed CSS 덤프 근거.
> 측정 신뢰도: **계측**(실측). 폴백 아님. 미관측 영역은 Known Gaps 참조.
> 스택: Next.js App Router + Emotion(css-* 클래스) + LightningCSS, Pretendard Variable, ko/en.
> provenance 주의: 단일 페이지 관측이므로 모든 토큰의 `seen on:`은 `home`. 교차출현 검증 전 — canonical 여부는 다른 페이지 누적 시 확정.

---

## 1. 색 (colors)

CSS 변수로 색 램프(`--blue-500` 등)를 노출하지 않음(LightningCSS가 인라인 컴파일, `:root`에는 폰트 변수만). 따라서 **primitive 램프 층 미관측 → semantic 직행**. 아래는 빈도·역할 기반.

### Semantic 팔레트 (빈도순, 실측 hex)
| 역할 토큰 | hex | rgb | 근거(빈도·용처) |
|---|---|---|---|
| `primary` | `#ff6242` | rgb(255,98,66) | 최다 텍스트 강조색(135회). 강조 텍스트·아이콘·포인트. 브랜드 코랄. |
| `primary-strong` / CTA fill | `#ff876f` | rgb(255,135,111) | 주요 버튼 배경 최다(bg 19회). "무료 견적 신청" CTA 면색. |
| `primary-soft` (텍스트) | `#ff7053` | rgb(255,112,83) | 보조 코랄 텍스트(70회). primary와 인접 톤. |
| `primary-tint` (면) | `#fff5f3` | rgb(255,245,243) | 옅은 코랄 배경 카드/스트립(체크리스트 섹션 등). |
| `ink` | `#252527` | rgb(37,37,39) | body 기본 텍스트색(91회), 본문 다수. |
| `ink-soft` | `#35363a` / `#56585c` | rgb(53,54,58) / rgb(86,88,92) | 다크 패널 배경(#35363a) 및 보조 텍스트(#56585c). |
| `ink-muted` | `#74767b` | rgb(116,118,123) | 캡션·메타 텍스트(19회). |
| `ink-faint` | `#babdc4` | rgb(186,189,196) | 가장 옅은 보조 텍스트/플레이스홀더 톤. |
| `canvas` | `#ffffff` | rgb(255,255,255) | 기본 페이지 배경(body). |
| `surface-soft` | `#f4f5f7` | rgb(244,245,247) | 옅은 회색 면(입력 배경·칩 배경·섹션 구분). |
| `surface-dark` | `#35363a` / `#2b2b2b` | rgb(53,54,58) / rgb(43,43,43) | 다크 섹션/리본 배경. |
| `scrim` | `#000000` @ alpha 0.75 | rgba(0,0,0,0.75) | 히어로 사진 위 라디얼 오버레이(흰 헤드라인 가독). opacity 분리 기록. |
| `kakao` (브랜드) | `#fee500` | rgb(254,229,0) | 카카오톡 상담 버튼 배경. 외부 브랜드색. |
| `kakao-ink` | `#3c1e1e` | rgb(60,30,30) | 카카오 버튼 위 텍스트(어두운 갈색). |
| `info` / iOS-blue | `#007aff` | rgb(0,122,255) | 보조 강조(인터넷 상담 버튼 보더/배경). 시스템 블루. |

### 보조 텍스트 그레이(레거시 회색들 — 일회성 의심)
`#333333`(22), `#666666`(9), `#888888`(6), `#cccccc`(5), `#1a1a1a`(4), `#171717`, `#212429`, `#838383`, `#6e6e6e` 등 다양한 회색이 혼재. ink 스케일과 중복 역할 → **시스템 통일 전 발산 신호**(여러 컴포넌트가 제각각 회색 사용). author/reviewer가 ink 스케일로 수렴 판단 권장.

> 발산 메모: 코랄 계열만 4종(#ff6242/#ff7053/#ff876f/#fff5f3), 회색 계열 10종+. 단일 페이지치고 회색 발산이 큼 → `merge-notes` 후보(다른 페이지 누적 시 canonical 회색 확정).

---

## 2. 타이포그래피 (typography)

- **주 패밀리**: `Pretendard` — computed `pretendard, "pretendard Fallback", sans-serif`. `:root` 변수 `--font-pretendard: "pretendard","pretendard Fallback"`. mono 폰트 미관측.
- weight 관측값: 400 / 500 / 600 / 700 / 800 (가변 폰트, 정수 단계로 사용).
- letter-spacing: 큰 헤드라인에서 음수 트래킹(−0.8px @40px, −0.56px @28px, −0.36px @18px, −0.32px @16px) → 큰 글자일수록 더 좁힘.

### 역할 스케일 (실측)
| 역할 | size | weight | line-height | letter-spacing | 근거 |
|---|---|---|---|---|---|
| `display` (hero) | 40px | 700 | 52px (1.3) | −0.8px | "1분만에 빠르게 간편 이사 견적 신청" |
| `headline` (섹션 H2) | 32px | 600~700 | 44.8px (1.4) / normal | normal | "어떤 이사를…", "필수 체크리스트" |
| `title-lg` | 28px | 600 | 39.2px (1.4) | −0.56px | 카드/섹션 제목 "원룸·투룸이사" |
| `title` (H3) | 24px | 600~700 | 33.6px (1.4) | normal | "데이터 기반 표준 견적…", "예상 견적 계산기" |
| `subhead` | 20px | 500~700 | 32px (1.6) | normal | 탭형 텍스트·소제목 |
| `body-lg` | 18px | 600 | 25.2px (1.4) | −0.36px | CTA 라벨, 체크리스트 링크 |
| `body` | 16px | 400~600 | 22.4~27.2px (1.4~1.7) | −0.32px~normal | 본문·내비 링크 |
| `body-sm` | 14px | 400~700 | 19.6~22.4px (1.4~1.6) | normal | 리뷰 본문·메타·전체보기 |
| `caption` | 13px | 600~800 | 18.2px | normal | 칩·가격 강조("78만원+", "최대") |
| `caption-xs` | 12px | 400~600 | 16.8~18px (1.4~1.5) | normal | 마이크로 라벨("365일 24시간", 언어 토글) |
| `micro` | 11px | 700 | normal | normal | 뱃지 안 숫자("N") |
| `phone` (시그니처) | 24px | 700~800 | normal | −0.5px | 전화번호 "1551-2425" 강조 |

> 행간 패턴: 본문 ~1.4, 단락형 본문은 1.6~1.7로 넉넉. 헤드라인 1.3~1.4.

---

## 3. 간격 (spacing)

8px 기반 근사(버튼 패딩·컨테이너 거터 실측 기준). gap은 직접 다수 계측 못함 → 일부 추정.

| 토큰 | px | 근거 |
|---|---|---|
| `xxs` | 2px | 언어 토글 패딩 2px |
| `xs` | 6px | 작은 칩 패딩 2px/6px |
| `sm` | 10px | 카톡/상담 버튼 패딩 10px |
| `md` | 12px | 칩 패딩 0/12px, 소형 버튼 |
| `lg` | 16px | CTA 패딩 16px, 입력 좌우 16px |
| `xl` | 24px | 컨테이너 모바일 거터(px 24px) |
| `2xl` | 40px | 컨테이너 데스크톱 거터(px 40px), 와이드 버튼 좌우 40px |
| `section` | (수직 큰 간격) | 섹션 간 큰 수직 여백 — full-page에서 관측되나 정확 px 미측정 → **추정**, 다음 패스에서 보강 권장 |

---

## 4. 반경 (rounded)

| 토큰 | px | 근거 |
|---|---|---|
| `sm` | 6px | 칩/세그먼트 모서리(6px, 또는 6px 0 0 6px 세그먼트 좌측) |
| `md` | 8px | 입력 필드·칩 버튼("1톤(원룸)") |
| `lg` | 10px | 보조 CTA(카톡·상담·신청하기) |
| `xl` | 12px | 주요 CTA 버튼 |
| `2xl` | 16px | 큰 CTA("1분 무료 견적 신청" A 태그) |
| `pill` | 50px / 300px | 카테고리 토글 버튼(50px), 언어 토글(300px=완전 알약) |
| `full` | 50% | 원형 아바타/뱃지 |

---

## 5. 그림자 (elevation)

| 레벨 | 값 | 근거 |
|---|---|---|
| `flat` (0) | none | 다수 카드/버튼이 그림자 없이 보더·면색으로 구분 |
| `e1` (soft) | `rgba(37,40,45,0.15) 0 0 2.4px 0` | 언어 토글 등 작은 떠있는 요소(거의 유일하게 관측된 그림자) |

> 카드 큰 그림자(드롭/모달)는 정적 캡처에서 미관측 → Known Gaps.

---

## 6. 보더 (border)

- 스케일: `1px`(기본), `2px`(강조 보더 CTA — 인터넷상담 #007aff), `6px`(사진/아바타 흰 테두리 링크).
- 관측 보더색: hairline 후보 `#e2e3ea`(rgb 226,227,234, 입력), `#d0d2da`(rgb 208,210,218, 칩), `#e0e0e0`(rgb 224,224,224), 선택 칩 `#1a1a1a`(rgb 26,26,26, 1px).
- → `hairline` = `#e2e3ea`/`#e0e0e0`, `hairline-strong` = `#d0d2da`, `border-selected` = `#1a1a1a` 또는 `primary-strong`.

---

## 7. 모션 (motion)

실측 transition computed 값(hover 직접 유발은 일부만 성공, 나머지는 정의된 transition 추출):

| 패턴 | 값 | 용처 추정 |
|---|---|---|
| 표준 ease | `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) | transform 0.4s, 텍스트 강조 전환 |
| 빠른 색 전환 | `color 0.15s` / `color 0.2s` | 링크·텍스트 hover |
| 페이드 | `opacity 0.2s` / `opacity 0.22s, transform 0.22s` | 등장/노출 |
| 복합(탭 강조) | `color 0.35s …, font-size 0.4s …, font-weight 0.35s …` (cubic-bezier 0.4,0,0.2,1) | 활성 탭 텍스트가 크기·굵기 함께 전환 |
| 필터/배경 | `filter 0.2s`, `background 0.2s` | 이미지/면 hover |

> duration 범위 0.15s~0.4s. timing 기본 `cubic-bezier(0.4,0,0.2,1)`. 스크롤 인터랙션·키프레임 애니메이션 정밀 타이밍은 미계측(Known Gaps).

---

## 8. z-index

| 레이어 | z | 요소 |
|---|---|---|
| `header` (fixed nav) | 100 | `<header>` fixed, height 107px |
| `floating-b` | 99 | fixed div (우측 떠있는 CTA/퀵 패널 추정) |
| `floating-a` | 98 | fixed div |

> 스케일 정렬: base(auto) < floating(98–99) < header(100). 드롭다운/모달/토스트 레이어 미관측.

---

## 9. opacity

- scrim 오버레이: `rgba(0,0,0,0.75)`(히어로 사진 위) → base `#000000` + opacity 0.75로 분리.
- 그 외 disabled/hover opacity 토큰은 미관측(Known Gaps).

---

## 10. focus-ring

입력 필드 `focus()` 실측:
- `outline: rgb(37,37,39) none 3px` (브라우저 기본 outline 3px, ink색) + `border: 1px solid #ff876f`(코랄로 보더 전환).
- box-shadow 링 없음.
- → `focus-ring` = border 1px `primary-strong`(#ff876f) 전환 + UA outline 3px ink. 커스텀 ring 토큰은 약함 → 사실상 보더 색 변화로 포커스 표현.

---

## 11. 아이콘 (icon)

- 인라인 `svg` 14개 + `img` 59개(상당수 비트맵 아이콘/일러스트).
- 로고 svg: viewBox `0 0 153 48`, 렌더 160×50px, `stroke: none`(면 채움 방식, 라인 아이콘 아님).
- 세트: 클래스 없음(Emotion css-*), lucide/heroicons 식별 불가 → **커스텀/비트맵 혼용** 추정. stroke-width 일관 토큰 미관측.

---

## 12. 표준 컴포넌트 인벤토리 (present-gated, home 관측분)

### button (관측 다수 — 변형 풍부)
| 변형 | bg | text | radius | padding | font | 비고 |
|---|---|---|---|---|---|---|
| `button/primary` (CTA) | `#ff876f` | `#fff` | 12–16px | 16px / 16px 20px | 18–20px·600 | 주요 견적신청 CTA. "→" 동반. |
| `button/primary-wide` | `#ff876f` | `#fff` | 10px | 16px 40px | 18px·600 | 넓은 풀폭 CTA |
| `button/ghost-dark` | `#35363a` | `#fff` | 50/300px | 0 12px / 2px 6px | 16px·500 / 12px·600 | 카테고리 선택칩(active)·언어토글 |
| `button/outline` (chip default) | `#fff` | `#252527` | 50px | 0 12px | 16px·500 | 보더 `#d0d2da`, 카테고리 미선택 |
| `button/chip-soft` | `#f4f5f7` | `#000` | 8px | 0 16px | 13.3px·400 | 옵션 칩 "1톤(원룸)" |
| `button/selected-chip` | `#fff` | — | 50px | — | — | 보더 `#1a1a1a` 1px (선택 상태) |
| `button/info-outline` | `#fff` | `#252527` | 10px | 10px 12px | 16px·400 | 보더 2px `#007aff`(인터넷상담) |
| `button/kakao` | `#fee500` | `#3c1e1e` | 10px | 10px | 14px·700 | 카카오 브랜드 |
| `button/cta-sm` | `#ff876f` | `#fff` | 10px | 12px | 15px·700 | 소형 신청 버튼 |

상태: hover transition 정의됨(color/opacity/transform 0.15–0.4s)이나 hover 결과 면색 변화는 직접 유발 미성공 → **hover/active/disabled 상태값 Known Gaps**. checked/selected는 chip 보더 변화로 관측.

### field / input
- `input`: bg `#f4f5f7`, 보더 1px `#e2e3ea`, radius 8px, padding 0 16px, height 48px, font 16px, placeholder "성함"/회색.
- **focus**: 보더 → `#ff876f`(코랄), UA outline 3px ink. (10절 참조)
- label/help/error 래퍼(`field`) 구조는 명시적 미관측.

### checkbox
- 네이티브 `input[type=checkbox]` 1개이나 `width/height: 0`(시각적 숨김) → 커스텀 스타일 체크박스 추정. checked/커스텀 마크 스타일 미캡처 → Known Gaps.

### pulldown (언어 토글)
- 트리거 버튼: bg `#35363a`, white, radius 300px, padding 2px 6px, e1 그림자.
- click으로 드롭다운 열기 시도 → 열린 메뉴 DOM 미검출(`[role=menu]`/dropdown 0). → **pulldown present-but-uncaptured(트리거 후 메뉴 미노출 또는 JS 라우팅)**. Known Gaps.

### nav / header (시그니처)
- `<header>` fixed, z-100, height 107px, 배경 투명(투명 위 떠있음, 스크롤 시 변화는 미관측).
- 구성(스크린샷 근거): 로고(좌) · 텍스트 내비(이사/청소/자가진단/청소대학/꿀팁/인터뷰) · 전화 "1551-2425"(우) · 코랄 CTA 버튼.

### footer (시그니처)
- 다크(`#35363a`/`#2b2b2b`) 풀폭 푸터 + 회사정보/링크 컬럼(스크린샷 근거). 텍스트 회색 계열.

### floating quick-CTA (시그니처)
- 우측 fixed 패널(z 98–99): 카톡상담·전화·무료견적 신청을 묶은 떠있는 퀵메뉴(데스크톱/태블릿 우하단, 모바일 하단바화 추정).

### card-like 섹션 블록
- `.card` 클래스 0이나 시각적 카드(리뷰·서비스·체크리스트) 다수 — 면색(#fff/#fff5f3/#f4f5f7) + radius 8–16px + hairline 보더로 구성. 명시적 그림자 거의 없음(flat 카드).

### badge
- 작은 원형 카운트 뱃지("N", 11px·700, radius 50%) 관측. 정식 `.badge` 클래스 없음.

---

## 13. 토큰 3계층 관점

- **primitive**: CSS 변수 색 램프 미노출(LightningCSS 인라인) → primitive 층 **미관측**. semantic이 raw hex 직참조.
- **semantic**: 위 1·2절 토큰(primary/ink/canvas/surface…)이 사실상 최상위.
- **component**: 12절 컴포넌트가 semantic 참조(예: button/primary.bg = primary-strong, input.bg = surface-soft, input.focus.border = primary-strong).
- 방향성: 현재 시스템은 2계층(semantic→component). primitive 층은 designmd 작성 시 합성 가능(권고).

---

## Known Gaps (미관측 — 지어내지 않음)

1. **다크모드**: `--lightningcss-dark` 변수만 빈 값, 실제 다크 테마 미노출. 미관측.
2. **button hover/active/disabled** 결과 면색: transition은 정의됐으나 hover 후 색 변화 직접 캡처 실패. Known Gaps.
3. **pulldown(언어) 열린 메뉴**: 클릭 후 메뉴 DOM 미검출 — present-but-uncaptured.
4. **dialog/modal·toast·tooltip·popover·tabs(role)·table·calendar·date picker·select·radio·switch·textarea**: DOM 미검출(home에 없음). present-gated로 생략. 다른 페이지(상담폼·견적계산기 결과)에서 출현 가능 → 누적 분석 후보.
5. **checkbox checked/커스텀 마크**: 네이티브 0px 숨김, 커스텀 비주얼 미캡처.
6. **section 수직 간격 정확 px**: full-page 관측되나 섹션별 정확 margin 미측정(추정). 보강 권장.
7. **에러/유효성 상태**(field error): 폼 제출 미수행 — 미관측.
8. **스크롤·키프레임 애니메이션** 정밀 타이밍: 미계측.
9. **primitive 색 램프**: 미노출.

## 다음 분석 후보 (가이드 크롤)
- 견적 계산기 결과·상담 폼 페이지 → input/select/radio/checkbox/error·toast 가능.
- 자가진단/꿀팁(콘텐츠) 페이지 → table·tabs·card 변형, 회색 스케일 canonical 검증.
- en 로케일(`/en`) → 타입 스케일 동일성·발산 확인.
