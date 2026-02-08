import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiService } from "@/services/api.service";
import { DashboardService } from "@/services/dashboard.service";

const dashboardService = new DashboardService(apiService);

export default async function DashboardPage() {
  // 1. Check Auth (Double check in case middleware missed it)
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  if (!token) {
    redirect("/login");
  }

  // 2. Fetch Data (Server Side)
  let summary;
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
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold">Dashboard (Protected)</h1>
      <p className="mt-4">You are logged in!</p>
    </div>
  );
}