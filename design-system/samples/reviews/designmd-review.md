# 검수 리포트 — movingbox DESIGN.md + home 골든 예제 (모드 A)

판정: **조건부 합격**

요약: DESIGN.md는 무결성이 우수하다 — broken-ref 0건, off-system 색 0건(example.html 전수 검증), 토큰 그룹·표준 컴포넌트 커버리지가 present-gated로 정직하며 Known Gaps가 미관측을 억지로 채우지 않았다. home 라운드트립도 섹션 순서·면색 리듬·그리드·여백이 reference-desktop/mobile과 일치한다. 다만 시스템의 **최다 반복 컴포넌트(button-primary)**가 WCAG AA 대비 미달(흰 텍스트 on `primary-strong` = **2.35:1**, 측정값)이며, 강조 텍스트색 `primary`(#ff6242)를 흰 면 위 본문/캡션 텍스트로 쓰는 패턴도 2.97:1로 미달이다. 이는 author가 부분적으로만(button만) Known Gaps에 기록했고, 시스템 권고로 승격될 만큼의 명시적 가드(대비 우회 토큰·사용 규칙)가 없다. **author에게 대비 항목 보강 후 합격** 권고. 라운드/구조는 회송 불요.

검증 방법: 토큰 파싱은 frontmatter 직접 파싱(broken/orphaned). 대비는 WCAG 상대휘도 공식 직접 계산. 라운드트립은 Playwright(chromium)로 example.html을 1440/390 렌더 후 reference-*.png와 대조.

---

## 위반/결함 (심각도 순)

- **[major] 대비 — button-primary 계열 (A2)** `colors.on-primary`(#ffffff) on `colors.primary-strong`(#ff876f) = **2.35:1** (측정). 라벨은 `typography.body-lg`(18px/600). WCAG 큰 텍스트 기준(≥18.66px bold 또는 ≥24px)에 18px/600은 **명확히 도달하지 못해 본문 4.5:1 적용 대상**이며, 설사 큰 텍스트로 봐도 **2.35 < 3.0으로 둘 다 실패**. 이 CTA는 hero·selector·calculator·checklist·final·floating에서 6회+ 반복되는 시스템 시그니처라 영향이 가장 크다. author 추정 2.1:1보다는 높으나 여전히 미달.
  → **수정 지시(author)**: 다음 중 하나를 DESIGN.md에 명문화.
    (a) CTA 면색을 더 진한 코랄로 내려 흰 텍스트 4.5:1 확보(현 팔레트에는 그 값이 없음 → 신규 토큰 `primary-press`/`primary-aa` 같은 진한 코랄 추가 필요. 단 이는 **관측되지 않은 색의 도입**이라 신중 — 다음 페이지 누적 시 hover/press 면색 확인 후 권장). 또는
    (b) `ink`(#252527) 텍스트 on `primary-strong` = **6.52:1**(측정·통과)로 CTA 텍스트색을 전환하는 변형을 별도 component로 분리하고, 흰 텍스트 CTA는 "대비 미달, 원본 충실 목적의 의도적 보존"임을 Known Gaps가 아닌 **Do/Don't + 컴포넌트 주석에 등급(AA fail) 명시**. 최소한 (b)의 "등급 명시"는 반드시 반영.
  비고: 원본 사이트 자체가 이 대비를 쓰므로 라운드트립 충실성과 접근성이 충돌한다. 시스템을 "원본 재현"으로 둘지 "AA 보정"으로 둘지는 사람 승인 사항 — author가 선택지를 문서화하고 게이트에 올릴 것.

- **[major] 대비 — `primary`(#ff6242)를 텍스트로 사용 (A2)** 흰 캔버스 위 `primary` 텍스트 = **2.97:1**(측정). example.html에서 `t-caption text-primary`("가정 이사"·"원룸·투룸 이사" 13px/600, line 457·471·484·491·498), `t-body-lg text-primary`("0 원" 18px, line 285), 캡션 강조("20% 이상" line 525) 등 **작은/본문 크기 강조 텍스트로 다수 사용**. 13px 캡션은 본문 4.5:1 대상이라 명백 실패, 18px도 3:1 경계에서 2.97로 미달.
  → **수정 지시(author)**: DESIGN.md의 Do("강조 텍스트는 `primary`를 쓴다")가 대비 미달을 유발함을 인지하고, **(1) 흰 면 위 `primary` 텍스트는 ≥18.66px bold/대형 헤드라인 강조에 한정**한다는 사용 규칙을 Do/Don't에 추가하거나, (2) 본문/캡션 강조용으로 더 진한 코랄 텍스트 토큰을 별도 정의. 현 상태로 빌더(흐름 B)가 작은 코랄 텍스트를 양산하면 모드 B B3에서 반복 적발될 구조. 최소한 "작은 본문 코랄 텍스트 금지"를 Don't에 명문화.

- **[minor] orphaned-tokens (A3)** `focus.ring-offset`(0px)·`focus.ring-width`(1px)가 정의됐으나 본문·components에서 `{focus.x}`로 참조되지 않음(참조되는 건 `focus.ring-color`뿐). 삭제 후보 또는 `input-focus`/CTA focus-ring 컴포넌트에서 명시 참조 권장. 불합격 사유 아님.

- **[minor] example ↔ DESIGN.md 스펙 불일치 — nav 높이** DESIGN.md `nav-header.height: 107px`(및 layout.md), 그러나 example.html 헤더는 `h-[72px] md:h-[88px]`로 렌더. 라운드트립 시각 인상에는 영향 미미하나 골든 예제가 자기 스펙값을 벗어남. → author/builder 중 1인이 107px로 정합시키거나, DESIGN.md를 실제 채택값으로 낮추고 근거 갱신(107px는 layout.md에서도 "추정" 톤). 색·구조 회송 불요한 경미 항목.

- **[info] 의도적 편차 — trust-badges 색 수렴 (점검 항목 3)** 원본은 **삼성화재=블루 그라데이션 카드 / 브랜드대상=블랙 카드 / 국토교통부=그린 그라데이션 카드**(reference 확인). builder는 셋 모두 다크 패널(`surface-dark`/`surface-dark-alt`)로 수렴하고 `info`(블루) 보더·`primary-strong`(코랄) 보더로 구분, **국토부 그린→코랄로 치환**. off-system 0건은 지켰고 "흰 캔버스↔다크 패널" 시스템 리듬에 부합하는 **타당한 수렴**으로 판단. 다만:
  - 원본의 3색 신뢰 배지 색 스토리(보험사 블루/수상 골드블랙/정부 그린)가 **단색 다크로 평탄화**되어 정보 위계가 약해짐. example에서 3장이 거의 동일해 변별이 보더색에만 의존.
  - **의견(author 선택)**: 이 시스템은 외부 브랜드색을 `info`/`kakao`로만 한정하는 정책이라 **그린 surface 토큰을 새로 추가하는 것은 비권장**(1회 관측 콘텐츠색의 canonical 승격 위험, provenance 원칙 위배). 대신 builder가 카드별 면색을 `surface-dark`/`surface-dark-alt`로 교차하거나 아이콘 타일 톤으로 변별을 주는 정도가 적절. 즉 **DESIGN.md에 surface 토큰 추가는 불필요**, 다만 trust-badge류 "외부 브랜드 색을 시스템 색으로 수렴" 규칙을 Do/Don't에 한 줄 추가하면 흐름 B 일관성에 도움.

- **[info] 회색 발산 수렴 검증 (점검 항목 4)** tokens.md가 회색 10종+ 발산(#333/#666/#888/#ccc/#1a1a1a/#212429/#838383/#6e6e6e 등)을 보고. DESIGN.md는 빈도 높은 값으로 **4단 잉크 스케일(ink #252527 91회 / ink-soft / ink-muted #74767b 19회 / ink-faint)**로 수렴하고, Known Gaps #1에 "canonical 회색은 다른 페이지 누적 시 확정, 임의 통일 아님, merge-conflicts 후보"로 정직히 기록. **적절한 수렴**으로 판단(억지 통일 아님, 발산을 은폐하지 않음). example.html은 잉크 스케일 외 회색을 새로 도입하지 않아 Don't("레거시 회색 도입 금지") 준수.

---

## 통과 항목

- **A1 broken-ref: 0건** — 본문·components의 `{group.token}` 66종 전부 frontmatter에 정의됨(파싱 검증). `rounded.2xl`·`spacing.2xl` 포함 모두 해소.
- **off-system 색: 0건(독립 검증)** — example.html의 hex 19종 전부 DESIGN.md 토큰과 일치. Tailwind 기본 팔레트 유틸(gray-/blue-/green- 등) 0건. `bg-white/10`류는 #ffffff(canvas/on-dark) 알파 오버레이로 다크 면 위 인버스 처리(시스템 관용). `rgba()`는 scrim(#000@0.75)·e1 그림자·scrim 라디얼 내부 스톱뿐 — 전부 토큰 파생. **builder의 "off-system 0" 주장 검증됨.**
- **A2 통과 쌍(측정)**: ink on canvas 15.30:1 · ink-soft 7.13:1 · ink-muted 4.55:1 · ink-faint on surface-dark 6.42:1(흰면엔 미사용 확인) · button-kakao 11.76:1 · button-info-outline 15.30:1 · 다크 면 흰 텍스트(nav/pitch/footer 제목) 12.07:1. 색블록 위 텍스트(다크·코랄틴트) 가독 정합.
- **A4 완성도**: frontmatter 키 충족(colors~components + motion/zIndex/opacity/border/focus/icon present-gated). 타이포 역할 13종 6필드 충족. 본문 11+섹션. 색 역할 의미 기반, 변형이 components로 분리. **표준 컴포넌트 커버리지**: home 관측분(button 9변형·input·input-focus·checkbox·card 3종·badge·pulldown·nav·footer·quick-cta·hero-scrim) 모두 수록. **미관측(dialog/toast/tooltip/popover/tabs(role)/table/calendar/date/select/radio/switch/textarea/field-error)은 Known Gaps #11에 present-gated로 정직히 누락 처리 — 억지로 채우지 않음(통과).**
- **A4 동적·구조 토큰**: motion·zIndex(base<floating 98–99<header 100, 오버레이 quick-cta zIndex 정합)·opacity(scrim)·border(1/2/6px)·focus(보더 전환형)·icon 모두 관측분 수록. 폼/버튼 존재 → focus-ring 존재(정합). themes는 다크모드 미노출로 정당하게 생략.
- **A4 tier-direction**: primitive 색 램프 미노출(LightningCSS) → semantic 직행을 Known Gaps #3에 명시. 역참조 없음. focus.ring-color → colors.primary-strong 등 component→semantic 방향 정상.
- **A5 라운드트립(데스크톱)**: 렌더 대조 결과 섹션 순서 일치 — nav+hero(다크 사진+라디얼 scrim) → service-selector(흰, 칩+퀵견적바) → dark-pitch(#35363a) → value-props 3-pillar(흰) → service-grid(탭+3카드) → checklist-promo(코랄틴트 #fff5f3) → reviews(흰) → calculator(surface-soft) → trust-badges(다크 3카드) → final-cta(다크 사진) → footer(다크). **면색 교차 리듬·1280 컨테이너·다열→그리드·좌측 정렬 헤드라인/중앙 hero·final 모두 reference와 일치.**
- **A5 라운드트립(모바일)**: 390 렌더 정상 — 카드 1열 스택, 면색 풀블리드 유지, 헤드라인 keep-all 줄바꿈, 가로 스크롤/겹침/표 넘침 없음, 모바일 하단 고정 CTA 바 + 스페이서 존재. `min-h-[100dvh]` 사용(h-screen 미사용).
- **완전 출력**: 플레이스홀더 주석·스켈레톤 0건. 리뷰/카드/배지 실제 N개 렌더. 이모지 미사용(Iconify 라인 아이콘).

---

## 재실행 지시

- **author에게 / 대비(A2)만 다시**:
  1. button-primary 계열 — 흰 텍스트 on `primary-strong` = 2.35:1(AA fail)을 컴포넌트 주석·Do/Don't에 **등급 명시**하고, 보정안(ink 텍스트 6.52:1 변형 분리 또는 진한 코랄 면 신규 토큰) 중 택1을 문서화해 사람 승인 게이트에 올릴 것. (원본 충실 vs AA는 사람 결정)
  2. `primary`(#ff6242) 텍스트 — 흰 면 위 소형/본문 코랄 텍스트(≤2.97:1) 금지 규칙을 Don't에 추가, 대형 강조 한정으로 제한.
  3. orphaned `focus.ring-width`/`ring-offset`를 `input-focus`/CTA focus 컴포넌트에서 참조하거나 삭제.
  4. (택) trust-badge "외부 브랜드색 시스템 수렴" 규칙 1줄 Do/Don't 추가. **surface 토큰 신규 추가는 비권장**(provenance).
- **builder에게 / 경미 정합만**: nav-header 높이를 DESIGN.md(107px)와 정합(또는 author가 스펙을 채택값으로 하향). 색·구조·레이아웃 재생성 불요.
- **analyzer 회송: 불요** — 라운드트립이 원본을 충실히 담음(시스템이 원본을 못 담은 정황 없음).

라운드 1/3. 위 대비 보강(문서화 수준)만 반영되면 합격 전환 가능 — 색/구조 재작업은 필요 없음.
