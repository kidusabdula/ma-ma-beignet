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
import Image from "next/image";
import { useRouter } from "next/navigation";

// Image URLs for each item (using Unsplash and other public sources)
const itemImages = {
  "Beignet Mix": "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Croissant Dough": "https://images.unsplash.com/photo-1589010588553-46e7c21788?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Sugar Glaze": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Chocolate Filling": "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Almond Paste": "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Baguette Flour": "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Pastry Cream": "https://images.unsplash.com/photo-1562440499-64c9a111f713?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Brioche Dough": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Fruit Jam": "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Sourdough Starter": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
};

const initialItems = [
  { name: "Beignet Mix", status: "Enabled", group: "Flour Products", id: "BAKE-001", lastUpdated: "3d" },
  { name: "Croissant Dough", status: "Enabled", group: "Dough Products", id: "BAKE-002", lastUpdated: "3d" },
  { name: "Sugar Glaze", status: "Enabled", group: "Toppings", id: "BAKE-003", lastUpdated: "3d" },
  { name: "Chocolate Filling", status: "Enabled", group: "Fillings", id: "BAKE-004", lastUpdated: "3d" },
  { name: "Almond Paste", status: "Enabled", group: "Fillings", id: "BAKE-005", lastUpdated: "3d" },
  { name: "Baguette Flour", status: "Enabled", group: "Flour Products", id: "BAKE-006", lastUpdated: "1w" },
  { name: "Pastry Cream", status: "Enabled", group: "Toppings", id: "BAKE-007", lastUpdated: "1w" },
  { name: "Brioche Dough", status: "Enabled", group: "Dough Products", id: "BAKE-008", lastUpdated: "1w" },
  { name: "Fruit Jam", status: "Enabled", group: "Fillings", id: "BAKE-009", lastUpdated: "1m" },
  { name: "Sourdough Starter", status: "Enabled", group: "Flour Products", id: "BAKE-010", lastUpdated: "1m" },
];

export default function ItemPage() {
  const [items, setItems] = useState(initialItems);
  const [filters, setFilters] = useState({
    name: "",
    group: "",
    variantOf: "",
    status: "all",
  });
  const router = useRouter();

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    const filtered = initialItems.filter((item) =>
      (newFilters.name ? item.name.toLowerCase().includes(newFilters.name.toLowerCase()) : true) &&
      (newFilters.group ? item.group.toLowerCase().includes(newFilters.group.toLowerCase()) : true) &&
      (newFilters.status !== "all" ? item.status === newFilters.status : true)
    );
    setItems(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Items</h1>
        <div className="space-x-2">
          <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">List View</Button>
          <Button
            variant="default"
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
            onClick={() => router.push("add-item")}
          >
            Add Item
          </Button>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Item Name</label>
            <Input
              placeholder="Item Name"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Item Group</label>
            <Input
              placeholder="Item Group"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.group}
              onChange={(e) => handleFilterChange("group", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Variants Of</label>
            <Input
              placeholder="Variants Of"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.variantOf}
              onChange={(e) => handleFilterChange("variantOf", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Enabled">Enabled</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">ID</label>
            <Input
              placeholder="ID"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.name}
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
                <TableHead className="text-[var(--card-foreground)]">Item</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Status</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Item Group</TableHead>
                <TableHead className="text-[var(--card-foreground)]">ID</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Last Updated On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-[var(--card-foreground)]">
                    <input type="checkbox" className="mr-2" />
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <Image
                          className="rounded-full object-cover"
                          src={itemImages[item.name as keyof typeof itemImages]}
                          alt={item.name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">{item.status}</span>
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{item.group}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{item.id}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{item.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4 text-[var(--card-foreground)]">
          <span>Showing {items.length} of {initialItems.length} items</span>
          <div className="space-x-2">
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">Filters</Button>
          </div>
        </div>
      </div>
    </div>
  );
}