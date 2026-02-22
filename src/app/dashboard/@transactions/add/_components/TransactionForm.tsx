"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { createTransactionAction } from "@/app/actions";
import { Category, TransactionType } from "@/types/category";

export default function TransactionForm({ categories }: { categories: Category[] }) {
  const [state, formAction, isPending] = useActionState(createTransactionAction, { error: null });

  // 1. State to track the active transaction type (Default: 'expense')
  const [activeType, setActiveType] = useState<TransactionType>("expense");

  const safeCategories = Array.isArray(categories) ? categories : [];
  const filteredCategories = categories.filter((c) => c.type === activeType);

  if (safeCategories.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No categories yet</h3>
        <p className="text-gray-500 mt-2 mb-6 text-sm">You need at least one category to record a transaction.</p>
        <Link 
          href="/dashboard/categories/add"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Your First Category
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {state.error}
        </div>
      )}

      {/* Transaction Type Switcher */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              value="expense" 
              checked={activeType === "expense"}
              onChange={() => setActiveType("expense")} // 3. Update state on click
              className="peer sr-only" 
            />
            <div className="text-center py-2 border rounded-md transition-all
              peer-checked:bg-red-50 peer-checked:border-red-500 peer-checked:text-red-700 
              hover:bg-gray-50 text-gray-600">
              Expense
            </div>
          </label>

          <label className="cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              value="income" 
              checked={activeType === "income"}
              onChange={() => setActiveType("income")} // 3. Update state on click
              className="peer sr-only" 
            />
            <div className="text-center py-2 border rounded-md transition-all
              peer-checked:bg-green-50 peer-checked:border-green-500 peer-checked:text-green-700 
              hover:bg-gray-50 text-gray-600">
              Income
            </div>
          </label>
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input 
            name="amount" 
            type="number" 
            step="0.01" 
            required 
            placeholder="0.00"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
      </div>

      {/* Category Selection (Filtered) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          name="category_id" 
          required 
          // 4. Reset the select when type changes to prevent invalid selections
          key={activeType} 
          defaultValue=""
          className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select a category</option>
          
          {/* 5. Render only filtered categories */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>No {activeType} categories found</option>
          )}
        </select>
        
        {/* Helper Link */}
        <div className="mt-1 flex justify-between items-center text-xs">
          <span className="text-gray-400">Can&apos;t find it?</span>
          <Link href="/dashboard/categories/add" className="text-blue-600 hover:underline">
            + Create new {activeType} category
          </Link>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input 
          name="description" 
          type="text" 
          required 
          placeholder="e.g. Weekly Groceries"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input 
          name="date" 
          type="date" 
          required 
          defaultValue={new Date().toISOString().split("T")[0]} 
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
          isPending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isPending ? "Saving..." : "Save Transaction"}
      </button>
    </form>
  );
}