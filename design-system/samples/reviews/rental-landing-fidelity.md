# rental-landing — Fidelity Review (모드 B)

> 대상: `pages/rental-landing/` (Next.js 16 + React 19 + Tailwind v4 + shadcn)
> 기준(SSOT): `../../DESIGN.md` (토큰) · `../../examples/home/layout.md` (합성) · `build-spec.md` (계획)
> 검수: 코드 정적 분석 + off-system grep + `npm run build` + Playwright 3-브레이크포인트 실측 캡처/콘솔/오버플로 + WCAG 대비 재계산
> 검수자: design-system-reviewer (생성자와 분리)

## 판정: **조건부 통과 (CONDITIONAL)**

블로커 없음. 빌드/반응형/off-system/시맨틱/AI 티 전부 통과. 단, **DESIGN.md가 명시한 "Don't" 규칙(흰/연회색 면 위 소형 코랄 텍스트 금지)을 3곳에서 위반**한다(major). 이 3곳을 ink 스케일로 교체하면 무조건 통과. builder 회송(최소 수정).

---

## 검증한 외부 신호 (요약)

| 점검 | 방법 | 결과 |
|---|---|---|
| off-system 색(Tailwind 팔레트) | `grep -rE '(text\|bg\|border\|ring\|fill)-(red\|...\|slate\|gray\|zinc)-[0-9]{2,3}'` 전 src | **0건** |
| 임의 hex | `grep '#[0-9a-f]{3,8}'` tsx | `#000000` 2건 = hero/final-cta scrim(`colors.scrim` + `/75` = `opacity.scrim` 0.75) → **on-system** |
| rgb/hsl 임의색 | grep | 0건 |
| 빌드 | `npm run build` | **성공**, TypeScript 0 에러, `/` 정적 프리렌더 |
| 콘솔/페이지 에러 | Playwright 3 vp | **0건** |
| 가로 오버플로 | scrollWidth vs clientWidth @390/768/1280 | **0건**(390/390, 768/768, 1280/1280) |
| 대비(코랄) | WCAG 상대휘도 재계산 | DESIGN.md 실측치와 일치(아래) |

스크린샷(실측):
- `reviews/shots/desktop-1280-full.png` · `desktop-1280-top.png`
- `reviews/shots/tablet-768-top.png`
- `reviews/shots/mobile-390-full.png` · `mobile-390-top.png`

---

## 위반 (심각도순)

### MAJOR-1 — 흰/연회색 면 위 13px 코랄 eyebrow (DESIGN.md Don't 위반)
DESIGN.md Don't: *"흰 면 위 소형 본문·캡션(≤16px)을 `{colors.primary}`/`{colors.primary-soft}` 코랄로 칠하지 않는다 — 2.97:1로 AA 미달. 작은 텍스트는 잉크 스케일을 쓰고, 코랄은 대형 강조에만."*

Playwright computed-style 실측으로 확인한 위반 3곳(모두 `text-caption` 13px, `color: rgb(255,98,66)` = `#ff6242` = `colors.primary`):

| 위치 | 텍스트 | 배경(computed) | 대비(재계산) | 판정 |
|---|---|---|---|---|
| `rental-items.tsx:64` | "인기 렌탈 품목" | `#ffffff` canvas | **2.97:1** | 위반(≤16px 코랄/흰) |
| `pricing.tsx:127` | "요금 안내" | `#ffffff` canvas | **2.97:1** | 위반 |
| `how-it-works.tsx:26` | "이용 방법" | `#f4f5f7` surface-soft | **2.72:1** | 위반 |

이는 단순 a11y 권고가 아니라 **시스템이 명시적으로 금지한 패턴**이라 충실성 위반으로 집계한다.

