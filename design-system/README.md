# artifacts — 산출물 지도

각 산출물의 역할·작성자·다음 독자·상태를 관리한다. 모든 단계가 이 표를 갱신한다.
앞 단계가 바뀌면 뒤 산출물은 `stale`로 표시하고, 다시 만들기 전까지 `사용 가능`으로 올리지 않는다.

## 상태 범례
`대기` · `진행중` · `완료` · `stale`(앞단계 변경) · `needs-review` · `사용 가능` · `사람 승인 필요` · `미검증`

## 사이트 레지스트리 (다중 사이트)

**규칙**: 사이트(호스트) 1개 = 폴더 1개 = **누적 디자인 시스템**. 새 사이트는 `artifacts/sites/{slug}/` 아래에 input·analysis·examples·DESIGN.md·design-system.html·reviews·pages를 모두 둔다(슬러그 규칙·구조·통합은 `design-system-orchestrator` SKILL 참조). **같은 호스트의 다른 페이지 URL이 오면 새 슬러그를 만들지 않고 기존 폴더에 통합**한다(추가는 자동·충돌만 사람 승인·발산이면 분리 확인). 한 페이지로는 시스템 전체를 못 보므로 여러 아키타입을 누적해 표준 컴포넌트를 채운다.

| slug | 출처 호스트 | 기여 페이지 | 위치 | 상태 |
|---|---|---|---|---|
| `apple-kr` | apple.com/kr | home, product | (레거시 평면) `DESIGN.apple-kr.md`·`examples/{home,product}`·`design-system.html` | 사용 가능 |
| `ilogen` | ilogen.com | home, sub(요금), tracking, auth, support, booking (6) | (레거시 평면) `DESIGN.ilogen.md`(색22·타입21·컴포넌트40)·`examples/ilogen/*`·`design-system.ilogen.html` | 사용 가능 |
| `moveuniversity` | moveuniversity.kr | home, sub(FAQ) | **`sites/moveuniversity/`** (표준 구조 첫 적용) — DESIGN.md(색21·타입14·컴포넌트23 + 동적토큰 6그룹)·examples·design-system.html | 사용 가능(모드 A 합격) |
| _(신규)_ | — | (누적) | `sites/{slug}/...` (표준 구조) | — |

> `apple-kr`·`ilogen`은 규칙 도입 전 산출물이라 평면 경로를 유지한다(사용자 결정: 앞으로만 적용). **다음 새 사이트부터** `sites/{slug}/` 표준 + 다중 페이지 누적을 따른다.

## 흐름 A — DESIGN.md 구축 (레거시 apple-kr 기록)

| 산출물 | 역할 | 작성자 | 다음 독자 | 상태 |
|---|---|---|---|---|
| `inputs/target-url.md` | 대상 URL·아키타입·캡처 방식 | 사용자/Orchestrator | design-analyzer | 완료 |
| `analysis/apple-kr-tokens.md` | 토큰·컴포넌트 인벤토리 | design-analyzer | designmd-author | 완료 |
| `examples/{home,product}/layout.md` | 레이아웃 맵(섹션·그리드·리듬) | design-analyzer | page-builder, reviewer | 완료 |
| `examples/{home,product}/reference-*.png` | 원본 캡처 스크린샷(desktop/tablet/mobile) | design-analyzer | reviewer(라운드트립) | 완료 |
| `DESIGN.draft.md` | DESIGN.md 초안 | designmd-author | reviewer, page-builder | 완료(모드 A 합격) |
| `DESIGN.apple-kr.md` | ★흐름 A 최종(승인됨, artifacts 유지) | Orchestrator | 흐름 B | 사용 가능 |
| `examples/{home,product}/example.html` | 골든 재구성본(라운드트립 검증용) | page-builder | reviewer(라운드트립) | 완료 |
| `design-system.html` | ★디자인시스템 단일 HTML 스타일가이드 쇼케이스 | page-builder(쇼케이스 모드) | 사용자 | 사용 가능(off-system 0·전 토큰 전시 검증) |
| `design-system-build-spec.md` | 쇼케이스 전시 항목 체크리스트 | page-builder | reviewer | 완료 |
| `reviews/designmd-review.md` | 모드 A 검수 리포트 | design-system-reviewer | Orchestrator | 완료(조건부→충족, 합격) |
| 루트 `DESIGN.md` + `examples/` | (승격 보류 — 사용자 선택) | — | — | 미승격(루트=Figma 샘플 유지) |

