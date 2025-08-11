"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStock } from "@/components/stock/StockStore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { generateBalancePDF } from "@/components/stock/PDF";

export default function ItemDetailPage() {
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const code = decodeURIComponent(params.code);
  const { state } = useStock();
  const item = state.items.find((i) => i.itemCode === code);
  const balance = state.balances[code];
  const history = useMemo(() => state.ledger.filter((l) => l.itemCode === code), [state.ledger, code]);

  if (!item) {
    return (
      <div className="p-6 space-y-4">
        <div className="text-[var(--card-foreground)]">Item not found.</div>
        <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Item: {item.itemCode}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()} className="border-[var(--border)] text-[var(--card-foreground)]">Back</Button>
          <Button onClick={() => generateBalancePDF([{ itemCode: item.itemCode, qty: balance?.qty || 0, uom: balance?.uom, warehouse: item.warehouse }])} className="bg-[var(--primary)] text-[var(--primary-foreground)]">Download Balance PDF</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-400">Kind</div>
          <div className="text-[var(--card-foreground)]">{item.kind}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Default Warehouse</div>
          <div className="text-[var(--card-foreground)]">{item.warehouse}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Current Balance</div>
          <div className="text-[var(--card-foreground)]">{balance ? `${balance.qty} ${balance.uom || ""}` : "0"}</div>
        </div>
      </motion.div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <h3 className="text-[var(--card-foreground)] mb-3 font-semibold">Movement History</h3>
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
            {history.map((l) => (
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


