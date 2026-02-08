"use client"; // <--- 1. Must be a Client Component

import { useActionState } from "react"; // <--- 2. Import the hook

import { createCategoryAction } from "@/app/actions";
import Modal from "@/components/Modal";

const initialState = {
  error: null,
};

export default function InterceptedAddCategoryPage() {
  // 3. Wrap the action
  const [state, formAction, isPending] = useActionState(createCategoryAction, initialState);

  return (
    <Modal>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Category</h2>
        </div>

        {/* 4. Use formAction here, NOT createCategoryAction */}
        <form action={formAction} className="space-y-4">
          
          {/* Now you can display validation errors! */}
          {state?.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {state.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              placeholder="e.g. Entertainment"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" className="w-full mt-1 p-2 border border-gray-300 rounded-md">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button 
              type="submit" 
              disabled={isPending}
              className={`px-4 py-2 text-white rounded-md transition-colors ${
                isPending ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}