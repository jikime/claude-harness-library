---
name: design-system-orchestrator
description: 디자인 시스템 하네스의 전체 진행표·입구. 사용자가 (A) 웹 주소를 주면 그 사이트를 분석해 design.md 규격 DESIGN.md + examples/ 레이아웃 근거를 구축하고, (B) DESIGN.md와 만들 내용을 주면 그 디자인시스템을 그대로 따른 웹/앱 페이지를 생성한다. 사용 키워드 — "이 주소 디자인 분석해줘", "사이트 디자인시스템 뽑아줘", "DESIGN.md 만들어줘", "design.md 구축", "이 디자인시스템으로 페이지 만들어줘", "이 DESIGN.md로 랜딩/가격/대시보드 페이지", "시스템에 맞게 화면 만들어줘", "이 사이트 느낌으로 페이지", "다시 분석", "이 페이지만 다시", "컴포넌트만 다시 뽑아줘", "레이아웃만 다시", "모바일만 다시", "업데이트/보완/재실행".
---

# Design System Orchestrator (전체 진행표)

## 역할

두 흐름을 하나의 진행표로 묶어, 매번 같은 품질로 재실행·검증·기록한다.

이 하네스는 **2단계**다. 둘 다 자연어로 트리거되며 이 Orchestrator가 받아 관련 에이전트에게 위임한다.

- **1단계 · 흐름 A · 디자인 시스템 구축**: 사용자가 **웹주소**를 주면 → 실제 렌더된 디자인을 계측 → `DESIGN.md`(design.md 규격) + `examples/`(레이아웃 근거) + **`design-system.html`(디자인 시스템을 한 파일로 보는 단일 HTML 스타일가이드 쇼케이스)**.
- **2단계 · 흐름 B · 서비스 생성**: 사용자가 **만들고 싶은 서비스 내용**을 입력하면 → 분석된 디자인 시스템(`DESIGN.md`+`examples/`)을 그대로 따른 웹/앱 서비스를 생성(standalone HTML 또는 Next.js/React).

이 스킬은 분석·집필·생성·검수를 **직접 하지 않는다.** 서브에이전트를 순서대로 호출하고, `artifacts/` 파일로 핸드오프하며, 검수-수정 루프와 사람 승인 게이트를 관리한다.

## 팀원과 매뉴얼

| 팀원(Agent) | 따르는 매뉴얼(Skill) | 산출물 |
|---|---|---|
| `design-analyzer` | `design-extraction` | 토큰·컴포넌트 인벤토리 + 아키타입별 layout.md + reference.png |
| `designmd-author` | `designmd-spec` | `DESIGN.draft.md` |
| `page-builder` | `page-generation` | `pages/{name}.html` / 골든 `examples/{archetype}/example.html` |
| `design-system-reviewer` | `design-fidelity-check` | 검수 리포트(모드 A/B) |

`designmd-spec`는 author와 reviewer가 공통으로 참조하는 design.md 포맷 SSOT다.

## 사이트 네임스페이스 규칙 (다중 사이트 — SSOT)

이 프로젝트는 여러 사이트의 디자인 시스템을 동시에 보관한다. 충돌을 막기 위해 **사이트 1개 = 폴더 1개** 규칙을 따른다. 모든 에이전트·매뉴얼은 이 규칙의 경로를 사용한다.

**슬러그 결정** (대상 URL → 폴더명): 호스트 주 라벨을 기본으로 한다(`example.com`→`example`, `shop.brand.com`→`brand`). 국가·언어·섹션 구분이 필요하면 의미 있는 경로/서브도메인을 하이픈으로 덧붙인다(`example.com/kr`→`example-kr`, `developer.example.com`→`example-developer`). 일반 경로(`web`, `home`, `main`, `index`, `ko`)는 생략한다. kebab-case·영숫자/하이픈만. 충돌하면 사용자에게 확인한다. 흐름 A 입력확정(1단계)에서 슬러그를 정해 `artifacts/sites/{slug}/input.md`에 기록한다.

