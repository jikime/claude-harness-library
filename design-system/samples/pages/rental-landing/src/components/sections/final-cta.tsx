import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden">
      <Image
        src="/images/cta-movingday.png"
        alt="이사 당일 짐을 옮기는 모습"
        width={1600}
        height={900}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[#000000]/75" aria-hidden />

      <div className="mx-auto max-w-[1280px] px-6 py-24 text-center lg:px-10 lg:py-32">
        <h2 className="mx-auto max-w-3xl text-[30px] font-bold leading-[1.3] tracking-[-0.6px] text-on-dark sm:text-display lg:text-[44px]">
          이사 준비물, 이제 사지 말고 빌리세요
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-subhead leading-[1.6] text-on-dark/80">
          신청은 1분, 배송과 수거까지 한 번에. 오늘 신청하면 원하는 날짜에 문
          앞에서 받아보실 수 있습니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-14 rounded-2xl bg-coral-strong px-8 text-body-lg font-semibold text-on-primary hover:bg-coral-soft"
          >
            <a href="tel:1551-2425">
              렌탈 견적 신청
              <ArrowRight className="size-5" aria-hidden />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-14 rounded-2xl border-on-dark/40 bg-canvas/5 px-8 text-body-lg font-semibold text-on-dark backdrop-blur-sm hover:bg-canvas/15 hover:text-on-dark"
          >
            <a href="tel:1551-2425">
              <Phone className="size-5" aria-hidden />
              1551-2425
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
