// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutComponent from "@/components/Layout";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ma Ma Beignet Dashboard",
  description: "Custom dashboard for Ma Ma Beignet by Versalabs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="m-0 p-0 bg-[#0f0f0f] overflow-hidden">
        <div
          className="origin-top-left"
          style={{
            transform: "scale(0.90)",
            width: "111.1111vw", // 100 / 0.9 = 111.1111
            height: "111.1111vh", // Corrected from 251.1111vh
            overflow: "hidden",
          }}
        >
          <LayoutComponent>{children}</LayoutComponent>
          <footer className="w-full text-white text-right text-sm py-2 bg-[#0f0f0f]">
            Ma Ma Beignet © 2025 All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}