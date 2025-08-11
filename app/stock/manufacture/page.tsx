"use client";

import React, { useMemo, useState } from "react";
import { useStock } from "@/components/stock/StockStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";

export default function ManufacturePage() {
  const { state, manufacture, undo } = useStock();
  const finishedOptions = useMemo(() => state.items.filter((i) => i.kind === "FINISHED"), [state.items]);
  const [itemCode, setItemCode] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [uom, setUom] = useState("Pc");
  const [reference, setReference] = useState("Manufacture Batch");
  const [error, setError] = useState<string | null>(null);
  const { push } = useToast();

  function submit() {
    setError(null);
    if (!itemCode) return setError("Select finished good");
    if (!qty || qty <= 0) return setError("Quantity must be positive");
    const date = new Date().toISOString().slice(0, 10);
    manufacture({ date, itemCode, qty, uom, reference });
    push({ variant: "success", title: "Production Added", description: `${qty} ${uom} of ${itemCode}` });
    setQty(0);
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-[var(--card-foreground)]">
        Manufacture Entry
      </motion.h1>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="text-[var(--card-foreground)] block mb-1">Output Item</label>
          <Select value={itemCode} onValueChange={setItemCode}>
            <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"><SelectValue placeholder="Select Finished Item" /></SelectTrigger>
            <SelectContent>
              {finishedOptions.map((it) => (
                <SelectItem key={it.itemCode} value={it.itemCode}>{it.itemCode}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              <SelectItem value="Pc">Pc</SelectItem>
              <SelectItem value="Dz">Dz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <label className="text-[var(--card-foreground)] block mb-1">Reference</label>
          <Input value={reference} onChange={(e) => setReference(e.target.value)} className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]" />
        </div>
        <div className="md:col-span-5 flex justify-end gap-2">
          <Button variant="outline" onClick={undo} className="border-[var(--border)] text-[var(--card-foreground)]">Undo Last</Button>
          <Button onClick={submit} className="bg-[var(--primary)] text-[var(--primary-foreground)]">Add Production</Button>
        </div>
        {error && <div className="md:col-span-5 text-red-400 text-sm">{error}</div>}
      </div>

      <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-3 font-semibold">Current Stock</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Qty</TableHead>
              <TableHead className="text-[var(--card-foreground)]">UOM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(state.balances).map((b) => (
              <TableRow key={b.itemCode} className="cursor-pointer hover:bg-white/5" onClick={() => window.location.assign(`/stock/item/${encodeURIComponent(b.itemCode)}`)}>
                <TableCell className="text-[var(--card-foreground)]">{b.itemCode}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.qty}</TableCell>
                <TableCell className="text-[var(--card-foreground)]">{b.uom || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


