// This is what users see if they go directly to the URL or refresh
import { createCategoryAction } from "@/app/actions";

export default function AddCategoryPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      {/* Reusing the same form logic, ideally extract this form to a component */}
      <form action={createCategoryAction}>
        {/* ... inputs same as above ... */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}