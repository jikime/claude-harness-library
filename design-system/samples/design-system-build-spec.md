# design-system.html — build spec (쇼케이스 모드)

> 흐름 A 헤드라인 산출물. movingbox DESIGN.md(alpha) + examples/home를 단일 HTML
> 스타일가이드로 출력. 상태: **미검증**(design-system-reviewer 모드 A 검수 대기).

## 입력
- `DESIGN.md` (토큰 SSOT, 대비 문서화 보강본)
- `examples/home/layout.md` + `examples/home/example.html` (합성 섹션 근거)
- `analysis/tokens.md` (컴포넌트 변형 근거)

## 산출
- `design-system.html` — standalone HTML + Tailwind CDN + Pretendard Variable + Iconify.
  tailwind.config 토큰 주입은 example.html과 동일(색·radius·zIndex·easing).

## 스택 / 빌드 규칙 준수
- Pretendard Variable(CDN, SIL OFL), 폴백 체인 동일.
- `min-h-[100dvh]`, 한국어 `word-break:keep-all` 적용.
- 이모지 0건 — 아이콘은 Iconify(solar/ri/mdi). 본문 → / ↔ 는 텍스트 화살표(이모지 아님).
- 반응형: 사이드바 lg 표시, 갤러리 그리드 1→2→3열, 컨테이너 거터 40→24px.

## 섹션 구성 (14)
1. 색 팔레트 — Brand&Accent(5) · Surface(5) · ink scale(4) · Lines(3) · Semantic/External(4). 스와치+토큰명+hex+역할+대비배지.
2. 타이포그래피 — display~micro + phone 12종 실제 표본(size/weight/lh/ls 라벨).
3. 간격 — 8종 토큰 바(xxs~section).
4. 반경 — 7종 박스(sm~full).
5. 그림자 — flat(none) + e1.
6. 보더 — hairline/thick/ring 3종.
7. 모션 — fast/base/slow hover 데모 + easing-standard.
8. z-index — base/floating-a/floating-b/header 겹침 시각화.
9. opacity — scrim @0.75 라디얼 오버레이 실물.
10. focus — input + input-focus(강제) 비교.
11. 아이콘 — size sm/md/lg + logo 160×50.
12. 컴포넌트 갤러리 — buttons(primary/aa/wide/2xl/cta-sm/ghost-dark/outline/outline-selected/chip-soft/info-outline/kakao + 상태 default/hover/focus/active) · forms(input/input-focus/checkbox checked·default) · cards(card/card-tint/card-soft) · badge · pulldown(KO/EN) · nav-header(88px) · quick-cta · hero-scrim · footer.
13. 합성 — hero · service-selector · checklist-promo(코랄틴트 CTA) 3섹션 임베드.
14. Known Gaps — 미관측 컴포넌트 11종 라벨 칩 + 상태/대비/회색발산/간격 한계 카드.

## 대비 등급 표기 (DESIGN.md 기록 반영)
- button-primary 흰 텍스트 on #ff876f = **2.35:1 AA fail**(원본 보존, fail 배지).
- button-primary-aa ink 텍스트 on #ff876f = **6.52:1 AA pass**(pass 배지).
- 코랄 텍스트 #ff6242 on 흰 = 2.97:1 → 대형만(면색/주의 배지).
- surface-dark 흰 텍스트 12.07:1 pass · kakao ink 텍스트 11.76:1 pass · ink 스케일 흰 위 15.0/7.2/4.5:1 표기.

## off-system 색 자가 점검
- 사용 hex 유니크 21개(축약 #000/#fff/#fff5f3 포함) 전부 DESIGN.md colors 토큰.
  초안의 유일한 off-system 값 `#f0dcd7`(틴트 스와치 보더) → `hairline #e2e3ea`로 교체 완료.
- rgba() 2종은 토큰 파생: `rgba(37,40,45,0.15)`=e1 elevation 토큰, `rgba(0,0,0,...)`=scrim #000 @ opacity.scrim 0.75(example.html hero-scrim 레시피).
- bg-white/10·border-white/20 = on-dark #ffffff 알파(히어로 배지, example.html 동일 관행).
- **off-system 색 0건** 확인.

## 미관측 준수
dialog/toast/tooltip/popover/tabs/table/calendar/select/radio/switch/textarea는 전시하지 않고 Known Gaps 칩으로만 라벨링. themes(다크모드) 그룹 생략.
