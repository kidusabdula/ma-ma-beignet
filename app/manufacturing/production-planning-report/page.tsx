// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const mockProductionPlans = [
  {
    id: "SAL-ORD-001",
    itemCode: "368F",
    itemName: "Lower 368F",
    warehouse: "Stores - WPL",
    order: 1.000,
    available: 1.000,
    deliveryDate: "16-02-20",
    rawMaterial: "368F",
    rawMaterialWarehouse: "Lower 368F",
    required: 1.000,
    allocated: 1.000,
  },
  {
    id: "SAL-ORD-002",
    itemCode: "Samsung S24",
    itemName: "Samsung S24 Ultra",
    warehouse: "Stores - WPL",
    order: 20.000,
    available: 0.000,
    deliveryDate: "08-04-20",
    rawMaterial: "Samsung S24",
    rawMaterialWarehouse: "Samsung S24 Ultra",
    required: 20.000,
    allocated: 20.000,
  },
  {
    id: "SAL-ORD-003",
    itemCode: "368F",
    itemName: "Lower 368F",
    warehouse: "Stores - WPL",
    order: 1.000,
    available: 1.000,
    deliveryDate: "24-06-20",
    rawMaterial: "368F",
    rawMaterialWarehouse: "Lower 368F",
    required: 1.000,
    allocated: 1.000,
  },
  {
    id: "SAL-ORD-007",
    itemCode: "Table",
    itemName: "Table",
    warehouse: "Stores - WPL",
    order: 0.000,
    available: 0.000,
    deliveryDate: "Ao khoac",
    rawMaterial: "Ao khoac",
    rawMaterialWarehouse: "Stores - WPL",
    required: 10.000,
    allocated: 10.000,
  },
  // Add more mock data as needed
];

export default function ProductionPlanningReport() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          Production Planning Report
        </h1>
      </div>

      {/* Filters Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Company</label>
            <Input
              placeholder="Company"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              defaultValue="Ma Ma Beignet"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Sales Order</label>
            <Input
              placeholder="Sales Order"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Document Name</label>
            <Input
              placeholder="Document Name"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Raw Material Warehouse</label>
            <Input
              placeholder="Raw Material Warehouse"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              defaultValue="Stores - WPL"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Delivery Date</label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox id="include-sub-assembly" />
            <label
              htmlFor="include-sub-assembly"
              className="text-[var(--card-foreground)] text-sm"
            >
              Include Sub-assembly Raw
            </label>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">ID</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Item Code</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Item Name</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Warehouse</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Order</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Available</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Delivery Date</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Raw Material</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Raw Material Warehouse</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Required</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Allocated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProductionPlans.map((plan, index) => (
              <TableRow key={index}>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.id}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.itemCode}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.itemName}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.warehouse}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.order}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.available}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.deliveryDate}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.rawMaterial}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.rawMaterialWarehouse}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.required}
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  {plan.allocated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}