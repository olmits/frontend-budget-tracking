import { createCategoryAction } from "@/app/actions";
import Modal from "@/components/Modal";

export default function InterceptedAddCategoryPage() {
  return (
    <Modal>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <form action={createCategoryAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" type="text" required className="w-full mt-1 p-2 border rounded-md" placeholder="e.g., Entertainment" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" className="w-full mt-1 p-2 border rounded-md">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}