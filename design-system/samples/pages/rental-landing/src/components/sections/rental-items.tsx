import Image from "next/image";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type Item = {
  image: string;
  name: string;
  desc: string;
  price: string;
  alt: string;
};

const ITEMS: Item[] = [
  {
    image: "/images/item-box.png",
    name: "포장박스",
    desc: "튼튼한 더블월 박스. 짐 정리에 가장 많이 찾는 기본 품목",
    price: "500",
    alt: "이사용 포장박스",
  },
  {
    image: "/images/item-bubble.png",
    name: "에어캡 롤",
    desc: "그릇·가전 완충용 뽁뽁이. 넉넉한 길이의 대형 롤",
    price: "1,000",
    alt: "에어캡 완충재 롤",
  },
  {
    image: "/images/item-cart.png",
    name: "핸드카트",
    desc: "무거운 짐을 한 번에. 접이식 운반용 손수레",
    price: "3,000",
    alt: "짐 운반용 핸드카트",
  },
  {
    image: "/images/item-ladder.png",
    name: "이사 사다리",
    desc: "높은 수납장·조명 정리에. 미끄럼 방지 발판",
    price: "5,000",
    alt: "이사용 접이식 사다리",
  },
  {
    image: "/images/item-hanger.png",
    name: "행거박스",
    desc: "옷을 걸어 그대로 이동. 구김 없이 옮기는 옷장형 박스",
    price: "1,500",
    alt: "옷걸이형 행거박스",
  },
  {
    image: "/images/item-tools.png",
    name: "이사 공구세트",
    desc: "가구 분해·조립용 드라이버·렌치 기본 구성",
    price: "2,000",
    alt: "이사용 공구세트",
  },
];

export function RentalItems() {
  return (
    <section id="items" className="bg-canvas py-20 lg:py-[96px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-caption font-semibold tracking-wide text-ink-muted">
            인기 렌탈 품목
          </p>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.4] tracking-[-0.4px] text-ink lg:text-headline">
            필요한 품목만 골라 담으세요
          </h2>
          <p className="mt-4 text-body leading-[1.6] text-ink-soft">
            하루 단위로 빌릴 수 있어 짧은 이사에도 부담이 없습니다. 모든 가격은
            1일 기준 예시이며, 신청 시 이용 기간에 맞춰 안내해 드립니다.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <li
              key={item.name}
              className="group/item flex flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas transition-colors duration-[220ms] hover:border-hairline-strong [transition-timing-function:var(--ease-standard)]"
            >
              <div className="relative aspect-square overflow-hidden bg-surface-soft">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={640}
                  height={640}
                  className="size-full object-cover transition-transform duration-[400ms] group-hover/item:scale-[1.03] [transition-timing-function:var(--ease-standard)]"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-title-lg font-semibold tracking-[-0.56px] text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-body-sm leading-[1.5] text-ink-soft">
                  {item.desc}
                </p>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <span className="text-caption-xs text-ink-muted">
                      1일 대여료
                    </span>
                    <p className="mt-0.5 text-title font-bold text-coral">
                      {item.price}
                      <span className="ml-0.5 text-body font-semibold text-ink-soft">
                        원
                      </span>
                    </p>
                  </div>

                  <Button className="h-11 rounded-lg bg-coral-strong px-4 text-body font-semibold text-on-primary hover:bg-coral-soft">
                    <Plus className="size-4" aria-hidden />
                    담기
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
