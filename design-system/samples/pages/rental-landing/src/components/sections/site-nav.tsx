"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "렌탈 품목", href: "#items" },
  { label: "이용 방법", href: "#how" },
  { label: "요금 안내", href: "#pricing" },
  { label: "이용 후기", href: "#reviews" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] transition-colors duration-[220ms] [transition-timing-function:var(--ease-standard)]"
      data-scrolled={scrolled}
    >
      <div
        className={
          scrolled
            ? "border-b border-hairline bg-canvas/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        }
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:h-[88px] lg:px-10">
          {/* 로고 */}
          <Link
            href="#top"
            className="flex items-center gap-2"
            aria-label="무빙박스 렌탈 홈"
          >
            <span
              className={
                scrolled
                  ? "grid size-9 place-items-center rounded-lg bg-coral-strong text-on-primary"
                  : "grid size-9 place-items-center rounded-lg bg-coral-strong text-on-primary lg:bg-canvas/15 lg:backdrop-blur-sm"
              }
            >
              <span className="text-[18px] font-extrabold leading-none">이</span>
            </span>
            <span
              className={
                scrolled
                  ? "text-body-lg font-bold text-ink"
                  : "text-body-lg font-bold text-ink lg:text-on-dark"
              }
            >
              무빙박스 렌탈
            </span>
          </Link>

          {/* 데스크톱 내비 */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  scrolled
                    ? "text-body font-medium text-ink-soft transition-colors duration-[150ms] hover:text-coral [transition-timing-function:var(--ease-standard)]"
                    : "text-body font-medium text-on-dark/85 transition-colors duration-[150ms] hover:text-on-dark [transition-timing-function:var(--ease-standard)]"
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 우측: 전화 + CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:1600-0000"
              className={
                scrolled
                  ? "hidden items-center gap-2 text-phone text-ink sm:flex"
                  : "hidden items-center gap-2 text-phone text-ink sm:flex lg:text-on-dark"
              }
            >
              <Phone className="size-5" aria-hidden />
              <span>1600-0000</span>
            </a>

            <Button
              asChild
              className="hidden h-11 rounded-xl bg-coral-strong px-5 text-body-lg font-semibold text-on-primary hover:bg-coral-soft sm:inline-flex"
            >
              <a href="#final-cta">
                렌탈 신청
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>

            {/* 모바일 메뉴 */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={
                    scrolled
                      ? "text-ink lg:hidden"
                      : "text-ink hover:bg-canvas/15 lg:hidden"
                  }
                  aria-label="메뉴 열기"
                >
                  <Menu className="size-6" aria-hidden />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[82%] gap-0 bg-canvas p-0 sm:max-w-sm"
              >
                <SheetHeader className="border-b border-hairline px-6 py-5">
                  <SheetTitle className="text-title font-semibold text-ink">
                    무빙박스 렌탈
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col px-3 py-4">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-body-lg font-semibold text-ink transition-colors duration-[150ms] hover:bg-surface-soft [transition-timing-function:var(--ease-standard)]"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3 border-t border-hairline px-6 py-5">
                  <a
                    href="tel:1600-0000"
                    className="flex items-center justify-center gap-2 text-phone text-ink"
                  >
                    <Phone className="size-5" aria-hidden />
                    <span>1600-0000</span>
                  </a>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="h-12 w-full rounded-xl bg-coral-strong text-body-lg font-semibold text-on-primary hover:bg-coral-soft"
                    >
                      <a href="#final-cta">
                        렌탈 신청
                        <ArrowRight className="size-4" aria-hidden />
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
