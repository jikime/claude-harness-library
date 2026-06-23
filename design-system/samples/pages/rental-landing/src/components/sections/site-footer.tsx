const COLUMNS = [
  {
    title: "서비스",
    links: ["렌탈 품목", "이용 방법", "요금 안내", "이용 후기"],
  },
  {
    title: "고객지원",
    links: ["자주 묻는 질문", "배송·수거 안내", "파손·분실 정책", "1:1 문의"],
  },
  {
    title: "회사",
    links: ["회사 소개", "이용약관", "개인정보처리방침", "제휴 문의"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-dark">
      {/* 약관 스트립 */}
      <div className="border-b border-on-dark/10 bg-surface-dark-alt">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-4 text-caption-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>
            대여 가격은 모두 예시이며 실제 요금은 이용 기간·지역에 따라 안내됩니다.
          </p>
          <p>고객센터 1600-0000 · 평일 09:00–18:00</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-coral-strong text-on-primary">
                <span className="text-[18px] font-extrabold leading-none">
                  이
                </span>
              </span>
              <span className="text-body-lg font-bold text-on-dark">
                무빙박스 렌탈
              </span>
            </div>
            <p className="mt-4 max-w-xs text-body-sm leading-[1.6] text-ink-faint">
              필요한 만큼만 빌리는 이사 준비물 렌탈. 신청부터 수거까지 한 번에
              해결하세요.
            </p>
          </div>

          {/* 링크 컬럼 */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-caption font-semibold text-on-dark">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body-sm text-ink-faint transition-colors duration-[150ms] hover:text-on-dark [transition-timing-function:var(--ease-standard)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-on-dark/10 pt-8">
          <p className="text-caption-xs leading-[1.7] text-ink-faint">
            무빙박스 렌탈 · 서울특별시 어딘가로 00, 0층 · 사업자등록번호
            000-00-00000
            <br />
            본 페이지는 디자인 시스템 적용 예시로 제작되었으며, 표기된 수치·후기는
            샘플입니다.
          </p>
          <p className="mt-4 text-caption-xs text-ink-faint">
            © 2026 무빙박스 렌탈. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
