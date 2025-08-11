"use client";

import React, { useMemo, useState } from "react";
import { useStock } from "@/components/stock/StockStore";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateBalancePDF } from "@/components/stock/PDF";
import { TrendSpark } from "@/components/stock/TrendSpark";

export default function StockReportPage() {
  const { state } = useStock();
  const [filter, setFilter] = useState("");

  const balances = useMemo(() => {
    const rows = Object.values(state.balances);
    if (!filter) return rows;
    return rows.filter((r) => r.itemCode.toLowerCase().includes(filter.toLowerCase()));
  }, [state.balances, filter]);

  const flourConsumption = useMemo(() => {
    return state.ledger
      .filter((l) => l.itemCode.includes("FLW") && (l.type === "ISSUE" || l.type === "SELL"))
      .reduce((sum, l) => sum + l.qty, 0);
  }, [state.ledger]);

  return (
    <div className="space-y-6 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Stock Report</h1>
        <div className="text-xs text-gray-400" title="Future upgrade: offline-capable PWA with background sync">Offline-capable (future upgrade)</div>
      </motion.div>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[var(--card-foreground)]">Filter by Item</span>
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="e.g., Flour" className="w-64 bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" />
          <div className="ml-auto text-sm text-[var(--card-foreground)]">Total Flour consumption: {flourConsumption}</div>
          <Button onClick={() => generateBalancePDF(balances)} className="bg-[var(--primary)] text-[var(--primary-foreground)]">Download Balance PDF</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Qty</TableHead>
              <TableHead className="text-[var(--card-foreground)]">UOM</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Warehouse</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balances.map((b) => (
              <TableRow key={b.itemCode} className="cursor-pointer hover:bg-white/5" onClick={() => window.location.assign(`/stock/item/${encodeURIComponent(b.itemCode)}`)}>
                <TableCell className="text-[var(--card-foreground)]">{b.itemCode}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.qty}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.uom || ""}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.warehouse}</TableCell>
                <TableCell className="text-[var(--card-foreground)]"><TrendSpark data={[b.qty - 3, b.qty - 2, b.qty - 1, b.qty]} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-3 font-semibold">Stock Ledger</h3>
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


