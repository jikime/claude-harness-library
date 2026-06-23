# 흐름 A 입력 — movingbox

- **슬러그**: `movingbox`
- **대상 호스트**: movingbox.example
- **대표 페이지(아키타입)**:
  - home — `https://movingbox.example/ko` (랜딩)
- **캡처 방식**: Playwright 자동 캡처(CLI 설치 확인됨), 폴백 스크린샷
- **기술 스택 관찰**: Next.js (App Router, `_next/static`), Pretendard Variable 폰트, ko/en 다국어(NEXT_LOCALE)
- **상태**: 분석 진행 중

## 메모
- `/` → 307 → `/ko` 리다이렉트. 분석 기준 URL은 `/ko`.
- 추가 아키타입(pricing/feature/dashboard 등)은 홈 분석 후 누적 통합 모드로 확장 가능.
