---
name: design-extraction
description: 실제 렌더된 웹사이트를 계측해 디자인 토큰·컴포넌트 인벤토리와 아키타입별 레이아웃 맵을 추출하는 작업 매뉴얼. Playwright로 브레이크포인트별 스크린샷과 computed CSS를 뽑아 색·타이포·간격·반경·그림자를 측정하고, 반복 컴포넌트를 묶고, 페이지의 섹션 순서·그리드·여백 리듬을 layout.md로 기록한다. design-analyzer 에이전트가 따른다.
---

# design-extraction — 사이트 계측 매뉴얼

목표는 "보이는 화면"을 **측정 가능한 토큰 + 재현 가능한 레이아웃**으로 바꾸는 것이다. 인상 비평이 아니라 픽셀·CSS 값에 근거한다.

> **경로 규칙(다중 사이트)**: 모든 산출물은 사이트 네임스페이스 `artifacts/sites/{slug}/` 아래에 둔다(Orchestrator가 슬러그를 지정). 토큰은 `artifacts/sites/{slug}/analysis/tokens.md`, 레이아웃·캡처는 `artifacts/sites/{slug}/examples/{archetype}/`. 본문 예시의 경로는 이 규칙으로 치환해 읽는다.

## 트리거
- 사용자가 URL(또는 스크린샷)을 주고 디자인 분석/DESIGN.md 구축을 요청할 때(흐름 A 2단계).

## 1. 캡처 (승인 게이트 — Playwright는 승인 시에만)

**캡처 방식은 Orchestrator의 승인 게이트를 따른다. Playwright를 기본 자동 실행하지 않는다**(브라우저 기동·다중 스크린샷·computed CSS 덤프로 시간·토큰 비용이 큼). 사용자가 (a) Playwright 자동 / (b) 스크린샷 업로드 / (c) WebFetch 정적 중 무엇을 승인했는지 `input.md`에서 확인하고 그에 맞춘다.

- **(a) 승인된 경우에만 Playwright**: 브레이크포인트마다 풀페이지 스크린샷 + computed style 추출. Playwright가 없으면 `npx playwright install chromium`을 안내하고, 그래도 불가하면 스크린샷 폴백.
- **(b) 스크린샷 업로드(권장 기본)**: 사용자가 올린 화면을 Read로 계측(아래 폴백 절차). 측정 신뢰도는 `추정`으로 표기.
- **(c) WebFetch 정적**: 렌더 없이 HTML/인라인 CSS만 보강. 계산값·인터랙션 상태는 Known Gaps로.

캡처 스크립트 예시(Playwright 승인 시, Bash로 실행):

```js
// capture.mjs — node capture.mjs <url> <slug> <archetype>
import { chromium } from 'playwright';
const [url, slug, archetype='home'] = process.argv.slice(2);
const widths = { desktop:1440, tablet:960, mobile:560 };
const browser = await chromium.launch();
for (const [name,w] of Object.entries(widths)) {
  const page = await browser.newPage({ viewport:{ width:w, height:900 }, deviceScaleFactor:2 });
  await page.goto(url, { waitUntil:'networkidle' });
  await page.screenshot({ path:`artifacts/sites/${slug}/examples/${archetype}/reference-${name}.png`, fullPage:true });
}
// computed style 덤프 (desktop 기준)
const page = await browser.newPage({ viewport:{ width:1440, height:900 }});
await page.goto(url, { waitUntil:'networkidle' });
const data = await page.evaluate(() => {
  const out = { colors:{}, fonts:{}, samples:[] };
  const seen = new Set();
  document.querySelectorAll('h1,h2,h3,p,a,button,input,nav,footer,section,div').forEach(el => {
    const c = getComputedStyle(el);
    const key = `${el.tagName}|${c.fontSize}|${c.fontWeight}`;
    if (seen.has(key) || out.samples.length>120) return; seen.add(key);
    out.samples.push({ tag:el.tagName, cls:(el.className||'').toString().slice(0,40),
      color:c.color, background:c.backgroundColor, fontFamily:c.fontFamily,
      fontSize:c.fontSize, fontWeight:c.fontWeight, lineHeight:c.lineHeight,
      letterSpacing:c.letterSpacing, borderRadius:c.borderRadius, boxShadow:c.boxShadow,
      padding:c.padding, margin:c.margin });
  });
  return out;
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
```

스크린샷 폴백: 사용자가 올린 화면을 Read로 보고, WebFetch로 텍스트/일부 인라인 스타일을 보강한다. 폴백일 때는 인벤토리에 `측정 신뢰도: 추정`을 표기한다.

## 2. 토큰 추출

computed 값을 빈도·역할로 묶어 토큰화한다.

