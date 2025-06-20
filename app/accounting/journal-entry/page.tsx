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
import Link from "next/link";

const mockJournalEntries = [
  {
    id: "0123456789",
    title: "MB Bank - Cash",
    status: "Draft",
    entryType: "Journal Entry",
    company: "Ma Ma Beignet",
    totalDebit: "VND 50,000,000",
    referenceNumber: "1",
    lastUpdated: "3w",
  },
  {
    id: "Cash - WPL",
    title: "Cash - WPL",
    status: "Journal Entry",
    entryType: "Journal Entry",
    company: "Ma Ma Beignet",
    totalDebit: "$320.00",
    referenceNumber: "3x2fBGauvz",
    lastUpdated: "5m",
  },
  {
    id: "JE-2025-001",
    title: "Inventory Adjustment - Flour Purchase",
    status: "Submitted",
    entryType: "Inventory",
    company: "Ma Ma Beignet",
    totalDebit: "$2,500.00",
    referenceNumber: "INV-ADJ-001",
    lastUpdated: "1d",
  },
  {
    id: "JE-2025-002",
    title: "Salary Payment - Bakers",
    status: "Submitted",
    entryType: "Payroll",
    company: "Ma Ma Beignet",
    totalDebit: "$1,200.00",
    referenceNumber: "SAL-001",
    lastUpdated: "2d",
  },
  {
    id: "JE-2025-003",
    title: "Electricity Bill - Main Kitchen",
    status: "Draft",
    entryType: "Utility Expense",
    company: "Ma Ma Beignet",
    totalDebit: "$430.00",
    referenceNumber: "UTIL-0325",
    lastUpdated: "4h",
  },
  {
    id: "JE-2025-004",
    title: "Ingredient Purchase - Eggs, Sugar",
    status: "Submitted",
    entryType: "Purchase",
    company: "Ma Ma Beignet",
    totalDebit: "$860.00",
    referenceNumber: "PUR-3321",
    lastUpdated: "3d",
  },
  {
    id: "JE-2025-005",
    title: "Cash Deposit to Bank",
    status: "Journal Entry",
    entryType: "Bank Transfer",
    company: "Ma Ma Beignet",
    totalDebit: "$1,000.00",
    referenceNumber: "BANKDEP-7751",
    lastUpdated: "2w",
  },
  {
    id: "JE-2025-006",
    title: "Monthly Rent - Storefront",
    status: "Submitted",
    entryType: "Rent Expense",
    company: "Ma Ma Beignet",
    totalDebit: "$2,000.00",
    referenceNumber: "RENT-0425",
    lastUpdated: "6d",
  },
  {
    id: "JE-2025-007",
    title: "Mixer Machine Repair",
    status: "Journal Entry",
    entryType: "Maintenance",
    company: "Ma Ma Beignet",
    totalDebit: "$150.00",
    referenceNumber: "MNT-0909",
    lastUpdated: "1w",
  },
  {
    id: "JE-2025-008",
    title: "Advance Payment - Butter Supplier",
    status: "Draft",
    entryType: "Advance Payment",
    company: "Ma Ma Beignet",
    totalDebit: "$500.00",
    referenceNumber: "ADV-7890",
    lastUpdated: "20h",
  },
];

export default function JournalEntry() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          Journal Entry
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            List View
          </Button>
          <Link href="/accounting/add-journal-entry">
            <Button
              variant="default"
              className="bg-[var(--primary)] text-[var(--primary-foreground)]"
            >
              + Add Jorunal Entry
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              ID
            </label>
            <Input
              placeholder="ID"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Title
            </label>
            <Input
              placeholder="Title"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Entry Type
            </label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Entry Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="journal">Journal Entry</SelectItem>
                <SelectItem value="bank">Bank Entry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Company
            </label>
            <Input
              placeholder="Company"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              defaultValue="Ma Ma Beignet"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            Filter
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
            >
              Last Updated On
            </Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">
                ID
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Title
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Status
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Reference Number
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Total Debit
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                ID
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Last Updated On
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockJournalEntries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="text-[var(--card-foreground)]">
                  <input type="checkbox" className="mr-2" />
                  {entry.id}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {entry.title}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      entry.status === "Draft" || entry.status === "Cancelled"
                        ? "bg-red-500"
                        : entry.status === "Journal Entry"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {entry.status}
                  </span>
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {entry.referenceNumber}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {entry.totalDebit}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {entry.id}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {entry.lastUpdated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-[var(--card-foreground)]">20 of 29</span>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
              size="sm"
            >
              20
            </Button>
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
              size="sm"
            >
              100
            </Button>
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
              size="sm"
            >
              500
            </Button>
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
              size="sm"
            >
              2500
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
