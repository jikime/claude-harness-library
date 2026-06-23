import { Star } from "lucide-react";

const STATS = [
  { value: "12,000건+", label: "누적 렌탈 대여 건수" },
  { value: "4.9 / 5", label: "이용자 평균 만족도" },
  { value: "98%", label: "약속한 날짜 정시 배송률" },
];

const REVIEWS = [
  {
    name: "김O진",
    meta: "원룸 이사 · 포장박스 세트",
    rating: 5,
    body: "박스를 따로 사면 이사 끝나고 처치 곤란이었는데, 빌려 쓰고 반납하니 정말 편했어요. 배송도 신청한 날에 정확히 왔습니다.",
  },
  {
    name: "이O수",
    meta: "투룸 이사 · 핸드카트·행거박스",
    rating: 5,
    body: "행거박스 덕분에 옷 정리 시간이 확 줄었어요. 핸드카트도 튼튼해서 무거운 짐을 혼자 옮길 수 있었습니다.",
  },
  {
    name: "박O연",
    meta: "쓰리룸 이사 · 패밀리세트",
    rating: 5,
    body: "필요한 게 한 세트에 다 들어 있어 따로 챙길 게 없었어요. 사용 후 수거까지 와 주셔서 마무리가 깔끔했습니다.",
  },
];

export function TrustReviews() {
  return (
    <section id="reviews" className="bg-coral-tint py-20 lg:py-[96px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* 신뢰 지표 */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-[40px] font-bold tracking-[-0.8px] text-coral lg:text-[44px]">
                {stat.value}
              </p>
              <p className="mt-2 text-body font-medium text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 후기 */}
        <div className="mt-16">
          <h2 className="text-[28px] font-bold leading-[1.4] tracking-[-0.4px] text-ink lg:text-headline">
            먼저 이용한 분들의 이야기
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <li
                key={review.name}
                className="flex flex-col rounded-2xl border border-hairline bg-canvas p-7"
              >
                <div className="flex items-center gap-1" aria-label={`별점 ${review.rating}점`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-coral-strong text-coral-strong"
                      aria-hidden
                    />
                  ))}
                </div>

                <p className="mt-5 flex-1 text-body-sm leading-[1.6] text-ink">
                  “{review.body}”
                </p>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="text-body font-semibold text-ink">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-caption-xs text-ink-muted">
                    {review.meta}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
