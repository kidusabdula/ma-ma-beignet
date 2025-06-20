"use client";

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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const initialSalesData = [
  { customer: 1, name: "Sweet Cravings Café", jan: 5000, feb: 5500, mar: 6000, apr: 6200, may: 5800, jun: 6500, jul: 7000, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 2, name: "Morning Dough Bakery", jan: 4500, feb: 4800, mar: 5200, apr: 5000, may: 5100, jun: 5300, jul: 5600, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 3, name: "Pastry Haven", jan: 3000, feb: 3200, mar: 3400, apr: 3500, may: 3600, jun: 3700, jul: 3800, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 4, name: "Golden Crust Bakers", jan: 6200, feb: 6300, mar: 6400, apr: 6500, may: 6400, jun: 6600, jul: 6700, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 5, name: "Rolling Pin Deli", jan: 2800, feb: 2900, mar: 3100, apr: 3200, may: 3000, jun: 3300, jul: 3400, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 6, name: "Crumb & Co.", jan: 4100, feb: 4300, mar: 4500, apr: 4600, may: 4700, jun: 4800, jul: 4900, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 7, name: "DoughRise Cafe", jan: 5200, feb: 5400, mar: 5600, apr: 5800, may: 6000, jun: 6200, jul: 6400, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 8, name: "Sugar & Spice", jan: 3700, feb: 3900, mar: 4100, apr: 4200, may: 4400, jun: 4500, jul: 4700, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 9, name: "Butter Bliss", jan: 6100, feb: 6200, mar: 6300, apr: 6400, may: 6500, jun: 6600, jul: 6700, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 10, name: "Whisk Wonders", jan: 4900, feb: 5000, mar: 5200, apr: 5300, may: 5400, jun: 5600, jul: 5800, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 11, name: "The Muffin Stop", jan: 3300, feb: 3400, mar: 3500, apr: 3600, may: 3700, jun: 3800, jul: 3900, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 12, name: "Flour Power", jan: 5600, feb: 5800, mar: 5900, apr: 6000, may: 6100, jun: 6200, jul: 6300, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
  { customer: 13, name: "Tart & Toast", jan: 2700, feb: 2800, mar: 2900, apr: 3100, may: 3200, jun: 3300, jul: 3400, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
];


// Prepare data for the analytics chart
const chartData = [
  { month: 'Jan', total: 12500 },
  { month: 'Feb', total: 13500 },
  { month: 'Mar', total: 14600 },
  { month: 'Apr', total: 14700 },
  { month: 'May', total: 14500 },
  { month: 'Jun', total: 15500 },
  { month: 'Jul', total: 16400 },
  { month: 'Aug', total: 0 },
  { month: 'Sep', total: 0 },
  { month: 'Oct', total: 0 },
  { month: 'Nov', total: 0 },
  { month: 'Dec', total: 0 },
];

export default function SalesAnalyticsPage() {
  const [salesData, setSalesData] = useState(initialSalesData);
  const [filters, setFilters] = useState({
    customer: "",
    invoice: "",
    value: "",
    startDate: "01-01-2025",
    endDate: "31-12-2025",
    company: "Ma Ma Beignet",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    // Apply filtering logic here (e.g., filter sales data based on input)
    const filtered = initialSalesData.filter((sale) =>
      (field === "customer" ? sale.name.toLowerCase().includes(value.toLowerCase()) : true) &&
      (field === "invoice" ? true : true) && // Placeholder for invoice filter
      (field === "value" ? true : true) // Placeholder for value filter
    );
    setSalesData(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Sales Analytics</h1>
      </div>

      {/* Added Analytics Graph */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h2 className="text-lg font-semibold text-[var(--card-foreground)] mb-4">Monthly Sales Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
              <XAxis 
                dataKey="month" 
                stroke="#ccc" 
                tick={{ fill: 'var(--card-foreground)', opacity: 0.7 }}
              />
              <YAxis 
                stroke="#ccc" 
                tick={{ fill: 'var(--card-foreground)', opacity: 0.7 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid #00FFFF',
                  borderRadius: '6px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Total Sales"
                stroke="#00FFFF" 
                strokeWidth={2}
                activeDot={{ r: 6, stroke: "#00FFFF", strokeWidth: 2, fill: "#000" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Customer</label>
            <Input
              placeholder="Customer"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.customer}
              onChange={(e) => handleFilterChange("customer", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Sales Invoice</label>
            <Input
              placeholder="Sales Invoice"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.invoice}
              onChange={(e) => handleFilterChange("invoice", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Value</label>
            <Input
              placeholder="Value"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.value}
              onChange={(e) => handleFilterChange("value", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">From</label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">To</label>
            <Input
              type="date"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Company</label>
            <Select
              value={filters.company}
              onValueChange={(value) => handleFilterChange("company", value)}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Ma Ma Beignet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ma Ma Beignet">Ma Ma Beignet</SelectItem>
                <SelectItem value="Wind Power LLC">Wind Power LLC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[var(--card-foreground)] w-4">
                  <input type="checkbox" className="mr-2" />
                </TableHead>
                <TableHead className="text-[var(--card-foreground)]">Customer</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Customer Name</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Jan 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Feb 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Mar 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Apr 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">May 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Jun 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Jul 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Aug 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Sep 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Oct 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Nov 2025</TableHead>
                <TableHead className="text-[var(--card-foreground)]">Dec 2025</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell className="text-[var(--card-foreground)]">
                    <input type="checkbox" className="mr-2" />
                  </TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.customer}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.name}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.jan.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.feb.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.mar.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.apr.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.may.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.jun.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.jul.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.aug.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.sep.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.oct.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.nov.toLocaleString()}</TableCell>
                  <TableCell className="text-[var(--card-foreground)]">{sale.dec.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4 text-[var(--card-foreground)] text-xs">
          <span>For comparison, use {'>='} 0 or {'<='} 0.24, for ranges, use 0 for values between 5 & 10)</span>
        </div>
      </div>
    </div>
  );
}