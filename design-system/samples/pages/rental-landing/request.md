# 흐름 B 요청 — rental-landing (이사용품·장비 렌탈 랜딩)

- **사이트 시스템**: `movingbox` (DESIGN.md + examples/home/)
- **서비스**: 이사용품·장비 렌탈 서비스
- **렌탈 대상**: 포장박스·완충재(뽁뽁이)·핸드카트·단평(이불솜)·이사용 사다리·행거박스·공구 등 이사 준비물 대여
- **범위**: 랜딩 1페이지 (집중) — 단일 라우트 `/`
- **스택**: Next.js 최신(App Router) + shadcn/ui 최신 + Tailwind, Pretendard Variable
- **이미지**: codex-image 스킬로 생성(히어로·품목·섹션), 브랜드 코랄 톤에 맞춤
- **아키타입 기준**: home (examples/home/layout.md 섹션 리듬 차용)

## 랜딩 섹션 계획(초안 — build-spec에서 확정)
1. fixed nav (로고 + 메뉴 + 전화 + 코랄 CTA + 언어)
2. hero (이사 박스 더미 사진 + scrim, display 헤드라인 + 코랄 CTA "렌탈 견적 신청")
3. 인기 렌탈 품목 그리드 (카드: 품목 이미지·이름·일 대여료·담기)
4. 이용 방법 3스텝 (신청→배송→반납)
5. 가격/패키지 (이사 규모별 렌탈 세트 — pill 카테고리 + 가격표)
6. 신뢰 지표 / 후기 (코랄 강조 숫자 + flat 보더 카드)
7. 환경/절약 가치 섹션 (다크 패널 + 코랄 강조어)
8. final CTA (다크 사진 + scrim + 코랄 버튼)
9. footer (다크, 3컬럼)
10. floating quick-CTA (우측, 카카오/전화)

## 산출물 위치
- 빌드 스펙: `pages/rental-landing/build-spec.md`
- 실행 프로젝트: `pages/rental-landing/` (Next.js 프로젝트 루트)
- 검수: `reviews/rental-landing-fidelity.md`

## 상태: 진행 중
