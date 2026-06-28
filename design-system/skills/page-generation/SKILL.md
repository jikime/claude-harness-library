---
name: page-generation
description: 확정된 DESIGN.md 토큰과 examples/ 레이아웃 맵을 기준으로 디자인시스템을 그대로 따른 프리미엄 웹/앱 페이지(standalone HTML + Tailwind CDN)를 생성하는 작업 매뉴얼. 토큰은 DESIGN.md를 우선하고, 페이지 합성은 examples/{archetype}/layout.md를 우선한다. anti-generic 섹션 다양화·완전 출력·하드웨어 가속 모션·AI 티 금지 원칙을 적용하되, 폰트·색은 고정값이 아니라 DESIGN.md 토큰에 양보한다. page-builder 에이전트가 따른다.
---

# page-generation — DESIGN.md 기반 페이지 생성 엔진

핵심 계약: **"이 사이트의 디자인시스템"을 출력한다. generic 템플릿이 아니다.** 그래서 모든 색·폰트·반경·간격은 `DESIGN.md` 토큰에서, 모든 섹션 순서·그리드·여백 리듬은 `examples/{archetype}/layout.md`에서 가져온다. 프리미엄 품질 원칙은 적용하되 토큰을 덮어쓰지 않는다.

> **경로 규칙(다중 사이트)**: 입력 DESIGN.md·examples와 출력(골든 example.html, design-system.html, 흐름 B 페이지)은 모두 사이트 네임스페이스 `artifacts/sites/{slug}/` 아래에 있다(Orchestrator가 슬러그·경로를 지정). 골든=`examples/{archetype}/example.html`, 쇼케이스=`design-system.html`, 흐름 B=`pages/{name}/`.

## 우선순위 (충돌 시)
1. **DESIGN.md 토큰** — 색·타이포·rounded·spacing·components. 여기 없는 색/폰트는 쓰지 않는다(off-system 금지).
2. **examples/{archetype}/layout.md** — 섹션 순서, 그리드, 여백 리듬, 반응형 붕괴.
3. **품질 원칙(아래)** — 위 1·2를 어기지 않는 선에서만 적용.

## 출력 형식 (기본 스택)
- **Standalone HTML**: 단일 `.html`, 빌드툴 없이 브라우저에서 바로 열림.
- **Tailwind CDN** + `tailwind.config` 블록에 **DESIGN.md 토큰 주입**:
```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = { theme: { extend: {
  colors: { /* DESIGN.md colors → 그대로 */ primary:'#000', canvas:'#fff', 'block-lime':'#dceeb1', /* ... */ },
  fontFamily: { sans:[/* DESIGN.md typography.fontFamily + 폴백 */] },
  borderRadius: { /* DESIGN.md rounded */ pill:'50px', lg:'24px' },
  spacing: { /* DESIGN.md spacing */ section:'96px', xxl:'48px' },
}}};
</script>
```
- **폰트**: DESIGN.md가 지정한 패밀리를 먼저 로드. 독점 폰트면 DESIGN.md의 "Font Substitutes"가 권한 오픈소스 대체(예: Inter/Geist, JetBrains Mono)를 CDN으로. 한국어 콘텐츠가 필요하면 Pretendard를 폴백에 추가하되 DESIGN.md 폰트를 1순위로 둔다.
- **아이콘**: Iconify(예: `<iconify-icon icon="solar:arrow-right-linear">`), 이모지 금지.
- **이미지 플레이스홀더**: `https://picsum.photos/seed/{name}/{w}/{h}`, 아바타 `https://i.pravatar.cc/150?u={name}`. Unsplash 직링크 금지.
- **모션(필요 시)**: 순수 CSS `@keyframes` 또는 Motion One CDN. `transform`/`opacity`만 애니메이트, 스크롤은 `IntersectionObserver`.

> React/Next 분기를 요청받으면: 같은 토큰을 CSS 변수/Tailwind preset으로 내고 `.tsx` 컴포넌트로 출력. 합성·토큰 우선순위는 동일.

## 세 모드

