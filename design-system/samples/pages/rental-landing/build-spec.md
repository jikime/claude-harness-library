# build-spec — rental-landing (무빙박스 렌탈)

흐름 B 생성 계획. 토큰 SSOT = `DESIGN.md`, 섹션 리듬 SSOT = `examples/home/layout.md`.
스택: Next.js 16 App Router + React 19 + Tailwind v4 + shadcn(radix base, lucide).
색·타이포·반경·모션은 `globals.css`에 매핑된 DESIGN.md 토큰만 사용(off-system 0건 목표).

## 페이지: `/` (단일 라우트, src/app/page.tsx)

홈 아키타입의 "흰 캔버스 ↔ 다크 패널 ↔ 코랄 틴트 ↔ 연회색" 교차 리듬을 차용.

| # | 섹션 | 면색(토큰) | 핵심 요소 |
|---|---|---|---|
| 1 | **fixed nav** | 투명→스크롤 시 canvas+hairline | 로고(무빙박스 렌탈) · 메뉴(품목/이용방법/요금/후기) · 전화 `phone` 타입 · 코랄 CTA "렌탈 신청" · 모바일 sheet 메뉴 |
| 2 | **hero** | 이미지 + scrim 0.75 | 배지 → `display` 헤드라인 2줄 → 보조문 → 코랄 CTA + 보조 outline 버튼. `hero-boxes.png` |
| 3 | **인기 렌탈 품목** | canvas | `headline` + 품목 카드 그리드(6): 이미지·이름·일 대여료(코랄)·"담기" 버튼. card + hairline flat |
| 4 | **이용 방법 3스텝** | surface-soft | 신청 → 문앞 배송 → 사용 후 반납. 번호 badge + 아이콘(lucide) + 설명 |
| 5 | **요금/패키지** | canvas | pill 카테고리 탭(원룸/투룸/쓰리룸+) → 패키지 카드 3종(구성·가격·CTA). tabs |
| 6 | **신뢰 지표 + 후기** | coral-tint(#fff5f3) | 코랄 강조 숫자(누적 대여건수 등) 3종 + 후기 카드 2~3 |
| 7 | **친환경/절약 가치** | surface-dark(#35363a) | 다크 패널, 흰 텍스트 + 코랄 강조어, `value-eco.png`, 재사용·비용절감 메시지 |
| 8 | **final CTA** | 이미지 + scrim | 흰 헤드라인 + 코랄 CTA. `cta-movingday.png` |
| 9 | **footer** | surface-dark/-alt | 약관 스트립 + 3컬럼(서비스/고객지원/회사) + ink-faint 텍스트 |
| 10 | **floating quick-CTA** | z `floating-b`(99) | 데스크톱 우측 패널 / 모바일 하단바: 카카오 상담 + 전화 |

## 컴포넌트 매핑(DESIGN.md → shadcn/커스텀)
- `button-primary` → shadcn Button default(`bg-primary` #ff876f, 흰 텍스트; a11y 2.35:1 원본 보존). 큰 라벨.
- `button-primary-wide` → Button size lg, rounded-lg.
- outline-chip/chip-soft → Button variant outline / Badge.
- `input` → shadcn Input(bg surface-soft, hairline, focus ring coral).
- `card`/`card-tint`/`card-soft` → shadcn Card + 면색 변형(canvas/coral-tint/surface-soft), flat(보더 hairline, 그림자 없음).
- `badge` → shadcn Badge(원형/pill).
- pulldown(언어) → 간단 토글(KO/EN) 또는 생략 가능.
- tabs → shadcn Tabs(요금 카테고리).
- accordion → FAQ가 생기면 사용(현재 미계획).

## 이미지(codex-image, public/images/)
hero-boxes.png · item-box/bubble/cart/ladder/hanger/tools.png · value-eco.png · cta-movingday.png
- next/image 사용, 적절한 width/height·alt(한국어).

## 접근성 메모
- 시그니처 코랄 CTA는 흰 텍스트(원본 충실, 2.35:1) — DESIGN.md 정책 따름. 본문 소형 텍스트는 ink 스케일만, 코랄 텍스트는 24px+ 강조에만.
- 다크 패널 위 텍스트는 on-dark(#fff) 사용(대비 양호).

## off-system 가드
Tailwind 기본 팔레트 색 클래스(text-red-500 등) 금지. 색은 globals.css 토큰 유틸(coral/ink/surface-*) 또는 shadcn semantic만.

## 상태: 사용 가능 (모드 B 검수 통과)

- 10개 섹션 전부 `src/components/sections/`에 구현, `src/app/page.tsx`에서 조합.
- `npm run build` 성공(TypeScript·ESLint 0 에러), `/` 정적 프리렌더.
- off-system 색 0건(Tailwind 기본 팔레트 미사용, globals.css 토큰·shadcn semantic만).
- 이미지 9장 codex-image 생성 완료(`public/images/`), next/image 연결.
- **모드 B 검수**: 조건부 통과(블로커 0). 흰/연회색 면 위 소형 코랄 eyebrow 3곳(rental-items·pricing·how-it-works) → `text-ink-muted`(AA pass)로 수정 반영. eco-value eyebrow는 다크 패널 위 의도적 코랄 accent(규칙 범위 외)로 보존.
- 검수 리포트: `../../reviews/rental-landing-fidelity.md`, 스크린샷: `../../reviews/shots/`.
- dev 서버 실행 검증: `http://localhost:3577` (HTTP 200, 전 섹션·이미지·Pretendard 렌더 확인).
