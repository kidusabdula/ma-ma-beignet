"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
    PieChart,
    Pie,
    Sector
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Enhanced billing data with more months and realistic fluctuations
const billingData = [
    { name: "Jan", outgoing: 1830.5, incoming: 738.3, profit: 1092.2 },
    { name: "Feb", outgoing: 1518.3, incoming: 942.7, profit: 576.0 },
    { name: "Mar", outgoing: 1686.1, incoming: 1224.4, profit: 462.0 },
    { name: "Apr", outgoing: 1962.7, incoming: 1506.1, profit: 456.0 },
    { name: "May", outgoing: 1794.9, incoming: 1368.8, profit: 426.0 },
    { name: "Jun", outgoing: 1872.2, incoming: 1710.5, profit: 162.0 },
    { name: "Jul", outgoing: 2124.4, incoming: 1812.2, profit: 312.0 },
    { name: "Aug", outgoing: 2028.8, incoming: 1962.7, profit: 66.0 },
    { name: "Sep", outgoing: 1812.2, incoming: 1734.9, profit: 78.0 },
    { name: "Oct", outgoing: 1722.7, incoming: 1518.3, profit: 204.0 },
    { name: "Nov", outgoing: 1950.5, incoming: 1806.1, profit: 144.0 },
    { name: "Dec", outgoing: 2412.2, incoming: 2748.8, profit: -336.6 },
];

// More detailed ageing data with currency values
const ageingData = [
    { range: "0-30", receivable: 45, payable: 32, recAmount: 56250, payAmount: 38250 },
    { range: "31-60", receivable: 28, payable: 19, recAmount: 35100, payAmount: 23400 },
    { range: "61-90", receivable: 15, payable: 12, recAmount: 18900, payAmount: 17100 },
    { range: "91-120", receivable: 8, payable: 7, recAmount: 9450, payAmount: 8550 },
    { range: "121+", receivable: 4, payable: 5, recAmount: 3600, payAmount: 5400 },
];

// Enhanced budget data with variance calculation
const budgetData = [
    { month: "Jan", budget: 18000, actual: 16800 },
    { month: "Feb", budget: 19200, actual: 20400 },
    { month: "Mar", budget: 21000, actual: 19800 },
    { month: "Apr", budget: 18600, actual: 18000 },
    { month: "May", budget: 19800, actual: 21000 },
    { month: "Jun", budget: 21600, actual: 22200 },
    { month: "Jul", budget: 20400, actual: 19200 },
    { month: "Aug", budget: 22200, actual: 23400 },
    { month: "Sep", budget: 19200, actual: 18000 },
    { month: "Oct", budget: 19800, actual: 20400 },
    { month: "Nov", budget: 21000, actual: 21600 },
    { month: "Dec", budget: 22800, actual: 24000 },
].map(item => ({
    ...item,
    variance: ((item.actual - item.budget) / item.budget) * 100,
}));

// Active shape for pie chart interaction
// @ts-expect-error: Error due to missing types for `recharts`
const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={fill} className="font-bold">
                {payload.range}
            </text>
            <text x={cx} y={cy} dy={0} textAnchor="middle" fill="#fff">
                {payload.value} items
            </text>
            <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#fff">
                {`ETB ${payload.amount.toLocaleString()}`}
            </text>
        </g>
    );
};

export default function Accounting() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentMetrics, setCurrentMetrics] = useState({
        outgoingBills: 1830.5,
        incomingBills: 0,
        incomingPayments: 150,
        outgoingPayments: 30600,
    });

    // Simulate live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMetrics(prev => ({
                outgoingBills: prev.outgoingBills * (1 + (Math.random() * 0.1 - 0.05)),
                incomingBills: prev.incomingBills * (1 + (Math.random() * 0.2 - 0.1)),
                incomingPayments: prev.incomingPayments * (1 + (Math.random() * 0.15 - 0.075)),
                outgoingPayments: prev.outgoingPayments * (1 + (Math.random() * 0.08 - 0.04)),
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);
// @ts-expect-error: Error
    const onPieEnter = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
                Accounts Dashboard
            </h1>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Outgoing Bills */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">TOTAL OUTGOING BILLS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ETB {currentMetrics.outgoingBills.toFixed(2)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {Math.random() > 0.5 ? "+" : "-"} {Math.floor(Math.random() * 5)}% since last month
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Total Incoming Bills */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">TOTAL INCOMING BILLS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ETB {currentMetrics.incomingBills.toFixed(2)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {Math.random() > 0.5 ? "+" : "-"} {Math.floor(Math.random() * 5)}% since last month
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Total Incoming Payment */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">TOTAL INCOMING PAYMENT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ETB {currentMetrics.incomingPayments.toFixed(2)}K
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {Math.random() > 0.5 ? "+" : "-"} {Math.floor(Math.random() * 5)}% since last month
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Total Outgoing Payment */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">TOTAL OUTGOING PAYMENT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ETB {currentMetrics.outgoingPayments.toFixed(2)}K
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {Math.random() > 0.5 ? "+" : "-"} {Math.floor(Math.random() * 5)}% since last month
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Profit and Loss Chart */}
                <motion.div whileHover={{ scale: 1.01 }} className="lg:col-span-2">
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md h-full">
                        <CardHeader>
                            <CardTitle>Profit and Loss</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={billingData}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="outgoing"
                                            fill="var(--chart-2)"
                                            name="Outgoing"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="incoming"
                                            fill="var(--chart-5)"
                                            name="Incoming"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="profit"
                                            fill="var(--chart-3)"
                                            name="Profit"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Accounts Receivable Ageing */}
                <motion.div whileHover={{ scale: 1.01 }}>
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md h-full">
                        <CardHeader>
                            <CardTitle>Accounts Receivable Ageing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            data={ageingData.map(item => ({
                                                ...item,
                                                value: item.receivable,
                                                amount: item.recAmount,
                                            }))}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="var(--chart-4)"
                                            dataKey="value"
                                            onMouseEnter={onPieEnter}
                                        >
                                            {ageingData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={`var(--chart-${index + 1})`}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value, name, props) => [
                                                `ETB ${props.payload.amount.toLocaleString()}`,
                                                `${props.payload.range} days: ${value} items`,
                                            ]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Accounts Payable Ageing */}
                <motion.div whileHover={{ scale: 1.01 }}>
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md h-full">
                        <CardHeader>
                            <CardTitle>Accounts Payable Ageing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            data={ageingData.map(item => ({
                                                ...item,
                                                value: item.payable,
                                                amount: item.payAmount,
                                            }))}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="var(--chart-4)"
                                            dataKey="value"
                                            onMouseEnter={onPieEnter}
                                        >
                                            {ageingData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={`var(--chart-${index + 1})`}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value, name, props) => [
                                                `ETB ${props.payload.amount.toLocaleString()}`,
                                                `${props.payload.range} days: ${value} items`,
                                            ]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Budget Variance */}
                <motion.div whileHover={{ scale: 1.01 }} className="lg:col-span-2">
                    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md rounded-md h-full">
                        <CardHeader>
                            <CardTitle>Budget Variance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={budgetData}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="budget"
                                            stroke="var(--chart-2)"
                                            strokeWidth={2}
                                            name="Budget"
                                            dot={{ r: 4 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="var(--chart-5)"
                                            strokeWidth={2}
                                            name="Actual Expense"
                                            dot={{ r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}