### 디자인시스템 쇼케이스 모드 (흐름 A — 헤드라인 산출물)
- 목적: 수집된 `DESIGN.md` 토큰 + `examples/`를 합쳐 **디자인 시스템을 한 파일로 보는 자기완결 단일 HTML**(`artifacts/sites/{slug}/design-system.html`)을 만든다. 흐름 A의 사용자용 헤드라인 산출물.
- 성격: **스타일가이드 쇼케이스**. 아래를 한 페이지에 실제 렌더로 전시한다(설명 텍스트 + 살아있는 컴포넌트).
  1. **헤더/메타**: 시스템 이름·description(DESIGN.md frontmatter), 출처 사이트.
  2. **색 패널**: 모든 `colors` 토큰을 스와치로(역할명 + hex). 그룹별(Brand/Surface/Text/Semantic). 다크 위 색은 다크 배경에 얹어 전시.
  3. **타입스케일**: 모든 `typography` 역할을 실제 견본 문장으로(역할명·size·weight·lineHeight·letterSpacing 라벨 동반).
  4. **간격·반경·elevation + 동적·구조 토큰**: `spacing`·`rounded` 스케일을 시각 바/박스로, `elevation` 레벨 전시. DESIGN.md에 있으면(present-gated) `motion`(전환·easing 데모)·`zIndex`(레이어 순서)·`opacity`·`border`(두께)·`focus`(포커스 링)·`icon`(크기·stroke)·`themes`(라이트/다크 토글)·상황형(dataviz·skeleton·gradient)도 패널로. primitive 층이 있으면 색 램프로.
  5. **컴포넌트 갤러리**: `components`의 모든 항목·변형을 실제로 렌더. 각 항목에 토큰 매핑 캡션.
     - DESIGN.md에 든 **표준 컴포넌트**를 그룹별로 전시: Actions(button 변형·pulldown), Forms(field·input·textarea·select·checkbox·radio·switch·date), Containment(card·table·tabs·dialog·popover), Feedback(alert·toast·tooltip·badge), Date(calendar). **사이트에 없어 DESIGN.md에 없는 것은 만들지 않는다.**
     - **상태 변형**도 함께 렌더: input/field의 `-focus`·`-error`·`-disabled`, checkbox/radio/switch의 `-checked`·`-disabled`, tabs의 `-selected`. 정적 표현이 어려운 오버레이(dialog/popover/toast/tooltip/pulldown/calendar)는 **열린 상태 1컷**으로 전시(필요 시 최소 JS 토글).
     - 미관측(Known Gaps) 상태는 발명하지 말고 "미관측" 라벨로 표기.
  6. **대표 합성 섹션 1개**: 주 아키타입(`examples/{primary}/layout.md`)으로 만든 히어로/섹션 1개 — "이 토큰들이 합쳐지면 이렇게 된다".
- 자기완결: Tailwind CDN + `tailwind.config`에 토큰 주입, 단일 `.html`로 브라우저에서 바로 열림. off-system 0건. 빠짐없는 전시(모든 토큰 그룹·컴포넌트가 한 번 이상 등장)가 합격 기준.
- 산출: `artifacts/sites/{slug}/design-system.html` + `artifacts/sites/{slug}/design-system-build-spec.md`(전시 항목 체크리스트).

### 골든 예제 모드 (흐름 A — 라운드트립 검증용)
- 목적: DESIGN.draft.md만으로 원본 아키타입을 재구성해 라운드트립 검증용 `examples/{archetype}/example.html` 생성. (쇼케이스와 역할 분리: 쇼케이스=시스템 전시, 골든=원본 재현 검증.)
- `examples/{archetype}/layout.md`와 `reference-*.png`를 보고 섹션 순서·색블록·그리드를 최대한 원본에 맞춘다. 콘텐츠는 원본 텍스트 근사 또는 자리표시.

### 페이지 생성 모드 (흐름 B)
- 목적: 사용자 요청 내용으로 새 페이지/웹·앱 서비스를 만든다.
- `artifacts/sites/{slug}/pages/{name}/request.md`의 목적·내용·아키타입을 읽고, **해당 `examples/{archetype}/layout.md`의 섹션 순서·그리드·여백 리듬을 반드시 따라** 사용자 콘텐츠를 채운다(layout.md가 없는 아키타입이면 가장 가까운 것을 쓰고 그 사실을 build-spec에 명시).
- **출력 스택**: standalone HTML이 **기본**. 입력이 아이디어/PRD 수준(여러 화면·기능 명세)이면 Orchestrator가 **"Next.js 웹서비스로 만들어드릴까요?"를 제안**하고, 승인 시 Next.js(App Router)로 출력한다 — 같은 DESIGN.md 토큰을 `tailwind.config`/CSS 변수로 매핑하고 컴포넌트로 분할. **토큰·합성(layout.md) 우선순위는 HTML과 동일**.

