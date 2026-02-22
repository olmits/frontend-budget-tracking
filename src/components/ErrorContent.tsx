

export default function ErrorContent() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 h-full flex flex-col items-center justify-center text-center">
      <div className="bg-red-50 p-3 rounded-full mb-3">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-gray-800 font-semibold">Unable to load activity</h2>
      <p className="text-sm text-gray-500 mb-4">Check your connection or try again later.</p>
      <button className="text-sm text-blue-600 font-medium hover:underline">Retry</button>
    </div>
  );
}