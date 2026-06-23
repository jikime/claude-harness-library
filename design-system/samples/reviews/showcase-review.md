# Showcase Review — moveuniversity (모드 A · A6)

- 대상: `artifacts/sites/moveuniversity/design-system.html`
- 기준(SSOT): `artifacts/sites/moveuniversity/DESIGN.md` (version: alpha)
- 검수자: design-system-reviewer (빌더와 분리)
- 일자: 2026-06-23
- 렌더 검증: Playwright 1.61.0 (Chromium, 1280px + 390px), full-page 스크린샷

## 판정: 통과 (PASS)

blocker/major 0건. minor 1 · info 2. 헤드라인 산출물로 확정 가능.

---

## 1. 완성도 커버리지 — 통과

### 토큰 그룹 (전부 전시 확인)
| 그룹 | DESIGN.md | 쇼케이스 | 결과 |
|---|---|---|---|
| colors | 21종 | Brand 5 + Surface 5 + ink 4 + Lines 3 + Semantic/External 4 = 21 | 전수 |
| typography | 12종 | display~phone 12행 표본(size/weight/lh/ls 라벨 동반) | 전수 |
| rounded | 7종 | sm·md·lg·xl·2xl·pill·full | 전수 |
| spacing | 8종 | xxs~section, 실제 폭 막대 + 근거 | 전수 |
| motion | 4종 | fast/base/slow hover 데모 + easing-standard 명기 | 전수 |
| zIndex | 4종 | base·floating-a·floating-b·header 스택 데모(실제 z 적용) | 전수 |
| opacity | 1종 | scrim 0.75 라디얼 데모 | 전수 |
| border | 3종 | hairline 1 / thick 2 / ring 6 | 전수 |
| focus | (ring) | ring-color primary-strong, 1px, offset 0 — 실인풋 + 강제상태 | 전수 |
| icon | 5종 | size-sm/md/lg + logo 160×50 (logo-w·logo-h 합성) | 전수 |

### 컴포넌트 (전부 전시 확인)
button-primary / -aa / -wide / -2xl / -cta-sm / -ghost-dark / -outline / -outline-selected / -chip-soft / -info-outline / -kakao (11 버튼 전수) · input · input-focus · checkbox(checked+default) · card / card-tint / card-soft · badge · pulldown · nav-header(88px) · quick-cta(z99) · footer · hero-scrim — DESIGN.md components 블록과 1:1 매칭. 누락 0.

추가로 button 상태(default/hover/focus/active)와 selected 칩까지 전시 — 상태 변형 요구 충족.

## 2. off-system 색 0건 — 통과 (독립 검증)

HTML 내 전체 hex/rgba를 추출(`grep`)해 DESIGN.md 토큰셋과 대조:

- 등장 hex 19종 전부 DESIGN.md 토큰값과 일치(ff6242·ff7053·ff876f·ffffff·fff5f3·f4f5f7·35363a·2b2b2b·252527·56585c·74767b·babdc4·e2e3ea·d0d2da·1a1a1a·000000·007aff·fee500·3c1e1e). 토큰 외 색 0건.
- `rgba(0,0,0,0.55)`/`rgba(0,0,0,0.75)` = scrim(#000000) + opacity.scrim 파생. 명시 파생으로 적격.
- `rgba(37,40,45,0.15)` = e1 elevation 토큰값 그대로(DESIGN.md Elevation 표). 적격.
- Tailwind alpha 수식어(white/10·on-dark/85·ink-faint/70·primary-strong/40 등)는 모두 토큰색의 알파 변형 — 신규 색 도입 아님.
- **`#f0dcd7` 교체 주장 확인: HTML 전체 grep 결과 `f0dcd7` 0건.** 빌더 주장대로 hairline 계열(#e2e3ea/#d0d2da)로 교체 완료, off-system 잔재 없음.

## 3. 대비 배지 정확성 — 통과 (표본 재계산, WCAG 상대휘도)

독립 계산값 vs 전시 배지:
| 쌍 | 실측 | 배지 | 판정 |
|---|---|---|---|
| 흰 on primary-strong | 2.35:1 | "2.35 fail" | 정확 |
| ink on primary-strong (aa) | 6.52:1 | "6.52 pass" | 정확 |
| primary on 흰 | 2.97:1 | "2.97:1 대형만" | 정확 |
| 흰 on surface-dark | 12.07:1 | "12.07:1" | 정확 |
| ink-soft on 흰 | 7.13:1 | "7.2:1" | 정확(반올림) |
| ink-muted on 흰 | 4.55:1 | "4.5:1" | 정확 |
| kakao-ink on kakao | 11.76:1 | "11.76:1" | 정확 |
| ink on 흰(info-outline) | 15.30:1 | "15.30:1" | 정확 |

배지 등급(pass/fail)과 수치 모두 DESIGN.md 기록 및 실제 계산에 부합. AA fail을 숨기지 않고 다크 배지로 정직히 노출.

## 4. 미관측 정직성 — 통과

Known Gaps 컴포넌트(dialog/modal·toast·tooltip·popover·tabs·table·calendar/date·select·radio·switch·textarea)를 억지 전시하지 않고 라벨 칩으로만 표기. pulldown 열린 메뉴·checkbox 커스텀 마크·hover/active 면색·field error·다크모드·section 96px 추정·nav 107/88px 병기까지 Gaps 섹션에 정직 기록. 지어내기 0.

## 5. 렌더링 무결성 — 통과 (Playwright)

- 콘솔 오류/pageerror 0건.
- 14개 섹션 전부 비어있지 않음(높이·텍스트 char 모두 양수).
- Iconify 아이콘 23개 전부 shadow DOM에 svg 렌더(empty 0) — 깨진 아이콘 참조 없음.
- full-page 12425px 끝까지 콘텐츠, 잘림/빈 영역 없음.
- placeholder/lorem/TODO/준비중 0건. 데코 이모지 0건(→ 화살표는 한국어 본문 텍스트, 금지 대상 아님).
- 모바일 390px: 가로 오버플로 없음(scrollWidth==clientWidth==390).

---

## 사소 발견 (수정 강제 아님)

- [minor] colors > ink 스와치 배지 "흰 위 15.0:1"이 실측 15.30:1, DESIGN.md·info-outline 표기(15.30)와 미세 불일치. 동일 페이지 내 한 값이 15.0 / 15.30 두 표기 혼재. 일관성 위해 "15.3:1"로 통일 권장(등급 영향 없음).
- [info] e1 elevation의 rgba(37,40,45,...)는 ink(#252527)와 근사하나 정확히 동일하지 않음 — DESIGN.md Elevation 표의 명시 토큰값을 그대로 옮긴 것이라 적격. 별도 조치 불필요.
- [info] 합성/스와치 이미지로 외부 unsplash URL 사용 — 색 토큰과 무관한 콘텐츠 이미지이며 off-system 색 판정 대상 아님. 오프라인 환경에선 로드 실패 가능하나 레이아웃 무결성에는 영향 없음(scrim 데모 컨테이너 유지).

## builder 지시
없음(통과). 선택 사항으로 minor 1건(15.0 → 15.3 표기 통일)만 다음 터치 시 반영 권장.
