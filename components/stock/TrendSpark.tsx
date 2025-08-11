"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export function TrendSpark({ data, color = "#00C49F", height = 30 }: { data: number[]; color?: string; height?: number }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  return (
    <div className="w-32 h-[30px] opacity-80">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 8, bottom: 0, left: 0, right: 0 }}>
          <Line type="monotone" dataKey="y" stroke={color} dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