> 2026-06-22 흐름 A 완료. 사용자 승인으로 **루트 미승격**: apple-kr DESIGN.md는 `artifacts/DESIGN.apple-kr.md`, examples는 `artifacts/examples/`에 유지. 흐름 B는 이 경로를 기준으로 동작한다.

## 흐름 A — ilogen (2차 실행, 네임스페이스 분리)

대상: https://www.ilogen.com/web (로젠택배). apple-kr와 충돌 없이 `ilogen` 네임스페이스로 분리 저장.

| 산출물 | 역할 | 상태 |
|---|---|---|
| `analysis/ilogen-tokens.md` | 토큰·컴포넌트 인벤토리(실측) | 완료 |
| `examples/ilogen/{home,sub}/layout.md` + `reference-*.png` | 레이아웃 맵·캡처 | 완료 |
| `DESIGN.ilogen.md` | ★design.md(색18·타이포16·컴포넌트23, 고정폭 1204px·듀얼톤) | 사용 가능(모드 A 합격) |
| `examples/ilogen/{home,sub}/example.html` | 골든 재구성본(고정폭) | 완료 |
| `design-system.ilogen.html` | ★디자인시스템 단일 HTML 쇼케이스 | 사용 가능(off-system 0·대비⚠ 표기) |
| `reviews/ilogen-designmd-review.md` | 모드 A 검수(라운드트립 데스크톱 高일치) | 완료(조건부→충족, 합격) |
| 루트 승격 | 사용자 선택: artifacts 네임스페이스 유지 | 미승격(루트 불변) |

> 특이점: ilogen은 **비반응형 고정폭(1204px)** 코퍼레이트 사이트. 검수가 **브랜드 오렌지 위 흰 텍스트 2.02:1(AA 미달)**을 적발 → 토큰 유지 + Known Gaps/Don't 문서 정정으로 정직히 기록. 모바일 라운드트립은 비수행(원본 비반응형).
> 확장/통합(2차): tracking·auth·support·booking 4페이지 병합 → 컴포넌트 23→40(폼·tabs·pagination 등). DESIGN.ilogen.md = 색22·타입21·컴포넌트40.

## 흐름 B — 페이지·서비스 생성

| 산출물 | 역할 | 기준 시스템 | 상태 |
|---|---|---|---|
| `moving-rental/` | 이삿짐 대여(랜딩+카탈로그, Next.js 15+shadcn, picsum) | apple-kr | 사용 가능(모드 B 합격) |
| `moving-rental-ilogen/` | 이삿짐 대여(랜딩+신청폼, **Next.js 16+shadcn**, codex 실제 이미지 8장) | ilogen | 사용 가능(모드 B 합격) |
| `modu-moving/` | **모두의 이사** 이삿짐 렌탈(홈+계산기·카탈로그·신청폼 3화면, Next.js 16+shadcn, codex 이미지 8장) | moveuniversity | 사용 가능(모드 B 합격) |
| `artifacts/pages/moving-rental-ilogen-build-spec.md` | 빌드 스펙 | — | 완료 |
| `artifacts/reviews/moving-rental-ilogen-fidelity.md` | 모드 B 검수 | — | 완료(조건부→충족, 합격) |

> moving-rental-ilogen: off-system 0·반응형·합성·폼 검증 통과, `npm run build`(Next 16.2.9) 통과. 이미지는 codex-image 8장(1장 오생성→재생성 교체). 백엔드(결제·예약)·배포는 범위 밖.

## 흐름 B — 페이지 생성

| 산출물 | 역할 | 작성자 | 다음 독자 | 상태 |
|---|---|---|---|---|
| `inputs/page-request.md` | moving-rental 요구사항 | 사용자/Orchestrator | page-builder | 완료 |
| `pages/moving-rental-build-spec.md` | 섹션 계획·토큰 매핑 | page-builder | reviewer | 완료 |
| 루트 `moving-rental/` | ★생성 웹서비스(Next.js+shadcn, `/`·`/rental`) | page-builder | reviewer, 사용자 | 사용 가능(build 통과, 모드 B 합격) |
| `reviews/moving-rental-fidelity.md` (+ `-fixes.md`) | 모드 B 검수 + 수정 기록 | design-system-reviewer / page-builder | Orchestrator | 완료(조건부→충족, 합격) |

> 2026-06-22 흐름 B 완료. apple-kr 디자인 시스템으로 이삿짐 대여 웹서비스(랜딩+카탈로그) 생성. off-system 0건, 반응형·합성·대비 통과, `npm run build` 통과. 백엔드(결제·예약)·배포는 범위 밖 — `미검증 영역`.

## 개선 기록
- `improvement-log.md` — 실행·실패·피드백 기반 하네스 수정 근거.
