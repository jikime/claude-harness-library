"use client";

import { Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Pkg = {
  name: string;
  caption: string;
  price: string;
  unit: string;
  items: string[];
};

const PACKAGES: Record<string, Pkg> = {
  oneroom: {
    name: "원룸 기본세트",
    caption: "짐이 단출한 원룸·자취 이사에",
    price: "19,000",
    unit: "세트 / 3일 기준",
    items: [
      "포장박스 15개",
      "에어캡 롤 1개",
      "핸드카트 1대",
      "이사 공구세트 1개",
    ],
  },
  tworoom: {
    name: "투룸 표준세트",
    caption: "가구가 늘어난 투룸 이사에 알맞은 구성",
    price: "34,000",
    unit: "세트 / 3일 기준",
    items: [
      "포장박스 30개",
      "에어캡 롤 2개",
      "핸드카트 1대",
      "행거박스 2개",
      "이사 공구세트 1개",
    ],
  },
  threeroom: {
    name: "쓰리룸+ 패밀리세트",
    caption: "짐이 많은 가족 단위 이사에",
    price: "52,000",
    unit: "세트 / 3일 기준",
    items: [
      "포장박스 50개",
      "에어캡 롤 3개",
      "핸드카트 2대",
      "행거박스 4개",
      "이사 사다리 1대",
      "이사 공구세트 1개",
    ],
  },
};

const TABS = [
  { value: "oneroom", label: "원룸" },
  { value: "tworoom", label: "투룸" },
  { value: "threeroom", label: "쓰리룸+" },
];

function PackageCard({
  pkg,
  selected,
}: {
  pkg: Pkg;
  selected: boolean;
}) {
  return (
    <div
      className={
        selected
          ? "relative flex flex-col rounded-2xl border-2 border-coral-strong bg-coral-tint p-7 lg:p-8"
          : "relative flex flex-col rounded-2xl border border-hairline bg-canvas p-7 lg:p-8"
      }
    >
      {selected && (
        <span className="absolute right-6 top-6 rounded-pill bg-coral-strong px-3 py-1 text-caption font-semibold text-on-primary">
          선택한 규모
        </span>
      )}

      <h3 className="text-title font-semibold text-ink">{pkg.name}</h3>
      <p className="mt-2 text-body-sm leading-[1.5] text-ink-soft">
        {pkg.caption}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="text-[34px] font-bold tracking-[-0.8px] text-coral">
          {pkg.price}
        </span>
        <span className="text-title font-bold text-ink">원</span>
      </div>
      <p className="mt-1 text-caption-xs text-ink-muted">{pkg.unit}</p>

      <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-hairline pt-7">
        {pkg.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-coral-strong text-on-primary">
              <Check className="size-3" aria-hidden />
            </span>
            <span className="text-body text-ink-soft">{item}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        className="mt-8 h-12 w-full rounded-lg bg-coral-strong text-body-lg font-semibold text-on-primary hover:bg-coral-soft"
      >
        <a href="#final-cta">
          이 세트로 신청
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </Button>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-canvas py-20 lg:py-[96px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-caption font-semibold tracking-wide text-ink-muted">
            요금 안내
          </p>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.4] tracking-[-0.4px] text-ink lg:text-headline">
            이사 규모에 맞춘 렌탈 세트
          </h2>
          <p className="mt-4 text-body leading-[1.6] text-ink-soft">
            품목을 하나씩 고르기 번거롭다면 규모별 세트로 한 번에 준비하세요.
            가격은 예시이며, 품목을 더하거나 빼서 조정할 수 있습니다.
          </p>
        </div>

        <Tabs defaultValue="tworoom" className="mt-10 gap-8">
          <TabsList className="h-auto w-fit gap-1 rounded-pill bg-surface-soft p-1.5">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-10 rounded-pill px-6 text-body font-semibold text-ink-soft data-active:bg-surface-dark data-active:text-on-dark data-active:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {/* 선택한 규모를 강조하고 나머지는 비교용으로 노출 */}
                <PackageCard
                  pkg={PACKAGES.oneroom}
                  selected={tab.value === "oneroom"}
                />
                <PackageCard
                  pkg={PACKAGES.tworoom}
                  selected={tab.value === "tworoom"}
                />
                <PackageCard
                  pkg={PACKAGES.threeroom}
                  selected={tab.value === "threeroom"}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
