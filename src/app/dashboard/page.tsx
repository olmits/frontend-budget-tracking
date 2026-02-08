import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiService } from "@/services/api.service";
import { DashboardService, DashboardSummary } from "@/services/dashboard.service";

import { MonthlyBarChart, OverviewPieChart } from "./_components/DashboardCharts";

const dashboardService = new DashboardService(apiService);

export default async function DashboardPage() {
  // 1. Check Auth (Double check in case middleware missed it)
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  if (!token) {
    redirect("/login");
  }

  // 2. Fetch Data (Server Side)
  let summary: DashboardSummary;
  try {
    summary = await dashboardService.getSummary();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // 3. Handle 401 (Invalid Token) from Backend
    if (error.response?.status === 401) {
      // ✅ FIX: Redirect to the Route Handler instead of deleting cookie here
      redirect("/api/logout"); 
    }

    // Handle other errors (Backend down, 500, etc.)
    return (
      <div className="p-8 text-red-600 bg-red-50 min-h-screen flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="mt-2 text-gray-700">
            {error.response?.data?.error || "Could not load dashboard data."}
          </p>
        </div>
      </div>
    );
  }

  console.log(summary);

  return (
    <div className="space-y-6">
      {/* 1. Summary Cards (Existing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${summary.total_income}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            ${summary.total_expense}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Net Balance</h3>
          <p className={`mt-2 text-3xl font-bold ${summary.net_balance >= 0 ? "text-blue-600" : "text-red-600"}`}>
            ${summary.net_balance}
          </p>
        </div>
      </div>

      {/* 2. Charts Section (New) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income vs Expense Ratio */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Cash Flow Ratio</h3>
          <OverviewPieChart 
            income={summary.total_income} 
            expense={summary.total_expense} 
          />
        </div>

        {/* Monthly Trend (Mock Data for now) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Trends</h3>
          <MonthlyBarChart />
        </div>
      </div>
    </div>
  );
}