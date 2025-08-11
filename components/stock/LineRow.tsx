"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ItemCodeSelect } from "./ItemCodeSelect";
import { UomSelect } from "./UomSelect";
import { motion } from "framer-motion";
import { getItemName } from "./items";

export type Line = { itemCode: string; qty: number; uom?: string; rate?: number };

export function LineRow({
  line,
  onChange,
  onRemove,
  kind,
  showRate,
}: {
  line: Line;
  onChange: (partial: Partial<Line>) => void;
  onRemove: () => void;
  kind?: "RAW" | "FINISHED" | "OTHER";
  showRate?: boolean;
}) {
  return (
    <motion.tr initial={{ backgroundColor: "rgba(0,0,0,0)" }} animate={{ backgroundColor: "rgba(255,255,255,0.02)" }} transition={{ duration: 0.5 }}>
      <TableCell className="text-[var(--card-foreground)]">
        <ItemCodeSelect value={line.itemCode} onChange={(v) => onChange({ itemCode: v })} kind={kind} className="w-64" placeholder="Select Item" />
        {line.itemCode && <div className="text-xs opacity-70 mt-1">{getItemName(line.itemCode)}</div>}
      </TableCell>
      <TableCell className="text-[var(--card-foreground)]">
        <Input type="number" value={line.qty} onChange={(e) => onChange({ qty: parseFloat(e.target.value) || 0 })} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-24" />
      </TableCell>
      <TableCell className="text-[var(--card-foreground)]">
        <UomSelect value={line.uom} onChange={(v) => onChange({ uom: v })} />
      </TableCell>
      {showRate && (
        <TableCell className="text-[var(--card-foreground)]">
          <Input type="number" value={line.rate ?? ""} onChange={(e) => onChange({ rate: e.target.value ? parseFloat(e.target.value) : undefined })} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-28" />
        </TableCell>
      )}
      <TableCell>
        <Button variant="ghost" className="text-red-400" onClick={onRemove}>Remove</Button>
      </TableCell>
    </motion.tr>
  );
}


