"use client";

import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

const wonOpportunitiesData = [
  { date: "Jun 2024", won: 0 },
  { date: "Aug 2024", won: 1 },
  { date: "Oct 2024", won: 2 },
  { date: "Dec 2024", won: 3 },
  { date: "Feb 2025", won: 4 },
  { date: "Apr 2025", won: 3 },
  { date: "Jun 2025", won: 5 },
];

const territoryData = [
  { name: "All Territories", value: 14 },
  { name: "Rest of The World", value: 5 },
  { name: "United States", value: 3 },
];

const campaignData = [
  { name: "All Campaigns", value: 15 },
];

const COLORS = ["#00FFFF", "#FF69B4", "#00CED1", "#7B68EE", "#FF8C00"];

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("leads");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--background)]">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full h-10 w-10 bg-[var(--primary)] opacity-75"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-6 bg-[var(--background)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--card-foreground)] bg-clip-text">
          CRM Dashboard
        </h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "leads" ? "default" : "outline"}
            onClick={() => setActiveTab("leads")}
            className="text-sm px-3 py-1 transition-all duration-300"
          >
            Leads
          </Button>
          <Button
            variant={activeTab === "opportunities" ? "default" : "outline"}
            onClick={() => setActiveTab("opportunities")}
            className="text-sm px-3 py-1 transition-all duration-300"
          >
            Opportunities
          </Button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {[
          { title: "New Lead (Last Month)", value: "0", change: "0%", trend: "up" },
          { title: "New Opportunity (Last Month)", value: "0", change: "0%", trend: "neutral" },
          { title: "Won Opportunity (Last Month)", value: "0", change: "0%", trend: "down" },
          { title: "Open Opportunity", value: "0", change: "0%", trend: "neutral" },
        ].map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xs font-medium text-[var(--card-foreground)] mb-2 opacity-80">{metric.title}</h3>
            <div className="flex items-end justify-between">
              <p className="text-xl sm:text-2xl font-bold text-[var(--card-foreground)]">{metric.value}</p>
              <div className={`flex items-center ${metric.trend === "up" ? "text-green-500" : metric.trend === "down" ? "text-red-500" : "text-gray-500"}`}>
                {metric.trend === "up" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                ) : metric.trend === "down" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path>
                  </svg>
                )}
                <span className="ml-1 text-xs">{metric.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Charts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base font-semibold text-[var(--card-foreground)]">Incoming Leads</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
              >
                Last Quarter
              </Button>
              <Button
                variant="outline"
                className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
              >
                Weekly
              </Button>
            </div>
          </div>
          <p className="text-xs text-[var(--card-foreground)] mb-3 opacity-70">Last synced just now</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={leadData}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#ccc"
                tick={{ fill: "var(--card-foreground)", fontSize: 12, opacity: 0.7 }}
              />
              <YAxis
                stroke="#ccc"
                tick={{ fill: "var(--card-foreground)", fontSize: 12, opacity: 0.7 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #00FFFF",
                  borderRadius: "8px",
                  backdropFilter: "blur(4px)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#00FFFF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLeads)"
                activeDot={{ r: 6, stroke: "#00FFFF", strokeWidth: 2, fill: "#000" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base font-semibold text-[var(--card-foreground)]">Opportunity Trends</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
              >
                Last Quarter
              </Button>
              <Button
                variant="outline"
                className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
              >
                Weekly
              </Button>
            </div>
          </div>
          <p className="text-xs text-[var(--card-foreground)] mb-3 opacity-70">Last synced just now</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={opportunityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#ccc"
                tick={{ fill: "var(--card-foreground)", fontSize: 12, opacity: 0.7 }}
              />
              <YAxis
                stroke="#ccc"
                tick={{ fill: "var(--card-foreground)", fontSize: 12, opacity: 0.7 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #FF69B4",
                  borderRadius: "8px",
                  backdropFilter: "blur(4px)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="opportunities" fill="#FF69B4" radius={[4, 4, 0, 0]}>
                {opportunityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 15}, 100%, 70%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Secondary Charts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base font-semibold text-[var(--card-foreground)]">Won Opportunities</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
              >
                Last Year
              </Button>
              <Button
                variant="outline"
                className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
              >
                Monthly
              </Button>
            </div>
          </div>
          <p className="text-xs text-[var(--card-foreground)] mb-3 opacity-70">Last synced 19 minutes ago</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={wonOpportunitiesData}>
              <defs>
                <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF69B4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#ccc"
                tick={{ fill: "var(--card-foreground)", fontSize: 12, opacity: 0.7 }}
              />
              <YAxis
                stroke="#ccc"
                tick={{ fill: "var(--card-foreground)", fontSize: 12, opacity: 0.7 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #FF69B4",
                  borderRadius: "8px",
                  backdropFilter: "blur(4px)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="won"
                stroke="#FF69B4"
                strokeWidth={2}
                dot={{ r: 4, stroke: "#FF69B4", strokeWidth: 2, fill: "#000" }}
                activeDot={{ r: 6, stroke: "#FF69B4", strokeWidth: 2, fill: "#000" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base font-semibold text-[var(--card-foreground)]">Territory Distribution</h3>
            <Button
              variant="outline"
              className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
            >
              View All
            </Button>
          </div>
          <p className="text-xs text-[var(--card-foreground)] mb-3 opacity-70">Last synced 19 minutes ago</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={territoryData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#ccc", strokeWidth: 1 }}
              >
                {territoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#000"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #00CED1",
                  borderRadius: "8px",
                  backdropFilter: "blur(4px)",
                  fontSize: 9,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base font-semibold text-[var(--card-foreground)]">Campaign Performance</h3>
            <Button
              variant="outline"
              className="text-xs px-2 py-1 border-[var(--border)] text-[var(--card-foreground)] hover:bg-[var(--accent)]"
            >
              View All
            </Button>
          </div>
          <p className="text-xs text-[var(--card-foreground)] mb-3 opacity-70">Last synced 19 minutes ago</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={campaignData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#ccc", strokeWidth: 1 }}
              >
                {campaignData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[3]} stroke="#000" strokeWidth={1} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #7B68EE",
                  borderRadius: "8px",
                  backdropFilter: "blur(4px)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}