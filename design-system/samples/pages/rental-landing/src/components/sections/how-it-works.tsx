import { ClipboardList, Truck, RotateCcw } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "온라인 신청",
    desc: "필요한 품목과 이용 기간, 받을 주소를 입력하면 신청 끝. 회원가입 없이 1분이면 충분합니다.",
  },
  {
    icon: Truck,
    title: "문 앞 배송",
    desc: "원하는 날짜에 맞춰 집 앞까지 배송합니다. 수도권은 배송비 없이 받아보실 수 있습니다.",
  },
  {
    icon: RotateCcw,
    title: "사용 후 반납 수거",
    desc: "이사가 끝나면 그대로 두세요. 약속한 날에 방문해 수거하므로 따로 반납하실 필요가 없습니다.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-surface-soft py-20 lg:py-[96px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-caption font-semibold tracking-wide text-ink-muted">
            이용 방법
          </p>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.4] tracking-[-0.4px] text-ink lg:text-headline">
            세 단계면 준비물 걱정 끝
          </h2>
          <p className="mt-4 text-body leading-[1.6] text-ink-soft">
            복잡한 과정 없이 신청부터 수거까지 한 번에 이어집니다.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative flex flex-col rounded-2xl border border-hairline bg-canvas p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-9 place-items-center rounded-full bg-coral-strong text-body-lg font-bold text-on-primary">
                    {idx + 1}
                  </span>
                  <span className="grid size-12 place-items-center rounded-xl bg-coral-tint text-coral">
                    <Icon className="size-6" aria-hidden />
                  </span>
                </div>
                <h3 className="mt-6 text-title font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-sm leading-[1.6] text-ink-soft">
                  {step.desc}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