- **색**: 등장한 color/background를 hex로 정규화, 빈도순 정렬. 가장 많은 텍스트색→`ink`, 가장 많은 배경→`canvas`, CTA 배경→`primary`, 옅은 보더→`hairline`, 옅은 면→`surface-soft`. 큰 면적의 채도 높은 패널은 `block-*`로. 강조 1회성 색은 `accent-*`, 성공/경고는 `semantic-*`. 의미로 명명한다.
- **타이포**: (fontSize, fontWeight, lineHeight, letterSpacing) 조합을 역할로 매핑 → `display-xl/lg, headline, subhead, card-title, body-lg, body, body-sm, link, button, eyebrow, caption`. 가변 폰트 weight는 측정된 실제값(340 등)을 쓴다. lineHeight는 px→배수로 환산. fontFamily는 주/보조(mono) 분리 + 폴백 스택 기록.
- **rounded**: 등장한 borderRadius 값들을 작은→큰으로 스케일화(xs/sm/md/lg/xl/pill/full). 50px+ 알약형은 `pill`, 9999/50%는 `full`.
- **spacing**: padding/margin/gap을 8px 기반 스케일로 근사(xxs~section). 섹션 간 큰 수직 간격은 `section`.
- **그림자**: boxShadow를 elevation 레벨(0 flat~3 modal)로 묶는다.

산출: `artifacts/sites/{slug}/analysis/tokens.md` — 위 그룹별로 토큰 후보를 표로. designmd-author가 그대로 프론트매터로 옮길 수 있는 형태.

## 2.5 동적·구조 토큰 + 3계층 (present-gated)

정적 색·타입 외에 아래를 **관측되면** 잡는다. 없으면 생략(지어내지 않음). 명명·스키마는 `designmd-spec` 따른다.

- **motion**: 트리거 요소의 `transition`·`animation` computed(duration·timing-function)를 hover/click으로 유발해 계측. 스크롤 비디오·키프레임 타이밍은 어려우면 Known Gaps.
- **zIndex**: nav(sticky)·드롭다운·모달·toast·오버레이의 computed `z-index`를 수집해 레이어 스케일(base<dropdown<sticky<overlay<modal<toast)로 정렬. 오버레이를 캡처(2.5의 표준 컴포넌트 트리거)할 때 함께.
- **opacity**: disabled 상태·hover 오버레이·scrim의 `opacity`/rgba alpha를 토큰화(임시 합성 hex 대신 base색+opacity로 분리 기록).
- **border**: 보더 `border-width`(1px·2px 등) 스케일. 색은 colors.hairline류가 담당.
- **focus**: 폼/버튼을 `focus()`해서 focus-ring(outline 또는 box-shadow 링)의 색·두께·offset 계측.
- **icon**: 인라인 svg/아이콘 폰트의 size(width/height)·stroke-width·세트(클래스·소스로 lucide/heroicons/fontawesome/custom 추정).
- **상황형**: 차트가 있으면 dataviz 카테고리 색, skeleton 로딩 색, `linear-gradient`/`backdrop-filter: blur` 값.
- **primitive 램프(3계층)**: 사이트가 CSS 변수로 색 램프(`--blue-500`, 50~900)나 기본 단위를 노출하면 `:root` computed style/스타일시트에서 추출해 `primitives:` 후보로 기록하고, semantic 토큰이 어느 primitive를 가리키는지 매핑. 노출 안 되면 primitive 층 생략(semantic 직행).

산출: `analysis/tokens.md`에 위 그룹을 별도 절로. 관측 못 한 그룹은 "미관측"으로 Known Gaps에.

## 3. 컴포넌트 인벤토리

반복되는 UI를 컴포넌트로 묶고 토큰으로 매핑한다. 각 컴포넌트: `backgroundColor·textColor·typography·rounded·padding/size`를 토큰 참조로. 상태/변형은 별도 항목. 출력은 `analysis/tokens.md`의 components 절에. 명명은 `designmd-spec`의 표준 컴포넌트 어휘를 따른다.

### 표준 컴포넌트 체크리스트 (있으면 포착, 없으면 생략 — present-gated)
사이트를 훑어 아래가 **존재하는지** 확인하고, 있으면 토큰으로 계측한다. **없는 건 만들지 않는다.**

