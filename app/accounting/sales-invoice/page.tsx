// import Layout from "@/components/Layout";
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

const mockInvoices = [
  {
    title: "Nguyễn Văn A",
    status: "Overdue",
    grandTotal: "$2,000.00",
    id: "ACC-SINV-2025-001",
    lastUpdated: "2m",
    customer: "Bakery Customer 1",
    company: "Ma Ma Beignet",
  },
  {
    title: "Alemu Tesfaye",
    status: "Paid",
    grandTotal: "$1,250.00",
    id: "ACC-SINV-2025-002",
    lastUpdated: "5h",
    customer: "Injera Wholesale Ltd.",
    company: "Ethiopia Foods PLC",
  },
  {
    title: "Sara Johnson",
    status: "Unpaid",
    grandTotal: "$3,740.00",
    id: "ACC-SINV-2025-003",
    lastUpdated: "1d",
    customer: "Fresh Bakes Inc.",
    company: "Ma Ma Beignet",
  },
  {
    title: "Mohammed Abdullahi",
    status: "Partially Paid",
    grandTotal: "$850.00",
    id: "ACC-SINV-2025-004",
    lastUpdated: "3d",
    customer: "Cafe Addis",
    company: "Ma Ma Beignet",
  },
  {
    title: "Jane Doe",
    status: "Draft",
    grandTotal: "$4,520.00",
    id: "ACC-SINV-2025-005",
    lastUpdated: "7h",
    customer: "Golden Pastry Ltd.",
    company: "Ma Ma Beignet",
  },
  {
    title: "Carlos Rivera",
    status: "Cancelled",
    grandTotal: "$1,100.00",
    id: "ACC-SINV-2025-006",
    lastUpdated: "2w",
    customer: "Rivera Coffee",
    company: "Ma Ma Beignet",
  },
  {
    title: "Fatima Al-Mansour",
    status: "Overdue",
    grandTotal: "$2,980.00",
    id: "ACC-SINV-2025-007",
    lastUpdated: "4d",
    customer: "Middle East Markets",
    company: "Ma Ma Beignet",
  },
  {
    title: "John Smith",
    status: "Paid",
    grandTotal: "$620.00",
    id: "ACC-SINV-2025-008",
    lastUpdated: "15m",
    customer: "Everyday Bakes",
    company: "Ma Ma Beignet",
  },
];

export default function SalesInvoice() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          Sales Invoice
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            List View
          </Button>
          <Link href="/accounting/add-sales-invoice">
            <Button
              variant="default"
              className="bg-[var(--primary)] text-[var(--primary-foreground)]"
            >
              + Add Sales Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Filter By
            </label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="%ACC-SINV-2025" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Assigned To
            </label>
            <Input
              placeholder="Assigned To"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Created By
            </label>
            <Input
              placeholder="Created By"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">
              Tags
            </label>
            <Input
              placeholder="Tags"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            Edit Filters
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-[var(--border)] text-[var(--card-foreground)]"
            >
              Filters <span className="ml-1">2</span>
            </Button>
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
                Title
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Status
              </TableHead>
              <TableHead className="text-[var(--card-foreground)]">
                Grand Total
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
            {mockInvoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell className="text-[var(--card-foreground)]">
                  {invoice.title}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      invoice.status === "Overdue"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {invoice.grandTotal}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {invoice.id}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {invoice.lastUpdated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-[var(--card-foreground)]">1 of 1</span>
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
