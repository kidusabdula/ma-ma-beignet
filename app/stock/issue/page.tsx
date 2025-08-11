"use client";

import React, { useMemo, useState } from "react";
import { useStock } from "@/components/stock/StockStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineRow, type Line } from "@/components/stock/LineRow";
import { useToast } from "@/components/ui/toast";

export default function IssuePage() {
  const { state, issue, undo } = useStock();
  const [lines, setLines] = useState<Line[]>([{ itemCode: "", qty: 0, uom: "Kg" }]);
  const [reference, setReference] = useState<string>("Material Issue for Production");
  const [error, setError] = useState<string | null>(null);
  const { push } = useToast();

  const itemOptions = useMemo(() => state.items.filter((i) => i.kind === "RAW"), [state.items]);
  const totalQty = useMemo(() => lines.reduce((s, l) => s + (Number.isFinite(l.qty) ? l.qty : 0), 0), [lines]);

  function submit() {
    setError(null);
    const valid = lines.filter((l) => l.itemCode && l.qty > 0);
    if (valid.length === 0) return setError("Add at least one valid line");
    const date = new Date().toISOString().slice(0, 10);
    issue({ date, lines: valid, reference });
    push({ variant: "success", title: "Issued to Production", description: `${valid.length} line(s) processed` });
    setLines([{ itemCode: "", qty: 0, uom: "Kg" }]);
  }

  function updateLine(idx: number, partial: Partial<Line>) {
    setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, ...partial } : l)));
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-[var(--card-foreground)]">
        Material Issue to Production
      </motion.h1>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 text-sm text-[var(--card-foreground)]">Reference</div>
          <Input value={reference} onChange={(e) => setReference(e.target.value)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Qty</TableHead>
              <TableHead className="text-[var(--card-foreground)]">UOM</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Available</TableHead>
              <TableHead className="text-[var(--card-foreground)]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((ln, idx) => (
              <>
                <LineRow
                  key={`r-${idx}`}
                  line={ln}
                  onChange={(partial) => updateLine(idx, partial)}
                  onRemove={() => setLines((prev) => prev.filter((_, i) => i !== idx))}
                  kind="RAW"
                />
                <TableRow key={`a-${idx}`}>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{ln.itemCode ? state.balances[ln.itemCode]?.qty ?? 0 : "-"}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setLines((prev) => [...prev, { itemCode: "", qty: 0, uom: "Kg" }])}>Add Row</Button>
          <div className="flex gap-2">
            <div className="text-sm text-[var(--card-foreground)] mr-2">Total Qty: {totalQty}</div>
            <Button variant="outline" onClick={undo} className="border-[var(--border)] text-[var(--card-foreground)]">Undo Last</Button>
            <Button className="bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={submit}>Issue</Button>
          </div>
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </div>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-3 font-semibold">Stock Ledger (Latest)</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Date</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Type</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Qty</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Ref</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.ledger.map((l) => (
              <TableRow key={l.id} className="cursor-pointer hover:bg-white/5" onClick={() => window.location.assign(`/stock/transaction/${l.id}`)}>
                <TableCell className="text-[var(--card-foreground)]">{l.date}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{l.type}</TableCell>
                <TableCell className="text-[var(--card-foreground)] underline" onClick={(e) => { e.stopPropagation(); window.location.assign(`/stock/item/${encodeURIComponent(l.itemCode)}`) }}>{l.itemCode}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{l.type === "ISSUE" || l.type === "SELL" ? `-${l.qty}` : `+${l.qty}`}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{l.reference || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


