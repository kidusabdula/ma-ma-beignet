"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UomSelect({ value, onChange, options }: { value?: string; onChange: (v: string) => void; options?: string[] }) {
  const uoms = options && options.length > 0 ? options : ["Bag", "Kg", "g", "Pc", "Dz", "Roll"];
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
        <SelectValue placeholder="UOM" />
      </SelectTrigger>
      <SelectContent>
        {uoms.map((u) => (
          <SelectItem key={u} value={u}>
            {u}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


