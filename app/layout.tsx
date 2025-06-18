import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Import the Inter font from next/font/google
import LayoutComponent from "@/components/Layout";
import "@/styles/globals.css";

// 2. Initialize the font with desired subsets
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ma Ma Beignet Dashboard",
  description: "Custom dashboard for Ma Ma Beignet by Versalabs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Apply the font's className to the <html> or <body> tag
    <html lang="en" className={inter.className}>
      <body>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}