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

const initialRequests = [
  { id: "REQ-001", item: "Flour (50kg)", requestedBy: "John Doe", status: "Pending", lastUpdated: "2d" },
  { id: "REQ-002", item: "Sugar (25kg)", requestedBy: "Jane Smith", status: "Approved", lastUpdated: "2d" },
  { id: "REQ-003", item: "Butter (10kg)", requestedBy: "John Doe", status: "Pending", lastUpdated: "2d" },
  { id: "REQ-004", item: "Eggs (100ct)", requestedBy: "Alice Brown", status: "Approved", lastUpdated: "3d" },
  { id: "REQ-005", item: "Chocolate Chips (5kg)", requestedBy: "Jane Smith", status: "Pending", lastUpdated: "3d" },
  { id: "REQ-006", item: "Yeast (2kg)", requestedBy: "John Doe", status: "Approved", lastUpdated: "1w" },
  { id: "REQ-007", item: "Vanilla Extract (1L)", requestedBy: "Alice Brown", status: "Pending", lastUpdated: "1w" },
  { id: "REQ-008", item: "Almond Flour (10kg)", requestedBy: "Jane Smith", status: "Approved", lastUpdated: "1w" },
  { id: "REQ-009", item: "Fruit Jam (5kg)", requestedBy: "John Doe", status: "Pending", lastUpdated: "1m" },
  { id: "REQ-010", item: "Salt (5kg)", requestedBy: "Alice Brown", status: "Approved", lastUpdated: "1m" },
];

export default function MaterialRequestPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [filters, setFilters] = useState({
    id: "",
    item: "",
    requestedBy: "",
    status: "all", // Changed from empty string to "all"
  });

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    const filtered = initialRequests.filter((request) =>
      (newFilters.id ? request.id.toLowerCase().includes(newFilters.id.toLowerCase()) : true) &&
      (newFilters.item ? request.item.toLowerCase().includes(newFilters.item.toLowerCase()) : true) &&
      (newFilters.requestedBy ? request.requestedBy.toLowerCase().includes(newFilters.requestedBy.toLowerCase()) : true) &&
      (newFilters.status !== "all" ? request.status === newFilters.status : true)
    );
    setRequests(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Material Requests</h1>
        <div className="space-x-2">
          <Button variant="default" className="bg-[var(--primary)] text-[var(--primary-foreground)]">New Request</Button>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Request ID</label>
            <Input
              placeholder="Request ID"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.id}
              onChange={(e) => handleFilterChange("id", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Item Name</label>
            <Input
              placeholder="Item Name"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.item}
              onChange={(e) => handleFilterChange("item", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Requested By</label>
            <Input
              placeholder="Requested By"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.requestedBy}
              onChange={(e) => handleFilterChange("requestedBy", e.target.value)}
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div></div> {/* Placeholder for symmetry */}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[var(--card-foreground)] w-4">
                  <input type="checkbox" className="mr-2" />
                </TableHead>
                <TableHead className="text-[var(--card-foreground)]">Request ID</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Item Name</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Requested By</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Status</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Last Updated On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="text-[var(--card-foreground)]">
                    <input type="checkbox" className="mr-2" />
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{request.id}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{request.item}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{request.requestedBy}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">
                    <span className={`${request.status === "Pending" ? "bg-yellow-500" : "bg-green-500"} text-white px-2 py-1 rounded-full text-xs`}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{request.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4 text-[var(--card-foreground)]">
          <span>Showing {requests.length} of {initialRequests.length} requests</span>
          <div className="space-x-2">
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">20</Button>
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">100</Button>
          </div>
        </div>
      </div>
    </div>
  );
}