import Link from "next/link";

// Mock data for now (or fetch from API)
async function getTransactions() {
  return [
    { id: 1, amount: -50, description: "Groceries" },
    { id: 2, amount: 2000, description: "Salary" },
  ];
}

export default async function TransactionsSlot() {
  const transactions = await getTransactions();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        <Link 
          href="/dashboard/add" 
          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700"
        >
          + Add
        </Link>
      </div>

      <div className="space-y-4">
        {transactions.map((t) => (
          <div key={t.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">{t.description}</span>
            <span className={`font-bold ${t.amount > 0 ? "text-green-600" : "text-red-600"}`}>
              ${Math.abs(t.amount)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Category Link Test */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
        <Link 
          href="/dashboard/categories/add" 
          className="block w-full text-center py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          + Create New Category
        </Link>
      </div>
    </div>
  );
}