**표준 폴더 구조** (`{slug}` = 결정된 슬러그):
```
artifacts/sites/{slug}/
  input.md                       # 흐름 A 입력(대상 URL·아키타입·캡처 방식)
  analysis/tokens.md             # design-analyzer: 토큰·컴포넌트 인벤토리
  examples/{archetype}/          # layout.md · reference-*.png · example.html
  DESIGN.md                      # designmd-author: 이 사이트의 design.md
  design-system.html             # page-builder: 단일 HTML 쇼케이스
  reviews/*.md                   # design-system-reviewer: 모드 A/B 검수
  pages/{name}/                  # 흐름 B: 이 시스템으로 만든 서비스 산출물
```

흐름 B는 `artifacts/sites/{slug}/DESIGN.md` + `.../examples/`를 기준으로 읽고, 생성물을 `.../pages/{name}/`(+ build-spec)에 둔다. `artifacts/README.md`의 **사이트 레지스트리** 표에 각 슬러그·출처 URL·기여 페이지·상태를 등록한다.

**1 호스트 = 1 누적 디자인 시스템 (N 페이지 기여).** 같은 호스트의 다른 페이지 URL이 들어오면 새 슬러그를 만들지 않고 **기존 `sites/{slug}/`에 통합**한다. 한 페이지는 사이트 디자인 시스템의 단면만 보여주므로(홈엔 form·table·dialog가 거의 없음), 여러 아키타입을 누적 샘플링해야 표준 컴포넌트 체크리스트가 채워진다. → "흐름 A 확장/통합" 모드 참조.

- **발산 가드**: 같은 호스트라도 새 페이지의 팔레트·타입이 기존과 크게 갈리면(서브브랜드·콘솔·다른 테마) 자동 병합하지 않는다. 발산을 감지하면 **사용자에게 "통합 vs 새 슬러그 분리(예: `example-developer`)"를 묻는다.**

## 0단계 — 실행 모드 판별

먼저 `artifacts/` 존재 여부와 요청 키워드로 분기한다.

| 신호 | 모드 | 처리 |
|---|---|---|
| URL 제공 + 해당 호스트 `sites/{slug}` **없음** | 흐름 A (초기) | 아래 A 파이프라인 |
| URL 제공 + 해당 호스트 `sites/{slug}` **이미 존재**(다른 페이지) | **흐름 A 확장/통합** | 아래 "확장/통합" 파이프라인 |
| "이 페이지도 분석해서 통합/추가/보완", "다른 페이지도 반영" | 흐름 A 확장/통합 | 동일 |
| `DESIGN.md` 존재 + "이걸로 페이지 만들어" + 내용 | 흐름 B (초기) | 아래 B 파이프라인 |
| "다시/재실행/{부분}만 다시" | 부분 재실행 | 해당 산출물만 다시 + 뒷산출물 `stale` 표시 |
| URL만 주고 페이지 요청 모호 | 확인 필요 | A인지 B인지 사용자에게 되물음 |

URL이 들어오면 **먼저 호스트로 슬러그를 도출해 `artifacts/sites/{slug}/` 존재 여부를 확인**한다. 있으면 초기 구축이 아니라 확장/통합이다. `DESIGN.md`가 없는데 흐름 B를 요청하면, 먼저 흐름 A가 필요함을 알린다.

## 흐름 A — 웹주소 → sites/{slug}/ (DESIGN.md + examples/ + design-system.html)

> 모든 경로는 **사이트 네임스페이스 규칙**을 따른다. 1단계에서 슬러그를 정하고 이후 `artifacts/sites/{slug}/` 아래에 산출한다.

1. **입력 확정 + 슬러그 결정**: 대상 URL에서 슬러그를 정하고(규칙 참조), 대상 URL과 분석할 대표 페이지(아키타입: home/pricing/feature/dashboard 등)를 `artifacts/sites/{slug}/input.md`에 적는다. 캡처 방식은 Playwright 자동 캡처(기본), 불가 시 스크린샷 업로드 폴백.
2. **분석**: `design-analyzer` 호출 → `design-extraction` 매뉴얼대로 캡처·계측. 산출:
   - `artifacts/sites/{slug}/analysis/tokens.md` (색·타이포·간격·반경·그림자·컴포넌트 인벤토리)
   - `artifacts/sites/{slug}/examples/{archetype}/layout.md` + `reference-*.png` (대표 페이지마다)
