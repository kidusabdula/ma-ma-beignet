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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Link from "next/link";

const initialCustomers = [
  {
    id: "BEIGNET-001",
    name: "Addis Cravings Café",
    status: "Enabled",
    group: "Café",
    territory: "Piassa",
    lastUpdated: "3d",
  },
  {
    id: "BEIGNET-002",
    name: "Morning Injera Bakery",
    status: "Enabled",
    group: "Bakery",
    territory: "Bole",
    lastUpdated: "3d",
  },
  {
    id: "BEIGNET-003",
    name: "Pastry Haven Ethiopia",
    status: "Enabled",
    group: "Pastry Shop",
    territory: "Kazanchis",
    lastUpdated: "3d",
  },
  {
    id: "BEIGNET-004",
    name: "Flour & Spice Kitchen",
    status: "Enabled",
    group: "Bakery",
    territory: "Gullele",
    lastUpdated: "3d",
  },
  {
    id: "BEIGNET-005",
    name: "Sweet Rush Deli",
    status: "Enabled",
    group: "Deli",
    territory: "Megenagna",
    lastUpdated: "3d",
  },
  {
    id: "BEIGNET-006",
    name: "Gondar Traditional Bakery",
    status: "Enabled",
    group: "Ethnic Bakery",
    territory: "Gondar",
    lastUpdated: "1w",
  },
  {
    id: "BEIGNET-007",
    name: "Crusty Corner Injera",
    status: "Enabled",
    group: "Bakery",
    territory: "Addis Ketema",
    lastUpdated: "1w",
  },
  {
    id: "BEIGNET-008",
    name: "Dough & Mocha Café",
    status: "Enabled",
    group: "Café",
    territory: "CMC",
    lastUpdated: "1w",
  },
  {
    id: "BEIGNET-009",
    name: "Frosted Joy Addis",
    status: "Enabled",
    group: "Pastry Shop",
    territory: "Arat Kilo",
    lastUpdated: "1m",
  },
  {
    id: "BEIGNET-010",
    name: "Bread Basket Alem Gena",
    status: "Enabled",
    group: "Bakery",
    territory: "Alem Gena",
    lastUpdated: "1m",
  },
];


export default function CustomerPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    group: "",
    territory: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    const filtered = initialCustomers.filter((customer) =>
      (field === "name" ? customer.name.toLowerCase().includes(value.toLowerCase()) : true) &&
      (field === "status" ? customer.status === value : true) &&
      (field === "group" ? customer.group.toLowerCase().includes(value.toLowerCase()) : true) &&
      (field === "territory" ? customer.territory.toLowerCase().includes(value.toLowerCase()) : true)
    );
    setCustomers(filtered);
  };

  const addCustomer = () => {
    // Logic to navigate to add customer form (to be implemented)
    console.log("Navigate to add customer form");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Customers</h1>
        <div className="space-x-2">
          <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">List View</Button>
          <Link href="crm/add-customer"><Button variant="default" className="bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={addCustomer}>Add Customer</Button></Link>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Customer Name</label>
            <Input
              placeholder="Customer Name"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Enabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enabled">Enabled</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Customer Group</label>
            <Input
              placeholder="Customer Group"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.group}
              onChange={(e) => handleFilterChange("group", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Territory</label>
            <Input
              placeholder="Territory"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.territory}
              onChange={(e) => handleFilterChange("territory", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">ID</label>
            <Input
              placeholder="ID"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.name} // Reusing name filter for ID simplicity
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[var(--card-foreground)] w-4">
                  <input type="checkbox" className="mr-2" />
                </TableHead>
                <TableHead className="text-[var(--card-foreground)]">Customer Name</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Status</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Customer Group</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Territory</TableHead>
                <TableHead className="text-[var(--card-foreground)]">ID</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Last Updated On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell className="text-[var(--card-foreground)]">
                    <input type="checkbox" className="mr-2" />
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{customer.name}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">{customer.status}</span>
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{customer.group}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{customer.territory}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{customer.id}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{customer.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4 text-[var(--card-foreground)]">
          <span>20 of 121</span>
          <div className="space-x-2">
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">20</Button>
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">100</Button>
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">500</Button>
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">2500</Button>
          </div>
        </div>
      </div>
    </div>
  );
}