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
    { name: "Jan", outgoing: 30.5, incoming: 12.3, profit: 18.2 },
    { name: "Feb", outgoing: 25.3, incoming: 15.7, profit: 9.6 },
    { name: "Mar", outgoing: 28.1, incoming: 20.4, profit: 7.7 },
    { name: "Apr", outgoing: 32.7, incoming: 25.1, profit: 7.6 },
    { name: "May", outgoing: 29.9, incoming: 22.8, profit: 7.1 },
    { name: "Jun", outgoing: 31.2, incoming: 28.5, profit: 2.7 },
    { name: "Jul", outgoing: 35.4, incoming: 30.2, profit: 5.2 },
    { name: "Aug", outgoing: 33.8, incoming: 32.7, profit: 1.1 },
    { name: "Sep", outgoing: 30.2, incoming: 28.9, profit: 1.3 },
    { name: "Oct", outgoing: 28.7, incoming: 25.3, profit: 3.4 },
    { name: "Nov", outgoing: 32.5, incoming: 30.1, profit: 2.4 },
    { name: "Dec", outgoing: 40.2, incoming: 45.8, profit: -5.6 }
];

// More detailed ageing data with currency values
const ageingData = [
    { range: "0-30", receivable: 45, payable: 32, recAmount: 12500, payAmount: 8500 },
    { range: "31-60", receivable: 28, payable: 19, recAmount: 7800, payAmount: 5200 },
    { range: "61-90", receivable: 15, payable: 12, recAmount: 4200, payAmount: 3800 },
    { range: "91-120", receivable: 8, payable: 7, recAmount: 2100, payAmount: 1900 },
    { range: "121+", receivable: 4, payable: 5, recAmount: 800, payAmount: 1200 }
];

// Enhanced budget data with variance calculation
const budgetData = [
    { month: "Jan", budget: 3000, actual: 2800 },
    { month: "Feb", budget: 3200, actual: 3400 },
    { month: "Mar", budget: 3500, actual: 3300 },
    { month: "Apr", budget: 3100, actual: 3000 },
    { month: "May", budget: 3300, actual: 3500 },
    { month: "Jun", budget: 3600, actual: 3700 },
    { month: "Jul", budget: 3400, actual: 3200 },
    { month: "Aug", budget: 3700, actual: 3900 },
    { month: "Sep", budget: 3200, actual: 3000 },
    { month: "Oct", budget: 3300, actual: 3400 },
    { month: "Nov", budget: 3500, actual: 3600 },
    { month: "Dec", budget: 3800, actual: 4000 }
].map(item => ({
    ...item,
    variance: ((item.actual - item.budget) / item.budget) * 100
}));

// Active shape for pie chart interaction
const renderActiveShape = (props: any) => {
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
                ${payload.amount.toLocaleString()}
            </text>
        </g>
    );
};

export default function Accounting() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentMetrics, setCurrentMetrics] = useState({
        outgoingBills: 30.5,
        incomingBills: 0,
        incomingPayments: 2.5,
        outgoingPayments: 510
    });

    // Simulate live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMetrics(prev => ({
                outgoingBills: prev.outgoingBills * (1 + (Math.random() * 0.1 - 0.05)),
                incomingBills: prev.incomingBills * (1 + (Math.random() * 0.2 - 0.1)),
                incomingPayments: prev.incomingPayments * (1 + (Math.random() * 0.15 - 0.075)),
                outgoingPayments: prev.outgoingPayments * (1 + (Math.random() * 0.08 - 0.04))
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const onPieEnter = (_, index) => {
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
                                $ {currentMetrics.outgoingBills.toFixed(2)} K
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
                                $ {currentMetrics.incomingBills.toFixed(2)}
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
                                $ {currentMetrics.incomingPayments.toFixed(2)} K
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {Math.random() > 0.5 ? "+" : "-"} {Math.floor(Math.random() * 5)}% since last month
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Total Outgoing Payment */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Card className="bg-[var(--card)] text-[var(--card-foreground] shadow-md rounded-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">TOTAL OUTGOING PAYMENT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                $ {currentMetrics.outgoingPayments.toFixed(2)} K
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
                                                amount: item.recAmount
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
                                            formatter={(value: any, name: any, props: any) => [
                                                `$${props.payload.amount.toLocaleString()}`,
                                                `${props.payload.range} days: ${value} items`
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
                                                amount: item.payAmount
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
                                            formatter={(value: any, name: any, props: any) => [
                                                `$${props.payload.amount.toLocaleString()}`,
                                                `${props.payload.range} days: ${value} items`
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