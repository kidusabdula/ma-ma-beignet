"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Bakery-themed data
const ingredientPurchaseData = [
  { date: "Jun 2024", Flour: 4000, Sugar: 2500, Butter: 1500, Yeast: 500 },
  { date: "Jul 2024", Flour: 4200, Sugar: 2600, Butter: 1600, Yeast: 550 },
  { date: "Aug 2024", Flour: 3800, Sugar: 2400, Butter: 1400, Yeast: 520 },
  { date: "Sep 2024", Flour: 4500, Sugar: 2800, Butter: 1700, Yeast: 600 },
  { date: "Oct 2024", Flour: 4700, Sugar: 3000, Butter: 1800, Yeast: 650 },
  { date: "Nov 2024", Flour: 5000, Sugar: 3200, Butter: 2000, Yeast: 700 },
  { date: "Dec 2024", Flour: 6000, Sugar: 4000, Butter: 2500, Yeast: 800 },
  { date: "Jan 2025", Flour: 5500, Sugar: 3500, Butter: 2200, Yeast: 750 },
  { date: "Feb 2025", Flour: 5200, Sugar: 3300, Butter: 2100, Yeast: 720 },
  { date: "Mar 2025", Flour: 5800, Sugar: 3700, Butter: 2300, Yeast: 780 },
];

const dailyProductionData = [
  { day: "Mon", Croissants: 300, "Sourdough Loaves": 150, Cupcakes: 400, "Fruit Tarts": 200 },
  { day: "Tue", Croissants: 320, "Sourdough Loaves": 160, Cupcakes: 410, "Fruit Tarts": 210 },
  { day: "Wed", Croissants: 280, "Sourdough Loaves": 140, Cupcakes: 390, "Fruit Tarts": 190 },
  { day: "Thu", Croissants: 350, "Sourdough Loaves": 170, Cupcakes: 430, "Fruit Tarts": 220 },
  { day: "Fri", Croissants: 400, "Sourdough Loaves": 200, Cupcakes: 500, "Fruit Tarts": 250 },
  { day: "Sat", Croissants: 500, "Sourdough Loaves": 250, Cupcakes: 600, "Fruit Tarts": 300 },
  { day: "Sun", Croissants: 450, "Sourdough Loaves": 220, Cupcakes: 550, "Fruit Tarts": 280 },
];

const oldestBakedGoodsData = [
  { name: "Chocolate Croissant", age: 3 },
  { name: "Blueberry Muffin", age: 2 },
  { name: "Cinnamon Roll", age: 2 },
  { name: "Apple Turnover", age: 1 },
  { name: "Baguette", age: 1 },
];

const topSellingItemsData = [
  { name: "Classic Croissant", value: 400 },
  { name: "Red Velvet Cupcake", value: 300 },
  { name: "Sourdough Bread", value: 200 },
  { name: "Glazed Donut", value: 278 },
  { name: "Chocolate Chip Cookie", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function StockDashboard() {
  const [timeRange, setTimeRange] = useState("Monthly");
  const [currentTotalItems, setCurrentTotalItems] = useState(190);
  const [currentWarehouses, setCurrentWarehouses] = useState(179);
  const [currentStockValue, setCurrentStockValue] = useState(63.87);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTotalItems(prev => prev + Math.floor(Math.random() * 11) - 5);
      setCurrentWarehouses(prev => prev + Math.floor(Math.random() * 3) - 1);
      setCurrentStockValue(prev => prev + (Math.random() * 2 - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-8 bg-[var(--background)] text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-[var(--card-foreground)]">Bakery Stock Dashboard</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-lg"
          >
            <h3 className="text-[var(--card-foreground)] mb-2 font-semibold">Total Baked Goods</h3>
            <p className="text-4xl font-bold text-[var(--primary)]">{currentTotalItems.toLocaleString()}</p>
            <p className="text-sm text-green-500">+2% since yesterday</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-lg"
          >
            <h3 className="text-[var(--card-foreground)] mb-2 font-semibold">Supplier Deliveries Today</h3>
            <p className="text-4xl font-bold text-[var(--primary)]">{currentWarehouses}</p>
            <p className="text-sm text-red-500">-1% since yesterday</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-lg"
          >
            <h3 className="text-[var(--card-foreground)] mb-2 font-semibold">Total Inventory Value</h3>
            <p className="text-4xl font-bold text-[var(--primary)]">${currentStockValue.toFixed(2)}K</p>
            <p className="text-sm text-green-500">+0.5% since last hour</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--card-foreground)] font-semibold">Ingredient Purchase Trends</h3>
            <div className="space-x-2">
              <Button
                variant={timeRange === "Last Year" ? "default" : "outline"}
                className={`border-[var(--border)] text-[var(--card-foreground)] ${timeRange === "Last Year" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : ""}`}
                onClick={() => setTimeRange("Last Year")}
              >
                Last Year
              </Button>
              <Button
                variant={timeRange === "Monthly" ? "default" : "outline"}
                className={`border-[var(--border)] text-[var(--card-foreground)] ${timeRange === "Monthly" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : ""}`}
                onClick={() => setTimeRange("Monthly")}
              >
                Monthly
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">Last synced: a few seconds ago</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ingredientPurchaseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none", borderRadius: "10px" }} />
              <Legend />
              <Line type="monotone" dataKey="Flour" stroke="#FFC658" strokeWidth={2} />
              <Line type="monotone" dataKey="Sugar" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="Butter" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="Yeast" stroke="#FF8042" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--card-foreground)] font-semibold">Daily Production Output</h3>
            <p className="text-sm text-gray-400">Last 7 days</p>
          </div>
           <p className="text-sm text-gray-400 mb-4">Last synced: just now</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyProductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none", borderRadius: "10px" }} />
              <Legend />
              <Bar dataKey="Croissants" fill="#00C49F" />
              <Bar dataKey="Sourdough Loaves" fill="#FFBB28" />
              <Bar dataKey="Cupcakes" fill="#FF8042" />
              <Bar dataKey="Fruit Tarts" fill="#AF19FF" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-lg"
        >
          <h3 className="text-[var(--card-foreground)] mb-4 font-semibold">Oldest Baked Goods (Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={oldestBakedGoodsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis type="number" stroke="#ccc" />
              <YAxis type="category" dataKey="name" stroke="#ccc" width={120} />
              <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none", borderRadius: "10px" }} />
              <Legend />
              <Bar dataKey="age" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-lg"
        >
          <h3 className="text-[var(--card-foreground)] mb-4 font-semibold">Top Selling Items</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={topSellingItemsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {topSellingItemsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none", borderRadius: "10px" }}/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}