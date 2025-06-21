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

const initialLeads = [
  {
    id: "CRM-LEAD-2025-001",
    title: "Kidist Mekonnen",
    status: "Open",
    jobTitle: "Procurement Officer",
    organization: "Lalibela Bread Factory",
    territory: "Addis Ababa",
    lastUpdated: "2d",
  },
  {
    id: "CRM-LEAD-2025-002",
    title: "Abel Girma",
    status: "Open",
    jobTitle: "Operations Manager",
    organization: "Sholla Pastries",
    territory: "Bole",
    lastUpdated: "1w",
  },
  {
    id: "CRM-LEAD-2025-003",
    title: "Selam Tadesse",
    status: "Contacted",
    jobTitle: "Cafe Manager",
    organization: "Savor Café",
    territory: "Kazanchis",
    lastUpdated: "3d",
  },
  {
    id: "CRM-LEAD-2025-004",
    title: "Mulugeta Bekele",
    status: "Open",
    jobTitle: "Store Owner",
    organization: "Bahir Dar Mini Mart",
    territory: "Bahir Dar",
    lastUpdated: "5d",
  },
  {
    id: "CRM-LEAD-2025-005",
    title: "Rahel Yilma",
    status: "Qualified",
    jobTitle: "Head of Supply",
    organization: "Tena Bakery",
    territory: "Gullele",
    lastUpdated: "1d",
  },
  {
    id: "CRM-LEAD-2025-006",
    title: "Tesfaye Ayalew",
    status: "Open",
    jobTitle: "Wholesale Buyer",
    organization: "Addis Baking Supply",
    territory: "Kality",
    lastUpdated: "4h",
  },
  {
    id: "CRM-LEAD-2025-007",
    title: "Liya Habte",
    status: "Open",
    jobTitle: "Receptionist",
    organization: "Wheat & Honey Café",
    territory: "Summit",
    lastUpdated: "3d",
  },
  {
    id: "CRM-LEAD-2025-008",
    title: "Yonas Alemu",
    status: "Lost",
    jobTitle: "General Manager",
    organization: "Dessie Bread House",
    territory: "Dessie",
    lastUpdated: "1w",
  },
];


export default function LeadPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    organization: "",
    territory: "",
    jobTitle: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    // Apply filtering logic here (e.g., filter leads based on input)
    const filtered = initialLeads.filter((lead) =>
      (field === "title" ? lead.title.toLowerCase().includes(value.toLowerCase()) : true) &&
      (field === "status" ? lead.status === value : true) &&
      (field === "organization" ? lead.organization.toLowerCase().includes(value.toLowerCase()) : true) &&
      (field === "territory" ? lead.territory.toLowerCase().includes(value.toLowerCase()) : true)
    );
    setLeads(filtered);
  };

  const addLead = () => {
    // Logic to navigate to add lead form (to be implemented)
    console.log("Navigate to add lead form");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Leads</h1>
        <div className="space-x-2">
          <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">List View</Button>
          <Button variant="default" className="bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={addLead}>Add Lead</Button>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Job Title</label>
            <Input
              placeholder="Job Title"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.jobTitle}
              onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Open" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Organization Name</label>
            <Input
              placeholder="Organization Name"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.organization}
              onChange={(e) => handleFilterChange("organization", e.target.value)}
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
              value={filters.title}
              onChange={(e) => handleFilterChange("title", e.target.value)}
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
                <TableHead className="text-[var(--card-foreground)]">Title</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Status</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Job Title</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Organization Name</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Territory</TableHead>
                <TableHead className="text-[var(--card-foreground)]">ID</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Last Updated On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead, index) => (
                <TableRow key={index}>
                  <TableCell className="text-[var(--card-foreground)]">
                    <input type="checkbox" className="mr-2" />
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{lead.title}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{lead.status}</span>
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{lead.jobTitle}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{lead.organization}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{lead.territory}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{lead.id}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{lead.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4 text-[var(--card-foreground)]">
          <span>2 of 2</span>
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