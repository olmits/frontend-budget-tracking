import Link from "next/link";

import { createTransactionAction } from "@/app/actions"; // We will create this

export default function AddTransactionPage() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 mr-2">
          ←
        </Link>
        <h2 className="text-lg font-semibold text-gray-800">New Transaction</h2>
      </div>

      <form action={createTransactionAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input name="amount" type="number" step="0.01" required className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input name="description" type="text" required className="w-full mt-1 p-2 border rounded-md" />
        </div>
        {/* Category Select would go here */}
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Save Transaction
        </button>
      </form>
    </div>
  );
}