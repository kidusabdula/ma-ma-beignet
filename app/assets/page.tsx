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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockAssets = [
  {
    assetName: "Oven 1",
    status: "Submitted",
    assetCategory: "Ovens",
    location: "L1",
    id: "ACC-ASS-2025-001",
    lastUpdated: "10h",
  },
  {
    assetName: "Mixer 2",
    status: "Submitted",
    assetCategory: "Mixers",
    location: "L2",
    id: "ACC-ASS-2025-002",
    lastUpdated: "10h",
  },
  {
    assetName: "Table 1",
    status: "Draft",
    assetCategory: "Furniture",
    location: "L3",
    id: "ACC-ASS-2025-003",
    lastUpdated: "1w",
  },
  {
    assetName: "Display Case",
    status: "Cancelled",
    assetCategory: "Display",
    location: "L4",
    id: "ACC-ASS-2024-001",
    lastUpdated: "1w",
  },
  {
    assetName: "Mixer 1",
    status: "Out of Order",
    assetCategory: "Mixers",
    location: "L5",
    id: "ACC-ASS-2025-004",
    lastUpdated: "3w",
  },
  // Add more mock data as needed
];

export default function Assets() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Asset</h1>
        <div className="space-x-2">
          <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">
            List View
          </Button>
          <Button variant="default" className="bg-[var(--primary)] text-[var(--primary-foreground)]">
            + Add Asset
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Filter By</label>
            <Select>
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="ID" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="assetName">Asset Name</SelectItem>
                <SelectItem value="assetCategory">Asset Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Assigned To</label>
            <Input
              placeholder="Assigned To"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Created By</label>
            <Input
              placeholder="Created By"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Tags</label>
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
              Filter
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
              <TableHead className="text-[var(--card-foreground)]">Asset Name</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Status</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Asset Category</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Location</TableHead>
              <TableHead className="text-[var(--card-foreground)]">ID</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Last Updated On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAssets.map((asset, index) => (
              <TableRow key={index}>
                <TableCell className="text-[var(--card-foreground)]">
                  <input type="checkbox" className="mr-2" />
                  {asset.assetName}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      asset.status === "Cancelled" || asset.status === "Out of Order"
                        ? "bg-red-500"
                        : asset.status === "Draft"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {asset.status}
                  </span>
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {asset.assetCategory}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {asset.location}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {asset.id}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {asset.lastUpdated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-[var(--card-foreground)]">9 of 9</span>
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