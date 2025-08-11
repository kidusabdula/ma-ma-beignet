"use client";

import React from "react";
import { StockProvider } from "@/components/stock/StockStore";

export default function StockSectionLayout({ children }: { children: React.ReactNode }) {
  return <StockProvider>{children}</StockProvider>;
}


