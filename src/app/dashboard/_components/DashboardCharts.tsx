"use client";

import { 
  Bar,   BarChart, CartesianGrid, 
  Cell, Legend,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface ChartProps {
  income: number;
  expense: number;
}

export function OverviewPieChart({ income, expense }: ChartProps) {
  const data = [
    { name: "Income", value: income, color: "#16a34a" },
    { name: "Expenses", value: expense, color: "#dc2626" },
  ];

  if (income === 0 && expense === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {/* Cell is NOT deprecated in Recharts. It is required for colors. */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            // FIX: Allow 'value' to be number, string, or undefined
            formatter={(value: number | string | undefined) => {
              // Safety check: cast to Number just in case
              const val = Number(value) || 0;
              return [`$${val.toLocaleString()}`, "Amount"];
            }}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Mock Data for Monthly Trend (Since backend doesn't provide this yet)
const mockMonthlyData = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
];

export function MonthlyBarChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mockMonthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#6b7280", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#6b7280", fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            cursor={{ fill: "#f3f4f6" }}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Bar dataKey="income" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={20} name="Income" />
          <Bar dataKey="expense" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={20} name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}