**수정 지시(builder)**: 세 eyebrow 라벨의 `text-coral`을 제거하고 ink 스케일로 교체.
권장: `text-ink-muted`(#74767b, 흰 위 4.6:1 AA pass) 또는 `text-ink-soft`. 코랄 강조가 꼭 필요하면 24px+로 키우거나 코랄 *면*(badge/pill 위 흰 텍스트) 형태로 전환. 단순 색 교체가 가장 작은 변경.

### INFO-1 — 다크 면 위 13px 코랄 eyebrow (`eco-value.tsx:29` "다시 쓰는 이사")
`#ff6242` on `#35363a` = **4.07:1**. Don't 규칙은 *흰 면* 한정이고 다크 면에서는 대비가 회복되므로 위반으로 집계하지 않음. 단 AA 본문 4.5:1엔 살짝 못 미침(13px). 통일성 위해 위 3곳과 같이 손볼지는 선택(필수 아님).

### INFO-2 — nav 링크 hover 색 `hover:text-coral` (`site-nav.tsx:81`)
스크롤 상태에서 16px 본문 링크 hover 시 코랄(흰 위 2.97:1). 전이적 hover라 영향 작음. 일관성 위해 `hover:text-coral-strong`보다는 `hover:text-ink` 또는 굵기/밑줄 강조 권장(선택).

---

## 정책 일치(위반 아님, 의도적 보존 확인)

- **코랄 CTA 흰 텍스트 2.35:1** — `button.tsx` default(`bg-primary #ff876f` / `text-primary-foreground #fff`) 및 모든 섹션 CTA. Playwright 재계산 2.35:1로 DESIGN.md 실측치와 정확히 일치. DESIGN.md/build-spec 정책상 **원본 충실 목적의 의도적 보존**이라 감점하지 않음(정책 일치 확인).
- **대형 코랄 강조는 허용** — 가격 `text-title`(24px, rental-items:105)·`text-[34px]`(pricing:91)·stats `text-[40px]`(trust-reviews:38, coral-tint 위 2.77:1)은 모두 DESIGN.md "대형(24px+) 강조에만" 규칙에 부합(시스템은 contrast가 아니라 size-gate 정책). 통과.
- **코랄 아이콘**(how-it-works:49, eco-value:48)은 텍스트 아님 → 규칙 비적용. 통과.

## 합성 준수 (layout.md / build-spec) — 통과

- 섹션 순서/면색 교차 리듬 실측 확인: nav(투명) → hero(scrim) → 인기품목(canvas) → 이용방법(**surface-soft**) → 요금(canvas) → 신뢰·후기(**coral-tint #fff5f3**) → 친환경(**surface-dark #35363a**) → final CTA(scrim) → footer(surface-dark/-alt). 흰↔연회↔코랄틴트↔다크 교차 리듬 구현됨.
- 반복 코랄 CTA: nav·hero·품목 담기·pricing·final·floating quick-cta = 6+회. layout.md "4회+ 반복" 충족.
- floating quick-cta: 데스크톱 우측 패널(z-99, kakao #fee500 + coral) / 모바일 하단 고정바. `zIndex.floating-b` 일치. 스크린샷 확인.
- nav 반응형: desktop 텍스트 내비 풀노출 → tablet/mobile 햄버거 sheet. height 88/72px(DESIGN.md 채택값) 일치.
- flat 카드(hairline 보더 + 면색, 그림자 없음), `rounded-2xl`/`rounded-xl` 등 반경 토큰 사용. 일치.

## 반응형 — 통과
390/768/1280 전부 가로 오버플로 0, 겹침/깨짐 없음. 모바일 1열 스택, 카드 그리드 3→2(sm)→1, 하단바 노출, 헤드라인/CTA 세로 풀폭. 모바일 하단바와 footer 겹침은 `page.tsx` 스페이서 div(`h-[57px] lg:hidden`)로 처리됨.

## 접근성 — 양호(위 MAJOR 제외)
- 시맨틱: `<header><nav><main><section><footer>` + `<h1>`1개/`<h2>` 섹션별 + `<ul>/<ol>/<li>`. 양호.
- alt: 4개 이미지 모두 서술형 한국어 alt(품목은 데이터 배열, 전부 채워짐).
- aria: 장식 아이콘 `aria-hidden`, 아이콘 버튼/별점 `aria-label`. 양호.
- focus: `--ring: #ff876f` + `focus-visible:ring-3 ring-ring/50` 버튼 적용 → 포커스 가시.
- 주의(minor, info): 모바일 미스크롤 hero에서 햄버거가 `text-ink`(어두움)로 사진 위 — 사진 밝기에 따라 대비 변동. 현재 캡처에선 식별 가능. 사진 교체 시 재확인 권장(필수 아님).

## AI 티 — 통과
플레이스홀더/lorem/TODO/이모지 0건(grep). 깨진 이미지 0(9장 전부 로드, 콘솔 에러 0). 카피·품목·후기 도메인 적합(이사 렌탈 한국어). footer에 "디자인 예시·샘플 수치" 고지 명시. 제네릭 레이아웃 아님.

---

## 재실행 지시 (→ page-builder, 최소 수정)
1. `rental-items.tsx:64`, `pricing.tsx:127`, `how-it-works.tsx:26` 의 eyebrow `text-coral` → `text-ink-muted`(권장) 또는 `text-ink-soft`로 교체. (MAJOR-1 해소 — 단순 클래스 교체 3곳)
2. (선택) `eco-value.tsx:29` 다크 위 eyebrow·`site-nav.tsx:81` hover 코랄도 통일하려면 함께 조정(INFO, 필수 아님).

위 1번만 반영하면 **통과**. 색·합성·반응형·빌드 변경 불필요. 재검수는 해당 3개 라벨 색만 확인하면 됨(전체 라운드 불필요).
</content>
</invoke>
