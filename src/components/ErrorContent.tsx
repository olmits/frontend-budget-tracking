"use client";

import { AlertCircle,RefreshCw } from "lucide-react";

interface ErrorContentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorContent({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
  className = "",
}: ErrorContentProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-gray-100 ${className}`}>
      <div className="p-3 mb-4 bg-red-50 rounded-full">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-xs">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}