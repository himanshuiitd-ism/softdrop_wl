import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Softdrop | India's First Revenue-Verified Digital Marketplace",
  description: "Buy, sell, and dropship digital assets with escrow protection. The only marketplace where every seller's revenue is gateway-verified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#080808] text-gray-100 selection:bg-orange-500/30 selection:text-orange-400 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