## 절차
1. **스펙 작성** — `artifacts/sites/{slug}/pages/{name}/build-spec.md`: 어떤 아키타입, 섹션 순서(각 섹션의 색블록 토큰·컴포넌트·콘텐츠), 반응형 계획. (가장 중요한 결정 = 섹션별 surface 색 선택.)
2. **빌드** — 위 스택으로 단일 HTML. 모든 클래스/스타일이 주입된 토큰을 쓰는지 확인.
3. **자체 점검** — 아래 체크리스트. 단, 합격 판정은 reviewer가 한다(자기 합격 금지).
4. **저장** — `artifacts/sites/{slug}/pages/{name}/index.html`.

## 품질 원칙 (DESIGN.md를 어기지 않는 선에서)

**합성 다양화 (anti-generic)**
- 인접 섹션은 서로 다른 레이아웃 패턴(split / bento / zig-zag / full-bleed). 동일 3컬럼 카드 반복 금지.
- 중앙정렬 히어로 남용 금지(DESIGN.md/layout.md가 중앙정렬을 지시하지 않는 한).
- 컨테이너 제약: `max-w-*` + `mx-auto`로 edge-to-edge 방지(DESIGN.md의 max-width 토큰 사용).

**타이포 위계**
- DESIGN.md typography 토큰의 size/weight/lineHeight/letterSpacing을 그대로. 한국어 텍스트엔 `word-break:keep-all`과 충분한 행간(`leading-tight~snug`, `leading-none` 금지).

**색 규율**
- DESIGN.md 팔레트 밖 색 금지. primary/accent는 DESIGN.md가 "scarce"라 하면 한 화면에 하나만.
- DESIGN.md가 "no drop shadow on color blocks"처럼 Don't를 명시하면 절대 위반하지 않는다.

**상태·접근성·토큰 사용**
- 상호작용 상태·전환은 DESIGN.md 토큰을 쓴다(있으면): 전환 시간/이징 = `{motion.*}`, 오버레이/드롭다운/모달 stacking = `{zIndex.*}`, 포커스 표시 = `{focus.ring-*}`, disabled/scrim 투명도 = `{opacity.*}`, 보더 두께 = `{border.*}`, 아이콘 크기·stroke = `{icon.*}`. 토큰에 없으면 임의값 대신 DESIGN.md 관측 범위를 따른다.
- CTA에 hover/active/focus 상태. 포커스는 focus-ring 토큰. 터치 타깃 ≥44px. 대비는 DESIGN.md 토큰쌍의 WCAG AA 유지.

**완전 출력 (no laziness)**
- 플레이스홀더 주석("<!-- 여기에 카드 반복 -->")·스켈레톤·생략 금지. 모든 섹션을 실제 마크업으로 끝까지 출력한다.
- 반복 요소는 실제로 N개를 작성한다.

**반응형**
- `min-h-[100dvh]`(`h-screen` 금지), `examples/layout.md`의 붕괴 규칙(브레이크포인트별 컬럼 변화, 색블록 풀블리드 등) 적용.

## AI 티 금지
- 순수 검정(#000) 대신 DESIGN.md ink 토큰. 과채도/네온 글로우 금지. 보라-파랑 "AI 그라데이션" 금지(DESIGN.md에 없으면).
- 콘텐츠가 한국어면: 번역투·AI 상투어("혁신적인·차세대·원활한") 금지, 자연스러운 존댓말, 둥근 숫자 대신 구체값(47,200+), 현실적인 한국 이름/브랜드.
- 영문/타 언어 시스템이면 DESIGN.md description의 보이스를 따른다.

## 품질 체크 (저장 전 자체 점검)
- [ ] 모든 색·폰트·반경·간격이 DESIGN.md 토큰에서 왔는가(off-system 0건).
- [ ] 섹션 순서·그리드·여백이 해당 layout.md와 일치하는가.
- [ ] DESIGN.md의 Don't 목록을 하나도 위반하지 않았는가.
- [ ] 모든 섹션이 끝까지 출력됐는가(플레이스홀더 0건).
- [ ] 모바일 폭에서 겹침·표 넘침·차트 깨짐 없는지 점검 안내.
- [ ] 브라우저에서 단일 파일로 바로 열리는가.

## 하지 말 것
- DESIGN.md에 없는 색/폰트를 "더 예뻐서" 추가하지 않는다.
- generic AI 디자인 룩(특정 다크 배경·고정 폰트 강제)을 DESIGN.md 위에 덮어쓰지 않는다 — 품질 원칙만 적용하고 토큰은 DESIGN.md에 양보.
- 자기 결과를 합격 처리하지 않는다 — reviewer 검수 전까지 `미검증`.
