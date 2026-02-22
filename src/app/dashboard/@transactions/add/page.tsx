import Link from "next/link";

import ErrorContent from "@/components/ErrorContent";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category";

import TransactionForm from "./_components/TransactionForm";


export default async function AddTransactionPage() {
  // Fetch categories server-side
  let categories: Category[] = [];
  try {
    categories = await categoryService.list();
  } catch (error) {
    console.error("Failed to load categories:", error);
    return (
      <ErrorContent />
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center mb-6">
        <Link 
          href="/dashboard" 
          className="mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Back to dashboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h2 className="text-lg font-semibold text-gray-800">New Transaction</h2>
      </div>

      <TransactionForm categories={categories} />
    </div>
  );
}