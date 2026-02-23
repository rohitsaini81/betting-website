"use client";

import { useActionState } from "react";
import { useState } from "react";
import Link from "next/link";
import { loginAction } from "./actions";
import initialState from "./state";

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-4 py-10">
      <Link
        href="/"
        aria-label="Back to home"
        className="absolute left-4 top-4 rounded-md border border-white/20 px-3 py-1 text-sm text-white/90 transition hover:bg-white/10"
      >
        ← Home
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl shadow-slate-950/30">
        <div className="mb-5 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-700">
            Welcome Back
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">User Login</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to continue to your dashboard.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Username</label>
            <input
              name="username"
              autoComplete="username"
              placeholder="Enter username"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {state?.fieldErrors?.username ? (
              <p className="mt-1 text-xs text-red-600">
                {state.fieldErrors.username}
              </p>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-20 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {state?.fieldErrors?.password ? (
              <p className="mt-1 text-xs text-red-600">
                {state.fieldErrors.password}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="mt-1 rounded-md bg-blue-700 py-2 font-semibold text-white transition hover:bg-blue-800"
          >
            Sign In
          </button>

          {state?.message ? (
            <div
              className={`text-sm ${state.ok ? "text-emerald-600" : "text-red-600"}`}
            >
              {state.message}
            </div>
          ) : null}

          <p className="text-center text-xs text-slate-500">
            Secure login for registered users
          </p>
        </form>
      </div>
    </div>
  );
}
