import { MessageCircle, Phone } from "lucide-react";

export function QuickCta() {
  return (
    <>
      {/* 데스크톱: 우측 떠있는 패널 (zIndex.floating-b = 99) */}
      <div className="fixed bottom-8 right-6 z-[99] hidden flex-col gap-3 lg:flex">
        <a
          href="#"
          className="flex w-[168px] items-center gap-2.5 rounded-lg bg-kakao px-4 py-3 text-body-sm font-semibold text-kakao-ink transition-transform duration-[150ms] hover:-translate-y-0.5 [transition-timing-function:var(--ease-standard)]"
        >
          <MessageCircle className="size-5" aria-hidden />
          카카오 상담
        </a>
        <a
          href="tel:1551-2425"
          className="flex w-[168px] items-center gap-2.5 rounded-lg bg-coral-strong px-4 py-3 text-body-sm font-semibold text-on-primary transition-transform duration-[150ms] hover:-translate-y-0.5 [transition-timing-function:var(--ease-standard)]"
        >
          <Phone className="size-5" aria-hidden />
          전화 상담
        </a>
      </div>

      {/* 모바일: 하단 고정바 */}
      <div className="fixed inset-x-0 bottom-0 z-[99] flex border-t border-on-dark/10 lg:hidden">
        <a
          href="#"
          className="flex flex-1 items-center justify-center gap-2 bg-kakao py-4 text-body font-semibold text-kakao-ink"
        >
          <MessageCircle className="size-5" aria-hidden />
          카카오 상담
        </a>
        <a
          href="tel:1551-2425"
          className="flex flex-1 items-center justify-center gap-2 bg-coral-strong py-4 text-body font-semibold text-on-primary"
        >
          <Phone className="size-5" aria-hidden />
          전화 신청
        </a>
      </div>
    </>
  );
}
