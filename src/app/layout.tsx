import type { Metadata, Viewport } from "next";
import { Oswald, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Parkourhall1 – Quality Movement",
  description: "Parkourhall1 i Järfälla – parkour, akrobatik och World Chase Tag för alla åldrar. Träna med Quality Movement.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${oswald.variable} ${openSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#3d5568] text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
