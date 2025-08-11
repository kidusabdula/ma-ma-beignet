"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStock } from "@/components/stock/StockStore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { generateTransactionPDF } from "@/components/stock/PDF";

export default function TransactionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { state } = useStock();
  const entry = state.ledger.find((l) => l.id === params.id);

  const related = useMemo(() => {
    if (!entry) return [];
    return state.ledger.filter((l) => l.itemCode === entry.itemCode && l.id !== entry.id).slice(0, 8);
  }, [entry, state.ledger]);

  if (!entry) {
    return (
      <div className="p-6 space-y-4">
        <div className="text-[var(--card-foreground)]">Transaction not found.</div>
        <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const balance = state.balances[entry.itemCode];
  const sign = entry.type === "ISSUE" || entry.type === "SELL" ? -1 : 1;

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Transaction Details</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()} className="border-[var(--border)] text-[var(--card-foreground)]">Back</Button>
          <Button onClick={() => generateTransactionPDF(entry)} className="bg-[var(--primary)] text-[var(--primary-foreground)]">Download PDF</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-2">
        <div className="text-sm text-gray-400">ID</div>
        <div className="text-[var(--card-foreground)] font-mono">{entry.id}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <div className="text-sm text-gray-400">Type</div>
            <div className="text-[var(--card-foreground)]">{entry.type}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Date</div>
            <div className="text-[var(--card-foreground)]">{entry.date}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Item</div>
            <div className="text-[var(--card-foreground)]">{entry.itemCode}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Change</div>
            <div className="text-[var(--card-foreground)]">{sign < 0 ? "-" : "+"}{entry.qty} {entry.uom || ""}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Reference</div>
            <div className="text-[var(--card-foreground)]">{entry.reference || "—"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Warehouse</div>
            <div className="text-[var(--card-foreground)]">{entry.warehouse}</div>
          </div>
          {entry.rate !== undefined && (
            <div>
              <div className="text-sm text-gray-400">Rate</div>
              <div className="text-[var(--card-foreground)]">{entry.rate}</div>
            </div>
          )}
          {balance && (
            <div>
              <div className="text-sm text-gray-400">Current Balance</div>
              <div className="text-[var(--card-foreground)]">{balance.qty} {balance.uom || ""} @ {balance.warehouse}</div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <h3 className="text-[var(--card-foreground)] mb-3 font-semibold">Other recent moves for {entry.itemCode}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Date</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Type</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Change</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Ref</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {related.map((l) => (
              <TableRow key={l.id} className="cursor-pointer hover:bg-white/5" onClick={() => router.push(`/stock/transaction/${l.id}`)}>
                <TableCell className="text-[var(--card-foreground)]">{l.date}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{l.type}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{l.type === "ISSUE" || l.type === "SELL" ? `-${l.qty}` : `+${l.qty}`} {l.uom || ""}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{l.reference || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


