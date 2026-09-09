import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import "./globals.css";

const heading = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "سولي العسولي | بيت الريحة السودانية",
  description:
    "عطور، بخور، خمرة ودلكة ومنتجات سودانية بروح معاصرة. اكتشفي سولي العسولي، بيت حديث للريحة السودانية.",
  keywords: ["سولي العسولي", "عطور سودانية", "بخور", "خمرة", "دلكة", "الريحة السودانية"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
