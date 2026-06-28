# design-system

실제 웹사이트를 계측해 디자인 토큰·`DESIGN.md`를 추출하고, 그 디자인 시스템 그대로 프리미엄 웹/앱 페이지를 생성하거나 기존 프로젝트에 적용하는 하네스입니다.

## 세 흐름

- **흐름 A · 디자인 시스템 구축** — 웹 주소를 주면 계측해 `DESIGN.md` + `examples/` + `design-system.html`을 만든다. **캡처 방식은 승인 게이트**: Playwright 자동 캡처는 시간·토큰 비용이 커서 기본 실행하지 않고, (a) Playwright / (b) 스크린샷 업로드(권장 기본) / (c) WebFetch 정적 중 사용자가 승인한 방식만 쓴다.
- **흐름 B · 신규 서비스 생성** — 시작 시 `artifacts/sites/*`의 디자인 시스템 목록을 제시해 "어떤 걸 적용할까요?"를 묻는다. 토큰은 `DESIGN.md`, 레이아웃은 `examples/{archetype}/layout.md`를 **반드시 참조**해 새 페이지를 만든다. 출력은 **standalone HTML이 기본**이고, 입력이 아이디어/PRD 수준이면 **Next.js 웹서비스로 만들지 제안**한다(선택).
- **흐름 C · 기존 프로젝트 적용(retrofit)** — 이미 만들어진 UI/코드베이스에 디자인 시스템을 입힌다. 새 파일로 대체하지 않고 **프로젝트 상태 점검 → 토큰 크로스워크 → diff 교정**(내용·동작 보존, 파일 변경 전 승인). 신규 생성(B)과 기존 적용(C)을 구분해 처리한다.

## 결과물 확인하기

- **데모 사이트** — [https://rental-landing-ashy.vercel.app](https://rental-landing-ashy.vercel.app) 에서 `DESIGN.md`에 정의한 디자인 시스템을 그대로 적용해 만든 샘플 사이트를 바로 확인할 수 있습니다.

- **디자인 시스템** — [https://rental-landing-ashy.vercel.app/design-system.html](https://rental-landing-ashy.vercel.app/design-system.html) 에서 추출된 색상·타이포그래피·간격·컴포넌트를 한눈에 볼 수 있습니다.

- **샘플 소스 코드** — [https://github.com/jikime/rental-landing](https://github.com/jikime/rental-landing) 에서 샘플 사이트의 전체 소스를 확인할 수 있습니다.
