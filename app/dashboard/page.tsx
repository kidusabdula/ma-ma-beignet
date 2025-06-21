"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockData = {
  accounting: { totalTransactions: "ETB 75,000.00", trend: "up", period: "This Month" },
  hr: { employees: 15, leaves: 3, activeClaims: 2 },
  crm: { leads: 20, opportunities: 10, openCalls: 5 },
  manufacturing: { production: 500, downtime: 2, capacity: "85%" },
  order: { orders: 30, fulfilled: 28, pending: 2 },
  assets: { totalAssets: 10, depreciation: "ETB 3,000", active: 9 },
};

const monthlyData = [
  { name: "Jan", value: 24000 },
  { name: "Feb", value: 18000 },
  { name: "Mar", value: 30000 },
  { name: "Apr", value: 16700 },
  { name: "May", value: 11300 },
  { name: "Jun", value: 14300 },
];

const smallChartData = [
  { name: "Week 1", value: 600 },
  { name: "Week 2", value: 1800 },
  { name: "Week 3", value: 1200 },
  { name: "Week 4", value: 3000 },
];

const invoicesData = [
  { id: 1, status: "Success", email: "amanuel23@ethmail.com", amount: "ETB 1,900.00" },
  { id: 2, status: "Success", email: "selam45@ethmail.com", amount: "ETB 1,450.00" },
  { id: 3, status: "Processing", email: "yohannes77@ethmail.com", amount: "ETB 5,022.00" },
  { id: 4, status: "Failed", email: "tsegaye88@ethmail.com", amount: "ETB 4,326.00" },
];

const employeesData = [
  { id: 1, name: "Amanuel Tadesse", email: "amanuel@mamabeignet.com", role: "Manager" },
  { id: 2, name: "Selam Getachew", email: "selam@mamabeignet.com", role: "Owner" },
  { id: 3, name: "Yohannes Kebede", email: "yohannes@mamabeignet.com", role: "Baker" },
  { id: 4, name: "Tsegaye Abebe", email: "tsegaye@mamabeignet.com", role: "Assistant" },
  { id: 5, name: "Elias Worku", email: "elias@mamabeignet.com", role: "Baker" },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[var(--card-foreground)]">Dashboard</h1>
      </div>

      {/* Top Metrics Row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="initial"
        animate="animate"
      >
        {/* Accounting Card */}
        <motion.div whileHover="hover">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Accounting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.accounting.totalTransactions}</div>
              <p className="text-xs text-muted-foreground">{mockData.accounting.period}</p>
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%" className="rounded">
                  <LineChart data={smallChartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-sm text-green-500">
                {mockData.accounting.trend === "up" ? "↑" : "↓"} Details 15.54%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* HR Card */}
        <motion.div whileHover="hover">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Human Resource</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.hr.employees}</div>
              <p className="text-xs text-muted-foreground">Total Employees</p>
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%" className="rounded">
                  <BarChart data={smallChartData}>
                    <Bar
                      dataKey="value"
                      fill="var(--color-white)"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-sm text-green-500">
                ↑ Details 40.2%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Manufacturing Card */}
        <motion.div whileHover="hover">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Manufacturing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.manufacturing.production}</div>
              <p className="text-xs text-muted-foreground">Total Production</p>
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%" className="rounded">
                  <AreaChart data={smallChartData}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-white)"
                      fill="hsl(var(--card) / 0.2)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-sm text-green-500">
                ↑ Details 10.8%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Management Card */}
        <motion.div whileHover="hover">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.order.orders}</div>
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%" className="rounded">
                  <LineChart data={smallChartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-white)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-sm text-green-500">
                +201% from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Middle Row - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CRM Card - Main Chart */}
        <motion.div initial="initial" animate="animate" whileHover="hover" className="col-span-2">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader>
              <CardTitle>CRM - Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Showing total leads for the last 6 months
              </p>
              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%" className="rounded">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', color: 'black' }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-white)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                {monthlyData.map((month) => (
                  <span key={month.name}>{month.name}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Asset Management Card */}
        <motion.div initial="initial" animate="animate" whileHover="hover">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader>
              <CardTitle>Asset Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{mockData.assets.totalAssets}</div>
              <div className="mt-2 text-sm text-green-500">
                +180.1% from last month
              </div>
              <div className="h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%" className="rounded">
                  <BarChart data={smallChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <Bar
                      dataKey="value"
                      fill="var(--color-white)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold">Downloads</h3>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row - Invoices and Employees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Invoices Card */}
        <motion.div initial="initial" animate="animate" whileHover="hover">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <p className="text-sm text-muted-foreground">Manage your invoices</p>
            </CardHeader>
            <CardContent>
              <Input placeholder="Filter emails..." className="mb-4" />
              
              <div className="space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 items-center text-sm text-muted-foreground font-medium">
                  <div className="col-span-1">
                    <Checkbox />
                  </div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-5">Email</div>
                  <div className="col-span-3">Amount</div>
                </div>

                {/* Table Rows */}
                {invoicesData.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-12 gap-4 items-center text-sm">
                    <div className="col-span-1">
                      <Checkbox />
                    </div>
                    <div className="col-span-3">
                      <Badge 
                        variant={invoice.status === "Success" ? "default" : 
                                invoice.status === "Processing" ? "secondary" : "destructive"}
                        className="capitalize"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="col-span-5">{invoice.email}</div>
                    <div className="col-span-3">{invoice.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Employees Card */}
        <motion.div initial="initial" animate="animate" whileHover="hover">
          <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
            <CardHeader>
              <CardTitle>Employees</CardTitle>
              <p className="text-sm text-muted-foreground">Invite your team members to collaborate</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeesData.map((employee) => (
                  <div key={employee.id} className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox checked />
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={employee.role === "Owner" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {employee.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}