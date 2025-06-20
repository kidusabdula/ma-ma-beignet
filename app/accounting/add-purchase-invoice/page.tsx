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
import { Checkbox } from "@/components/ui/checkbox";
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

  const addRow = () => {
    setItems([
      ...items,
      {
        no: items.length + 1,
        item: "",
        quantity: 0,
        rate: 0,
        amount: 0,
        sourceWarehouse: "Stores - WPL",
      },
    ]);
  };

  const addMultiple = () => {
    setItems([
      ...items,
      ...Array(5)
        // .fill()
        .map((_, i) => ({
          no: items.length + i + 1,
          item: "",
          quantity: 0,
          rate: 0,
          amount: 0,
          sourceWarehouse: "Stores - WPL",
        })),
    ]);
  };

  useEffect(() => {
    const newGrandTotal = items.reduce((sum, item) => sum + item.amount, 0);
    setGrandTotal(newGrandTotal);
    const newRoundedTotal = Math.round(newGrandTotal + roundingAdjustment);
    setRoundedTotal(newRoundedTotal);
    setOutstandingAmount(newRoundedTotal - totalAdvance);
  }, [items, roundingAdjustment, totalAdvance]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          New Purchase Invoice{" "}
          <span className="text-red-600 text-sm font-bold">Not Saved</span>
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            Fetch Timesheet
          </Button>
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            Get Items From
          </Button>
          <Button
            variant="default"
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Tabs/Sections */}
      <div className="flex space-x-4 text-[var(--card-foreground)]">
        <span className="cursor-pointer">Details</span>
        <span className="cursor-pointer">Payments</span>
        <span className="cursor-pointer">Address & Contact</span>
        <span className="cursor-pointer">Terms</span>
        <span className="cursor-pointer">More Info</span>
      </div>

      {/* Form Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Series *
            </label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="PUR-INV-YYYY-..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pur-inv-yyyy">PUR-INV-YYYY-...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Date *
            </label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              defaultValue="2025-06-20"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Supplier
            </label>
            <Input
              placeholder="Supplier"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Posting Time
            </label>
            <Input
              type="time"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              defaultValue="09:34:00"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Company *
            </label>
            <Input
              placeholder="Company"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              defaultValue="Ma Ma Beignet"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Payment Due Date *
            </label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-2">
          <Checkbox id="edit-posting" />
          <label
            htmlFor="edit-posting"
            className="text-[var(--card-foreground)] text-sm"
          >
            Edit Posting Date and Time
          </label>
        </div>
      </div>

      {/* Accounting Dimensions and Items Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[var(--card-foreground)]">
            Accounting Dimensions
          </h3>
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            View
          </Button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[var(--card-foreground)]">Items</h3>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
            >
              Scan Barcode
            </Button>
            <Checkbox id="update-stock" defaultChecked />
            <label
              htmlFor="update-stock"
              className="text-[var(--card-foreground)] text-sm ml-1"
            >
              Update Stock
            </label>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">
                No.
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Item
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Source Warehouse
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Quantity
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Rate (USD)
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Amount (USD)
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-[var(--card-foreground)]">
                  <input type="checkbox" className="mr-2" />
                  {item.no}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    placeholder="Item"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-40"
                    value={item.item}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].item = e.target.value;
                      setItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Select
                    value={item.sourceWarehouse}
                    onValueChange={(value) => {
                      const newItems = [...items];
                      newItems[index].sourceWarehouse = value;
                      setItems(newItems);
                    }}
                  >
                    <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                      <SelectValue placeholder="Source Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stores - WPL">Stores - WPL</SelectItem>
                      <SelectItem value="Bakery - WPL">Bakery - WPL</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    type="number"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-20"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].quantity =
                        parseFloat(e.target.value) || 0;
                      newItems[index].amount =
                        newItems[index].quantity * newItems[index].rate;
                      setItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    type="number"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-20"
                    value={item.rate}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].rate = parseFloat(e.target.value) || 0;
                      newItems[index].amount =
                        newItems[index].quantity * newItems[index].rate;
                      setItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      if (items.length > 1) {
                        setItems(items.filter((_, i) => i !== index));
                      }
                    }}
                  >
                    ✕
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
              onClick={addRow}
            >
              Add Row
            </Button>
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
              onClick={addMultiple}
            >
              Add Multiple
            </Button>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
            >
              Download
            </Button>
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
            >
              Upload
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Total Quantity
            </label>
            <Input
              type="number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={items.reduce((sum, item) => sum + item.quantity, 0)}
              readOnly
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Total (USD)
            </label>
            <Input
              type="number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={items
                .reduce((sum, item) => sum + item.amount, 0)
                .toFixed(2)}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Taxes and Charges Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">
          Taxes and Charges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Checkbox id="tax-exempt" />
            <label
              htmlFor="tax-exempt"
              className="text-[var(--card-foreground)] text-sm ml-1"
            >
              Is supplier exempted from sales tax?
            </label>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Shipping Rule
            </label>
            <Input
              placeholder="Shipping Rule"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Incoterm
            </label>
            <Input
              placeholder="Incoterm"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Tax Category
            </label>
            <Input
              placeholder="Tax Category"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Purchase Taxes and Charges Template
            </label>
            <Input
              placeholder="Purchase Taxes and Charges Template"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">
                No.
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Type *
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Account Head *
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Tax Rate
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Amount
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Total
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-[var(--card-foreground)] text-center"
              >
                No Data
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Totals Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Totals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Grand Total (USD) *
            </label>
            <Input
              type="number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={grandTotal.toFixed(2)}
              readOnly
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Rounding Adjustment (USD)
            </label>
            <Input
              type="number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={roundingAdjustment}
              onChange={(e) =>
                setRoundingAdjustment(parseFloat(e.target.value) || 0)
              }
            />
          </div>
        </div>
        <div className="mt-4">
          <Checkbox id="use-default-cost-center" />
          <label
            htmlFor="use-default-cost-center"
            className="text-[var(--card-foreground)] text-sm ml-1"
          >
            Use Company default Cost Center for Round off
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Rounded Total (USD)
            </label>
            <Input
              type="number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={roundedTotal.toFixed(2)}
              readOnly
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Total Advance (USD)
            </label>
            <Input
              type="number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={totalAdvance}
              onChange={(e) => setTotalAdvance(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Outstanding Amount (USD)
            </label>
            <Input
              type="number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={outstandingAmount.toFixed(2)}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
