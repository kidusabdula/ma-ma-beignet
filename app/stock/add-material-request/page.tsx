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

// Load existing material requests from localStorage or initialize
const loadMaterialRequests = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("materialRequests");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

export default function AddMaterialRequest() {
  const [items, setItems] = useState([
    {
      no: 1,
      item: "",
      quantity: 0,
      unit: "kg",
      sourceWarehouse: "Stores - WPL",
      destinationWarehouse: "Bakery - WPL",
      urgency: "Normal",
    },
  ]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [requestNotes, setRequestNotes] = useState("");
  const [status, setStatus] = useState("Pending");
  const [materialRequests, setMaterialRequests] = useState(loadMaterialRequests);

  const addRow = () => {
    setItems([
      ...items,
      {
        no: items.length + 1,
        item: "",
        quantity: 0,
        unit: "kg",
        sourceWarehouse: "Stores - WPL",
        destinationWarehouse: "Bakery - WPL",
        urgency: "Normal",
      },
    ]);
  };

  const addMultiple = () => {
    setItems([
      ...items,
      ...Array(5).map((_, i) => ({
        no: items.length + i + 1,
        item: "",
        quantity: 0,
        unit: "kg",
        sourceWarehouse: "Stores - WPL",
        destinationWarehouse: "Bakery - WPL",
        urgency: "Normal",
      })),
    ]);
  };

  // Update totals based on items
  useEffect(() => {
    const newTotalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(newTotalQuantity);
  }, [items]);

  // Save material request to localStorage
  const handleSave = () => {
    const newRequest = {
      id: `MAT-REQ-${Date.now()}`,
      items,
      totalQuantity,
      requestNotes,
      status,
      requestedBy: "Amanuel Tadesse", // Default for demo
      requestedDate: new Date().toISOString().split("T")[0],
      lastUpdated: "0m",
    };
    const updatedRequests = [...materialRequests, newRequest];
    setMaterialRequests(updatedRequests);
    if (typeof window !== "undefined") {
      localStorage.setItem("materialRequests", JSON.stringify(updatedRequests));
    }
    console.log("Material request saved:", newRequest);
    alert("Material request saved! Check localStorage or future integration for details.");
  };

  // Sync with localStorage on mount
  useEffect(() => {
    const handleStorageChange = () => setMaterialRequests(loadMaterialRequests());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          New Material Request <span className="text-red-600 text-sm font-bold">Not Saved</span>
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            Import Request
          </Button>
          <Button
            variant="default"
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Tabs/Sections */}
      <div className="flex space-x-4 text-[var(--card-foreground)]">
        <span className="cursor-pointer">Request Details</span>
        <span className="cursor-pointer">Items</span>
        <span className="cursor-pointer">Notes</span>
      </div>

      {/* Request Details Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Request Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Requested By *</label>
            <Input
              value="Amanuel Tadesse" // Default for demo
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              readOnly
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Request Date *</label>
            <Input
              type="date"
              value={new Date().toISOString().split("T")[0]}
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Status</label>
            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Requested Items</h3>
        <div className="flex justify-between items-center mb-4">
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
          <Checkbox id="update-stock" defaultChecked />
          <label
            htmlFor="update-stock"
            className="text-[var(--card-foreground)] text-sm ml-1"
          >
            Update Stock on Approval
          </label>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[var(--card-foreground)]">No.</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Quantity</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Unit</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Source Warehouse</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Destination Warehouse</TableHead>
              <TableHead className="text-[var(--card-foreground)]">Urgency</TableHead>
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
                    placeholder="e.g., Flour"
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
                  <Input
                    type="number"
                    className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-20"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].quantity = parseFloat(e.target.value) || 0;
                      setItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Select
                    value={item.unit}
                    onValueChange={(value) => {
                      const newItems = [...items];
                      newItems[index].unit = value;
                      setItems(newItems);
                    }}
                  >
                    <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="liters">liters</SelectItem>
                      <SelectItem value="units">units</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="Main Warehouse - ADD">Main Warehouse - ADD</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Select
                    value={item.destinationWarehouse}
                    onValueChange={(value) => {
                      const newItems = [...items];
                      newItems[index].destinationWarehouse = value;
                      setItems(newItems);
                    }}
                  >
                    <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                      <SelectValue placeholder="Destination Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bakery - WPL">Bakery - WPL</SelectItem>
                      <SelectItem value="Retail Outlet - ADD">Retail Outlet - ADD</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-[var(--card-foreground)]">
                  <Select
                    value={item.urgency}
                    onValueChange={(value) => {
                      const newItems = [...items];
                      newItems[index].urgency = value;
                      setItems(newItems);
                    }}
                  >
                    <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                      <SelectValue placeholder="Select Urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
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
        <div className="mt-4">
          <label className="text-[var(--card-foreground)] block mb-1">Total Quantity</label>
          <Input
            type="number"
            className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-40"
            value={totalQuantity}
            readOnly
          />
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Additional Notes</h3>
        <Input
          value={requestNotes}
          onChange={(e) => setRequestNotes(e.target.value)}
          placeholder="e.g., Priority for fresh flour delivery"
          className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-full"
        />
      </div>
    </div>
  );
}