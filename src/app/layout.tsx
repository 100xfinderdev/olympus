import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CursorEffect } from "@/components/ui/CursorEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OLYMPUS | Divine AI Trading",
  description: "3 AI Gods trade memecoins and distribute profits to top holders. Powered by Zeus, Athena, and Hermes.",
  keywords: ["solana", "trading", "ai", "memecoin", "pump.fun", "crypto"],
  openGraph: {
    title: "OLYMPUS | Divine AI Trading",
    description: "3 AI Gods trade memecoins and distribute profits to top holders",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OLYMPUS | Divine AI Trading",
    description: "3 AI Gods trade memecoins and distribute profits to top holders",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-olympus`}
      >
        <CursorEffect />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
