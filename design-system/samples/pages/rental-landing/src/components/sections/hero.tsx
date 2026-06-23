import Image from "next/image";
import { ArrowRight, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* 배경 사진 */}
      <Image
        src="/images/hero-boxes.png"
        alt="이사 준비를 마친 포장 박스와 렌탈 장비가 쌓여 있는 현장"
        width={1600}
        height={1000}
        priority
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      {/* scrim — opacity.scrim 0.75 */}
      <div
        className="absolute inset-0 -z-10 bg-[#000000]/75"
        aria-hidden
      />

      <div className="mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col justify-center px-6 pt-[120px] pb-20 lg:px-10 lg:pt-[160px] lg:pb-28">
        <div className="max-w-2xl text-center sm:text-left">
          {/* 배지 */}
          <span className="inline-flex items-center gap-2 rounded-pill bg-coral-strong px-4 py-2 text-caption font-semibold text-on-primary">
            <PackageCheck className="size-4" aria-hidden />
            누적 대여 12,000건+ 이사 준비물 렌탈
          </span>

          {/* 헤드라인 */}
          <h1 className="mt-6 text-[34px] font-bold leading-[1.25] tracking-[-0.8px] text-on-dark sm:text-[44px] lg:text-[52px]">
            이사 준비물,
            <br />
            필요한 만큼만 빌려 쓰세요
          </h1>

          {/* 보조문 */}
          <p className="mx-auto mt-5 max-w-xl text-subhead font-normal leading-[1.6] text-on-dark/80 sm:mx-0">
            포장박스부터 핸드카트·이사 사다리까지. 신청 한 번이면 문 앞으로
            배송되고, 이사가 끝나면 그대로 반납하면 됩니다.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-14 rounded-xl bg-coral-strong px-7 text-body-lg font-semibold text-on-primary hover:bg-coral-soft"
            >
              <a href="#final-cta">
                렌탈 견적 신청
                <ArrowRight className="size-5" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-14 rounded-xl border-on-dark/40 bg-canvas/5 px-7 text-body-lg font-semibold text-on-dark backdrop-blur-sm hover:bg-canvas/15 hover:text-on-dark"
            >
              <a href="#items">렌탈 품목 둘러보기</a>
            </Button>
          </div>

          {/* 보조 메타 */}
          <p className="mt-6 text-body-sm text-on-dark/70">
            당일 신청 가능 · 수도권 무료 배송 · 사용 후 방문 수거
          </p>
        </div>
      </div>
    </section>
  );
}
