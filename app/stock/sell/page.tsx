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

export default function SellPage() {
  const { state, sell, undo } = useStock();
  const [customer, setCustomer] = useState("");
  const finishedOptions = useMemo(() => state.items.filter((i) => i.kind === "FINISHED"), [state.items]);
  const [lines, setLines] = useState<Line[]>([{ itemCode: "", qty: 0, uom: "Pc", rate: undefined }]);
  const [error, setError] = useState<string | null>(null);
  const { push } = useToast();
  const totals = useMemo(() => {
    const qty = lines.reduce((s, l) => s + (Number.isFinite(l.qty) ? l.qty : 0), 0);
    const amount = lines.reduce((s, l) => s + ((l.rate || 0) * (l.qty || 0)), 0);
    return { qty, amount };
  }, [lines]);

  function submit() {
    setError(null);
    if (!customer) return setError("Customer required");
    const valid = lines.filter((l) => l.itemCode && l.qty > 0);
    if (valid.length === 0) return setError("Add at least one valid line");
    const date = new Date().toISOString().slice(0, 10);
    sell({ date, customer, lines: valid });
    push({ variant: "success", title: "Delivery Submitted", description: `${valid.length} line(s) to ${customer}` });
    setLines([{ itemCode: "", qty: 0, uom: "Pc", rate: undefined }]);
  }

  function updateLine(idx: number, partial: Partial<Line>) {
    setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, ...partial } : l)));
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-[var(--card-foreground)]">
        Delivery Note (Sell)
      </motion.h1>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Customer</label>
            <Input value={customer} onChange={(e) => setCustomer(e.target.value)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" placeholder="e.g., Walk-in Customer" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Qty</TableHead>
              <TableHead className="text-[var(--card-foreground)]">UOM</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Rate</TableHead>
              <TableHead className="text-[var(--card-foreground)]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((ln, idx) => (
              <LineRow
                key={idx}
                line={ln}
                onChange={(partial) => updateLine(idx, partial)}
                onRemove={() => setLines((prev) => prev.filter((_, i) => i !== idx))}
                kind="FINISHED"
                showRate
              />
            ))}
            <TableRow>
              <TableCell className="text-[var(--card-foreground)] font-medium">Totals</TableCell>
              <TableCell className="text-[var(--card-foreground)]">{totals.qty}</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-[var(--card-foreground)]">{totals.amount.toFixed(2)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setLines((prev) => [...prev, { itemCode: "", qty: 0, uom: "Pc" }])}>Add Row</Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={undo} className="border-[var(--border)] text-[var(--card-foreground)]">Undo Last</Button>
            <Button className="bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={submit}>Submit Delivery</Button>
          </div>
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </div>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-3 font-semibold">Stock Ledger (Chronological)</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Date</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Type</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Change</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Ref</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...state.ledger].reverse().map((l) => (
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


