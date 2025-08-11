"use client";

import React, { useMemo, useState } from "react";
import { useStock } from "@/components/stock/StockStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { useStock as useStockState } from "@/components/stock/StockStore";

export default function ReceivePage() {
  const { state, receive, undo } = useStockState();
  const [itemCode, setItemCode] = useState("");
  const [supplier, setSupplier] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [reference, setReference] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [uom, setUom] = useState("Bag");
  const [rate, setRate] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const itemOptions = useMemo(() => state.items, [state.items]);
  const { push } = useToast();

  function submit() {
    setError(null);
    if (!itemCode) return setError("Select item");
    if (!qty || qty <= 0) return setError("Quantity must be positive");
    const date = new Date().toISOString().slice(0, 10);
    receive({ date, itemCode, qty, uom, rate, supplier: supplier || reference || undefined });
    push({ variant: "success", title: "Received", description: `${qty} ${uom} of ${itemCode} added to stock` });
    setQty(0);
    setSupplier("");
    setBatchNo("");
    setReference("");
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-[var(--card-foreground)]">
        Receive Raw Materials
      </motion.h1>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] grid grid-cols-1 md:grid-cols-6 gap-4">
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">Item</label>
          <Select value={itemCode} onValueChange={setItemCode}>
            <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"><SelectValue placeholder="Select Item" /></SelectTrigger>
            <SelectContent>
              {itemOptions.map((it) => (
                <SelectItem key={it.itemCode} value={it.itemCode}>{it.itemCode}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">Supplier</label>
          <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" placeholder="e.g., Ethiopian Grain Co." />
        </div>
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">Qty</label>
          <Input type="number" value={qty} onChange={(e) => setQty(parseFloat(e.target.value) || 0)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" />
        </div>
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">UOM</label>
          <Select value={uom} onValueChange={setUom}>
            <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"><SelectValue placeholder="Select UOM" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Bag">Bag</SelectItem>
              <SelectItem value="Kg">Kg</SelectItem>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="Pc">Pc</SelectItem>
              <SelectItem value="Roll">Roll</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">Rate (optional)</label>
          <Input type="number" value={rate ?? ""} onChange={(e) => setRate(e.target.value ? parseFloat(e.target.value) : undefined)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" />
        </div>
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">Batch No.</label>
          <Input value={batchNo} onChange={(e) => setBatchNo(e.target.value)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" />
        </div>
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">Reference</label>
          <Input value={reference} onChange={(e) => setReference(e.target.value)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" placeholder="e.g., PO-2025-001" />
        </div>
        <div className="md:col-span-6 flex justify-end gap-2">
          <Button variant="outline" onClick={undo} className="border-[var(--border)] text-[var(--card-foreground)]">Undo Last</Button>
          <Button onClick={submit} className="bg-[var(--primary)] text-[var(--primary-foreground)]">Receive</Button>
        </div>
        {error && <div className="md:col-span-5 text-red-400 text-sm">{error}</div>}
      </div>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-3 font-semibold">Stock Balance</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Qty</TableHead>
              <TableHead className="text-[var(--card-foreground)]">UOM</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Warehouse</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(state.balances).map((b) => (
              <TableRow key={b.itemCode} className="cursor-pointer hover:bg-white/5" onClick={() => window.location.assign(`/stock/item/${encodeURIComponent(b.itemCode)}`)}>
                <TableCell className="text-[var(--card-foreground)]">{b.itemCode}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.qty}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.uom || ""}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.warehouse}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


