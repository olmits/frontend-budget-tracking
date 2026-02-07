"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from '@/app/actions'

// 2. Strict Initial State
export const initialState: ActionState = {
  error: null,
}

export default function LoginForm () {
    const [state, formAction, isPending] = useActionState(loginAction, initialState)

    return (
        <>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending} // Disable button while loading
            className={`w-full py-2 text-white rounded-md transition-colors ${
              isPending 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {state.error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span className="font-medium">Error:</span> {state.error}
          </div>
        )}
        </>
    )
}