- **Actions**: `button`(변형 전부), `pulldown`(드롭다운 메뉴)
- **Forms**: `field`(label+control+help/error 래퍼), `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `date`(date picker)
- **Containment**: `card`, `table`, `tabs`, `dialog`(모달), `popover`
- **Feedback**: `alert`, `toast`, `tooltip`, `badge`
- **Date**: `calendar`
- 그 외 사이트 고유/시그니처 컴포넌트(nav·footer·색블록·퀵메뉴 등)도 함께.

### 상태 계측
각 컴포넌트에서 관측 가능한 상태를 함께 잡아 별도 항목으로: default/hover/focus(포커스 링)/active·pressed/disabled/checked·selected/error·invalid/open. `designmd-spec`의 접미사 규약(`-hover`/`-focus`/`-disabled`/`-error`/`-open` 등)으로 명명.

### 숨김/상호작용 컴포넌트 — 트리거 + 폴백
dialog·tooltip·toast·popover·pulldown·calendar·select 드롭다운 등은 정적 캡처에 안 보인다. **상호작용으로 열어보고(트리거), 안 되면 Known Gaps로 폴백**:
1. **DOM 탐지**: `[role=dialog]`, `[role=tooltip]`, `[role=menu]`, `[aria-haspopup]`, `[role=switch]`, `input[type=checkbox/radio/date]`, `.modal/.popover/.toast/.dropdown` 등을 쿼리해 존재 여부와 숨김 상태 스타일을 덤프.
2. **트리거**: Playwright로 트리거 요소를 `hover()`/`click()`/`focus()`해 열고, 열린 상태의 computed 스타일·스크린샷을 확보. 예: 드롭다운/툴팁 hover, 모달 트리거 click, 폼 필드 focus로 focus-ring, checkbox click으로 checked.
3. **폴백**: 트리거가 안 되거나 JS 의존이 강하면 존재만 기록하고 상세 상태는 `Known Gaps`에 "{컴포넌트} present-but-uncaptured(상호작용 트리거 실패)"로 정직히 남긴다. 절대 값을 지어내지 않는다.
4. 트리거로 연 컴포넌트 스크린샷은 `examples/{archetype}/components/{name}.png` 등에 보조 저장 가능.

## 3.5 다중 페이지 누적·델타 병합 (1 호스트 = 1 누적 시스템)

한 페이지는 사이트 디자인 시스템의 단면이다. 같은 호스트의 다른 페이지를 분석할 때는 **기존 `analysis/tokens.md`를 먼저 읽고 델타만** 더한다.

- **provenance**: 각 토큰·컴포넌트에 `seen on:` 목록(어느 페이지에서 관측)을 단다. 새 페이지에서 또 나오면 그 페이지를 추가.
- **교차 출현 = canonical 신호**: 여러 페이지에서 반복된 값 = 진짜 시스템 토큰. **한 페이지에서만** 나온 값 = 콘텐츠·일회성 의심(예: 배너 1회성 색) → "1회 관측"으로 표기해 author·reviewer가 판단하게.
- **분류**: 새 페이지 관측을 (a) 신규(기존에 없음 → 추가), (b) 일치(기존과 같음 → provenance만 갱신), (c) **충돌**(같은 역할인데 값이 다름 → `analysis/merge-notes.md`에 기존값·신규값·페이지 기록, **덮어쓰지 않음**)으로 나눈다.
- **발산 감지**: 새 페이지의 주 팔레트·타입이 기존과 크게 다르면(서브브랜드·콘솔) 인벤토리에 "발산 의심"으로 표기하고 Orchestrator에 보고 → 통합 vs 새 슬러그 결정은 사람 몫.
- **가이드 크롤**: 표준 컴포넌트 체크리스트에서 아직 미관측인 항목(table·dialog·toast 등)이 있으면, 그게 있을 법한 페이지 유형을 다음 분석 후보로 제안.

## 4. 레이아웃 맵 (examples/) — ground truth

DESIGN.md가 못 담는 **페이지 합성**을 아키타입마다 기록한다. 대표 페이지(home/pricing/feature/dashboard 등)별로:

`artifacts/sites/{slug}/examples/{archetype}/layout.md`:
```markdown
# {archetype} layout — source: {url}
## 섹션 순서 (위→아래)
1. top-nav (sticky, h56) — 로고 좌, CTA 쌍 우
2. hero — white canvas, 좌측 정렬 텍스트 / 우측 비주얼, 86px display
3. marquee-strip — 검정 리본, 로고 스크롤
4. color-block: {colors.block-lime} — systems 스토리, 풀폭, {rounded.lg}, {spacing.xxl} 패딩
...
## 그리드 / 컨테이너
- max-width 1280px, gutter desktop {spacing.xxl} → mobile {spacing.lg}
- pricing: 4-col → 2-col(960) → 1-col(768)
## 여백 리듬
- 섹션 간 {spacing.section}, 색블록 사이엔 항상 white canvas 복귀
## 반응형 붕괴
- 768 이하 색블록 풀블리드(모서리 제거), nav 햄버거(960 이하)
```

`reference-{desktop,tablet,mobile}.png`도 같은 폴더에 둔다(2단계 캡처 산출).

## 5. 품질 체크 (산출 전)
- [ ] 모든 토큰 값이 측정/추정 출처를 가진다(추정은 표기).
- [ ] 색 역할이 의미 기반(보이는 색 이름 아님)이고 중복 hex라도 역할 분리.
- [ ] 컴포넌트가 토큰 참조로만 정의됨(raw hex/px 최소).
- [ ] 대표 아키타입마다 layout.md + reference 스크린샷 존재.
- [ ] Known Gaps 후보(다크모드·에러 상태·애니메이션 미관측) 메모.

## 하지 말 것
- 인상·취향 비평("세련됨")으로 토큰을 대체하지 않는다 — 측정값으로.
- DESIGN.md를 직접 쓰지 않는다(그건 designmd-author 몫). 인벤토리·layout.md까지만.
- 관측 못 한 상태를 지어내지 않는다 — Known Gaps로 넘긴다.
