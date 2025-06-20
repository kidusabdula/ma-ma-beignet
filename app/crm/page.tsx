"use client";

import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const leadData = [
  { date: "28-05-2025", leads: 1 },
  { date: "06-06-2025", leads: 2 },
  { date: "20-06-2025", leads: 1 },
  { date: "04-06-2025", leads: 1 },
  { date: "18-06-2025", leads: 0 },
  { date: "01-06-2025", leads: 0 },
  { date: "15-06-2025", leads: 0 },
  { date: "22-06-2025", leads: 0 },
];

const opportunityData = [
  { date: "28-05-2025", opportunities: 0 },
  { date: "06-06-2025", opportunities: 0 },
  { date: "20-06-2025", opportunities: 1 },
  { date: "04-06-2025", opportunities: 0 },
  { date: "18-06-2025", opportunities: 0 },
  { date: "01-06-2025", opportunities: 0 },
  { date: "15-06-2025", opportunities: 0 },
  { date: "22-06-2025", opportunities: 0 },
];

export default function CRMDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">CRM Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
          <h3 className="text-[var(--card-foreground)] mb-2">New Lead (Last Month)</h3>
          <p className="text-[var(--card-foreground)]">0 <span className="text-green-500">0% since yesterday</span></p>
        </div>
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
          <h3 className="text-[var(--card-foreground)] mb-2">New Opportunity (Last Month)</h3>
          <p className="text-[var(--card-foreground)]">0</p>
        </div>
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
          <h3 className="text-[var(--card-foreground)] mb-2">Won Opportunity (Last Month)</h3>
          <p className="text-[var(--card-foreground)]">0</p>
        </div>
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
          <h3 className="text-[var(--card-foreground)] mb-2">Open Opportunity</h3>
          <p className="text-[var(--card-foreground)]">0</p>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[var(--card-foreground)]">Incoming Leads</h3>
          <div className="space-x-2">
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">Last Quarter</Button>
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">Weekly</Button>
          </div>
        </div>
        <p className="text-[var(--card-foreground)] mb-2">Last synced just now</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={leadData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
            <Legend />
            <Line type="monotone" dataKey="leads" stroke="#ff69b4" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[var(--card-foreground)]">Opportunity Trends</h3>
          <div className="space-x-2">
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">Last Quarter</Button>
            <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">Weekly</Button>
          </div>
        </div>
        <p className="text-[var(--card-foreground)] mb-2">Last synced just now</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={opportunityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
            <Legend />
            <Line type="monotone" dataKey="opportunities" stroke="#ff69b4" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}