3. **집필**: `designmd-author` 호출 → `designmd-spec` 규격대로 `artifacts/sites/{slug}/DESIGN.md`(드래프트) 작성(프론트매터 토큰 + 본문 12섹션).
4. **골든 예제(라운드트립 준비)**: `page-builder`를 "골든 예제 모드"로 호출 → 1~2개 아키타입을 DESIGN.md만으로 재구성해 `artifacts/sites/{slug}/examples/{archetype}/example.html` 생성.
5. **검수(모드 A)**: `design-system-reviewer` 호출 → `design-fidelity-check` 모드 A로 broken-ref·contrast·orphaned-token·완성도 + **라운드트립 대조**(example.html ↔ reference.png) 판정. `artifacts/sites/{slug}/reviews/designmd-review.md`.
6. **루프**: 미통과 → author/builder 재작업. **상한 3회**. 3회 후에도 미통과면 best 산출물 유지하고 **사람 승인 에스컬레이션**.
7. **디자인시스템 단일 HTML 생성 (헤드라인 산출물)**: 검수 통과 후 `page-builder`를 "디자인시스템 쇼케이스 모드"로 호출 → 토큰 + examples를 합쳐 `artifacts/sites/{slug}/design-system.html`(스타일가이드 쇼케이스: 색·타입·간격/반경·컴포넌트 갤러리 + 대표 합성 섹션) 생성. `design-system-reviewer`가 쇼케이스 완성도(모든 토큰·컴포넌트 전시) + off-system 0건을 점검(모드 A 쇼케이스 체크).
8. **사람 승인 게이트**: 통과하면 멈추고, `artifacts/sites/{slug}/`를 확정 상태로 둘지(또는 루트/사용자 지정 경로로 승격할지) 사용자에게 명시적으로 묻는다. 승인 전에는 상태를 `사람 승인 필요`로 둔다.
9. **확정**: 승인에 따라 상태를 `사용 가능`으로 바꾸고, `artifacts/README.md`의 사이트 레지스트리·상태를 갱신한다.

## 흐름 A 확장/통합 — 같은 사이트에 페이지 추가 (증분 병합)

기존 `sites/{slug}/`가 있는 호스트의 새 페이지 URL을 받으면, 처음부터 다시 만들지 않고 **델타만 분석해 누적 시스템에 병합**한다. 원칙: **추가는 자동, 충돌만 사람 승인, 검증된 시스템은 silent overwrite 금지.**

1. **입력 확정**: 새 페이지 URL·아키타입을 `sites/{slug}/input.md`에 추가 기록. (가이드 크롤: `analysis/tokens.md`의 표준 컴포넌트 체크리스트에서 **아직 미관측인 것**[예: table·dialog·toast]이 있을 법한 페이지를 우선 제안.)
2. **델타 분석**: `design-analyzer` 호출 → 새 페이지만 계측. 기존 `analysis/tokens.md`와 대조해 **(a) 신규 토큰/컴포넌트, (b) 기존과 일치(교차 출현 → provenance에 페이지 추가), (c) 충돌(같은 역할 다른 값)** 으로 분류. 새 아키타입 `examples/{archetype}/` 생성.
3. **발산 판정**: 새 페이지 팔레트·타입이 기존과 크게 갈리면 **멈추고 사용자에게 통합 vs 새 슬러그 분리를 묻는다**(서브브랜드 가드).
4. **병합**: `designmd-author` 호출 → DESIGN.md **증분 갱신**.
   - 신규 토큰/컴포넌트 → 추가. Source pages·토큰 provenance(`seen on: home, …`) 갱신. (자동)
   - 충돌 → **덮어쓰지 않고** `reviews/merge-conflicts.md`에 기록(기존값·신규값·페이지). 교차 출현 빈도가 높은 쪽을 canonical 후보로 표기.
5. **재검수(모드 A)**: `design-system-reviewer` → broken-ref·대비·완성도 + **새 아키타입 라운드트립** + **충돌 리포트 검토**. 표준 컴포넌트 커버리지 갱신.
6. **하위 산출물 stale**: DESIGN.md가 바뀌었으므로 `design-system.html`·기존 골든 example을 `stale` 표시 후 **쇼케이스 재생성**(흐름 A 7단계 재실행).
7. **사람 승인 게이트(조건부)**: **충돌·발산이 있을 때만** 멈추고 사용자에게 reconcile(어느 값을 canonical로, 변형으로 둘지)·통합 여부를 묻는다. **순수 추가만이면 게이트 없이 통과 가능**(상태 갱신).
8. **수렴 체크**: 최근 페이지에서 신규 토큰/컴포넌트가 거의 안 나오면 "충분히 포착됨"으로 보고 추가 분석을 멈추도록 제안한다. README 레지스트리의 기여 페이지 목록 갱신.

