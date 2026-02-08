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
    console.log("test", summary);
  } catch {
    // Handle API errors (e.g., backend down)
    return <div className="p-8 text-red-500">Error loading dashboard data. is the Backend running?</div>;
  }


  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold">Dashboard (Protected)</h1>
      <p className="mt-4">You are logged in!</p>
    </div>
  );
}