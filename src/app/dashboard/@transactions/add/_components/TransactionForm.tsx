"use client";

import Link from "next/link";
import { useActionState } from "react";

import { createTransactionAction } from "@/app/actions";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

export default function TransactionForm({ categories }: { categories: Category[] }) {
  const [state, formAction, isPending] = useActionState(createTransactionAction, { error: null });

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {state.error}
        </div>
      )}

      {/* Transaction Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="cursor-pointer">
            <input type="radio" name="type" value="expense" defaultChecked className="peer sr-only" />
            <div className="text-center py-2 border rounded-md peer-checked:bg-red-50 peer-checked:border-red-500 peer-checked:text-red-700 hover:bg-gray-50">
              Expense
            </div>
          </label>
          <label className="cursor-pointer">
            <input type="radio" name="type" value="income" className="peer sr-only" />
            <div className="text-center py-2 border rounded-md peer-checked:bg-green-50 peer-checked:border-green-500 peer-checked:text-green-700 hover:bg-gray-50">
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

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          name="category_id" 
          required 
          className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled selected>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.type})
            </option>
          ))}
        </select>
        <Link href="/dashboard/categories/add" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
          + Create new category
        </Link>
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
          defaultValue={new Date().toISOString().split("T")[0]} // Default to today
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