import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { RentalItems } from "@/components/sections/rental-items";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { TrustReviews } from "@/components/sections/trust-reviews";
import { EcoValue } from "@/components/sections/eco-value";
import { FinalCta } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/site-footer";
import { QuickCta } from "@/components/sections/quick-cta";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-canvas">
      <SiteNav />
      <main>
        <Hero />
        <RentalItems />
        <HowItWorks />
        <Pricing />
        <TrustReviews />
        <EcoValue />
        <FinalCta />
      </main>
      <SiteFooter />
      {/* 모바일 하단 고정바가 가리는 만큼 문서 끝에 여백 확보 */}
      <div className="h-[57px] bg-surface-dark lg:hidden" aria-hidden />
      <QuickCta />
    </div>
  );
}
