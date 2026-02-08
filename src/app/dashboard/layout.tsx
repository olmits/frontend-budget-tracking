/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

export default function DashboardLayout({
  children,
  transactions,
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore
  modal // We will use this if we wanted a generic modal slot, 
  // but for (.)categories we often render it within the slot or children context
  // depending on setup. For simplicity, we assume (.)categories intercepts 
  // a route rendered in 'children' or is globally available.
  // Actually, Intercepting routes usually render INTO the slot where the link was clicked
  // OR as a parallel route if defined.
  // Let's stick to the cleanest way: Categories will just be a standard intercept.
}: {
  children: React.ReactNode;
  transactions: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b px-8 py-4 mb-8">
        <h1 className="text-xl font-bold text-gray-800">Budget Tracker</h1>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Stats) - Takes up 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {children}
          </div>

          {/* Parallel Route (Transactions) - Takes up 1/3 width */}
          <div className="lg:col-span-1">
            {transactions}
          </div>
        </div>
      </div>
    </div>
  );
}