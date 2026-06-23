import Image from "next/image";
import { Recycle, Wallet, Leaf } from "lucide-react";

const POINTS = [
  {
    icon: Recycle,
    title: "한 번 쓰고 버리지 않아요",
    desc: "박스와 완충재를 여러 번 돌려 쓰는 순환 방식이라, 이사 한 번에 나오는 폐기물을 크게 줄일 수 있습니다.",
  },
  {
    icon: Wallet,
    title: "필요한 만큼만 비용을",
    desc: "다 쓰면 쌓아 둘 곳도 없는 준비물을, 사는 대신 빌리니 들어가는 비용도 그만큼 줄어듭니다.",
  },
  {
    icon: Leaf,
    title: "수거까지 책임집니다",
    desc: "사용한 품목은 회수해 점검 후 다시 대여합니다. 처리와 보관 부담 없이 가볍게 이사하세요.",
  },
];

export function EcoValue() {
  return (
    <section className="bg-surface-dark py-20 lg:py-[96px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 텍스트 */}
          <div>
            <p className="text-caption font-semibold tracking-wide text-coral">
              다시 쓰는 이사
            </p>
            <h2 className="mt-3 text-[28px] font-bold leading-[1.4] tracking-[-0.4px] text-on-dark lg:text-headline">
              사지 않고 빌리면
              <br />
              <span className="text-coral">지갑도 지구도</span> 가벼워집니다
            </h2>
            <p className="mt-5 text-body leading-[1.7] text-on-dark/75">
              이사 때만 쓰고 버려지던 박스와 완충재를 여러 번 돌려 쓰는 방식으로,
              불필요한 소비와 폐기물을 함께 줄입니다. 합리적인 선택이 곧
              친환경이 되도록 만들었습니다.
            </p>

            <ul className="mt-10 flex flex-col gap-7">
              {POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface-dark-alt text-coral">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-body-lg font-semibold text-on-dark">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-body-sm leading-[1.6] text-on-dark/70">
                        {point.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 이미지 */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-square">
            <Image
              src="/images/value-eco.png"
              alt="재사용 박스를 정리하며 친환경 이사를 준비하는 모습"
              width={900}
              height={900}
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