## 흐름 B — sites/{slug}/DESIGN.md + examples/ → 서비스

1. **입력 확정**: 어떤 사이트(slug)의 시스템으로 만들지 정하고, 만들 페이지/서비스의 목적·내용·아키타입을 `artifacts/sites/{slug}/pages/{name}/request.md`에 적는다. `artifacts/sites/{slug}/DESIGN.md` 존재 확인(없으면 흐름 A 안내).
2. **생성**: `page-builder` 호출 → `page-generation` 매뉴얼대로. **토큰은 `artifacts/sites/{slug}/DESIGN.md`, 합성은 `.../examples/{archetype}/layout.md` 우선 참조.** 산출:
   - `artifacts/sites/{slug}/pages/{name}/build-spec.md` (섹션 계획)
   - `artifacts/sites/{slug}/pages/{name}/` 아래 결과물(standalone HTML 또는 Next.js/React 프로젝트, DESIGN.md 토큰 주입)
3. **검수(모드 B)**: `design-system-reviewer` 호출 → 토큰 준수(off-system 색/폰트 차단)·접근성(대비)·반응형(모바일)·AI 티를 `DESIGN.md` + 해당 `layout.md` 기준으로 검증. `artifacts/sites/{slug}/reviews/{name}-fidelity.md`.
4. **루프**: 미통과 → builder 재작업. 상한 3회 → 사람 승인 에스컬레이션.
5. **라벨**: 결과물은 `사용 가능` / `미검증 영역`을 분리 표기. 외부 발송·배포는 범위 밖(요청 시 별도 승인).

## 부분 재실행

`artifacts/`가 이미 있으면 요청을 가장 작은 단위로 좁혀 다시 실행한다.

- "컴포넌트만 다시" → analyzer의 인벤토리 컴포넌트 절만 재생성 → author 반영 → reviewer.
- "이 페이지 모바일만 다시" → builder 반응형 부분만 재생성 → reviewer 모드 B.
- "레이아웃만 다시" → 해당 `examples/{archetype}/layout.md` 재추출.

앞 단계를 바꾸면 뒤 산출물은 `artifacts/README.md`에서 `stale`로 표시하고, 다시 만들기 전까지 `사용 가능`으로 올리지 않는다.

## 사람 승인 게이트 (능동)

- 루트 `DESIGN.md`·`examples/` 생성/덮어쓰기 직전: **멈추고** 무엇을·왜 확정하는지와 기존 파일을 덮어쓰는지 명시한 뒤, 사용자의 명시적 승인을 받고 진행한다. 라벨만 붙이고 통과시키지 않는다.
- 외부 발송/배포/결제는 이 하네스 범위 밖. 연결되면 완료처럼 표현하지 않는다.

## 실행 형태

검수-수정 루프가 있는 **서브에이전트 순차 파이프라인 + 파일 핸드오프**를 기본으로 한다. 대화 메시지는 조율용, 다음 단계가 읽어야 할 내용은 반드시 `artifacts/` 파일로 남긴다. 여러 페이지를 병렬 생성해야 하면 Agent Team(`TeamCreate`/`TaskCreate`/`SendMessage`/`TeamDelete`)으로 확장한다.

## 테스트 프롬프트 (자가 점검)

1. 정상 A: "https://example.com 디자인 분석해서 DESIGN.md 만들어줘"
2. 정상 B: "이 DESIGN.md로 가격 페이지 만들어줘. 내용은 …"
3. 애매: "이 사이트 느낌으로 만들어줘" → A/B 되물음
4. 실패 유발: DESIGN.md에 없는 색/폰트 요구 → reviewer가 off-system 차단
5. 부분 재실행: "컴포넌트 섹션만 다시" / "그 페이지 모바일만 다시"
6. 라운드트립: 흐름 A 직후 골든 예제가 원본 스크린샷과 섹션 순서·색블록·그리드 일치하는지 판정

## 산출물 지도

`artifacts/README.md`가 각 산출물의 역할·작성자·다음 독자·상태를 관리한다. 모든 단계는 그 표를 갱신한다.
