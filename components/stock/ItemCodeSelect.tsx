"use client";

import React, { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStock } from "@/components/stock/StockStore";
import { Input } from "@/components/ui/input";
import { getItemName } from "./items";

export function ItemCodeSelect({
  value,
  onChange,
  kind,
  className,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  kind?: "RAW" | "FINISHED" | "OTHER";
  className?: string;
  placeholder?: string;
}) {
  const { state } = useStock();
  const items = useMemo(() => (kind ? state.items.filter((i) => i.kind === kind) : state.items), [state.items, kind]);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.itemCode.toLowerCase().includes(q) || getItemName(i.itemCode).toLowerCase().includes(q));
  }, [items, search]);
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] ${className || ""}`}>
        <SelectValue placeholder={placeholder || "Select Item"} />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input placeholder="Search code or name" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" />
        </div>
        {filtered.map((it) => (
          <SelectItem key={it.itemCode} value={it.itemCode}>
            <div className="flex flex-col">
              <span>{it.itemCode}</span>
              <span className="text-xs opacity-70">{getItemName(it.itemCode)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


