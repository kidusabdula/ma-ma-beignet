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

export default function AddJournalEntry() {
  const [entries, setEntries] = useState([
    { no: 1, account: "", partyType: "", party: "", debit: 0, credit: 0 },
  ]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  const addRow = () => {
    setEntries([
      ...entries,
      {
        no: entries.length + 1,
        account: "",
        partyType: "",
        party: "",
        debit: 0,
        credit: 0,
      },
    ]);
  };

  const addMultiple = () => {
    setEntries([
      ...entries,
      ...Array(5)
        // .fill()
        .map((_, i) => ({
          no: entries.length + i + 1,
          account: "",
          partyType: "",
          party: "",
          debit: 0,
          credit: 0,
        })),
    ]);
  };

  useEffect(() => {
    const newTotalDebit = entries.reduce(
      (sum, entry) => sum + (entry.debit || 0),
      0
    );
    const newTotalCredit = entries.reduce(
      (sum, entry) => sum + (entry.credit || 0),
      0
    );
    setTotalDebit(newTotalDebit);
    setTotalCredit(newTotalCredit);
  }, [entries]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          New Journal Entry <span className="text-red-600 text-sm">Not Saved</span>
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            Quick Entry
          </Button>
          <Button
            variant="default"
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Entry Type *
            </label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Journal Entry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="journal-entry">Journal Entry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              From Template
            </label>
            <Input
              placeholder="From Template"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Series *
            </label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="ACC-JV-YYYY-..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acc-jv-yyyy">ACC-JV-YYYY-...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Company *
            </label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Wind Power LLC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wind-power-llc">Wind Power LLC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Posting Date *
            </label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              defaultValue="2025-06-20"
            />
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">
          Accounting Entries
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">
                No.
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Account *
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Party Type
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Party
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Debit
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Credit
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="text-[var(--card-foreground)]">
                  <input type="checkbox" className="mr-2" />
                  {entry.no}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    placeholder="Account"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-40"
                    value={entry.account}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].account = e.target.value;
                      setEntries(newEntries);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    placeholder="Party Type"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-32"
                    value={entry.partyType}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].partyType = e.target.value;
                      setEntries(newEntries);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    placeholder="Party"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-32"
                    value={entry.party}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].party = e.target.value;
                      setEntries(newEntries);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    type="number"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-20"
                    value={entry.debit}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].debit = parseFloat(e.target.value) || 0;
                      setEntries(newEntries);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Input
                    type="number"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-20"
                    value={entry.credit}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].credit =
                        parseFloat(e.target.value) || 0;
                      setEntries(newEntries);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      if (entries.length > 1) {
                        setEntries(entries.filter((_, i) => i !== index));
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
          <div className="text-[var(--card-foreground)]">
            Total Debit: ${totalDebit.toFixed(2)} | Total Credit: $
            {totalCredit.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Reference Number
            </label>
            <Input
              placeholder="Reference Number"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Multi Currency
            </label>
            <Checkbox id="multi-currency" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Reference Date
            </label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Bill No
            </label>
            <Input
              placeholder="Bill No"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Bill Date
            </label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Due Date
            </label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Pay To / Recd From
            </label>
            <Input
              placeholder="Pay To / Recd From"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Letter Head
            </label>
            <Input
              placeholder="Letter Head"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Print Heading
            </label>
            <Input
              placeholder="Print Heading"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Is Opening
            </label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-[var(--card-foreground)] block mb-1">
            User Remark
          </label>
          <Input
            placeholder="User Remark"
            className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-full"
          />
        </div>
      </div>
    </div>
  );
}
