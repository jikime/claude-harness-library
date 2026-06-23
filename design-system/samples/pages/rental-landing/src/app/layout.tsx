import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "이사대학 렌탈 — 이사용품·장비 대여 서비스",
  description:
    "포장박스부터 핸드카트·이사 사다리까지, 필요한 만큼만 빌리는 이사 준비물 렌탈. 신청 한 번에 문 앞 배송, 이사 끝나면 반납.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
