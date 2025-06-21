"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

export default function AddPurchaseInvoice() {
  const [items, setItems] = useState([
    {
      no: 1,
      item: "",
      quantity: 0,
      rate: 0,
      amount: 0,
      sourceWarehouse: "Stores - WPL",
    },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [roundingAdjustment, setRoundingAdjustment] = useState(0);
  const [roundedTotal, setRoundedTotal] = useState(0);
  const [totalAdvance, setTotalAdvance] = useState(0);
  const [outstandingAmount, setOutstandingAmount] = useState(0);

  const formatETB = (value: number) =>
    `ETB ${value.toLocaleString("en-ET", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // const addRow = () => {
  //   setItems([
  //     ...items,
  //     {
  //       no: items.length + 1,
  //       item: "",
  //       quantity: 0,
  //       rate: 0,
  //       amount: 0,
  //       sourceWarehouse: "Stores - WPL",
  //     },
  //   ]);
  // };

  // const addMultiple = () => {
  //   setItems([
  //     ...items,
  //     ...Array(5).fill(null).map((_, i) => ({
  //       no: items.length + i + 1,
  //       item: "",
  //       quantity: 0,
  //       rate: 0,
  //       amount: 0,
  //       sourceWarehouse: "Stores - WPL",
  //     })),
  //   ]);
  // };

  useEffect(() => {
    const newGrandTotal = items.reduce((sum, item) => sum + item.amount, 0);
    setGrandTotal(newGrandTotal);
    const newRoundedTotal = Math.round(newGrandTotal + roundingAdjustment);
    setRoundedTotal(newRoundedTotal);
    setOutstandingAmount(newRoundedTotal - totalAdvance);
  }, [items, roundingAdjustment, totalAdvance]);

  return (
    <div className="space-y-6">
      {/* ... header and form inputs remain unchanged ... */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Source Warehouse</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate (ETB)</TableHead>
            <TableHead>Amount (ETB)</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell><input type="checkbox" className="mr-2" />{item.no}</TableCell>
              <TableCell>
                <Input
                  placeholder="Item"
                  value={item.item}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].item = e.target.value;
                    setItems(newItems);
                  }}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={item.sourceWarehouse}
                  onValueChange={(value) => {
                    const newItems = [...items];
                    newItems[index].sourceWarehouse = value;
                    setItems(newItems);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Source Warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stores - WPL">Stores - WPL</SelectItem>
                    <SelectItem value="Bakery - WPL">Bakery - WPL</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].quantity = parseFloat(e.target.value) || 0;
                    newItems[index].amount = newItems[index].quantity * newItems[index].rate;
                    setItems(newItems);
                  }}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].rate = parseFloat(e.target.value) || 0;
                    newItems[index].amount = newItems[index].quantity * newItems[index].rate;
                    setItems(newItems);
                  }}
                />
              </TableCell>
              <TableCell>{formatETB(item.amount)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => {
                    if (items.length > 1) {
                      setItems(items.filter((_, i) => i !== index));
                    }
                  }}
                >✕</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label>Grand Total (ETB)</label>
          <Input value={formatETB(grandTotal)} readOnly />
        </div>
        <div>
          <label>Rounding Adjustment (ETB)</label>
          <Input
            type="number"
            value={roundingAdjustment}
            onChange={(e) => setRoundingAdjustment(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <label>Rounded Total (ETB)</label>
          <Input value={formatETB(roundedTotal)} readOnly />
        </div>
        <div>
          <label>Total Advance (ETB)</label>
          <Input
            type="number"
            value={totalAdvance}
            onChange={(e) => setTotalAdvance(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <label>Outstanding Amount (ETB)</label>
          <Input value={formatETB(outstandingAmount)} readOnly />
        </div>
      </div>
    </div>
  );
}