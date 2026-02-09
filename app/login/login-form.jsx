"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "./actions";
import initialState from "./state";

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14131a] via-[#1d1a2a] to-[#101018] flex items-center justify-center px-4 py-10 relative">
      <Link
        href="/"
        aria-label="Back to home"
        className="absolute left-4 top-4 text-white/80 hover:text-white text-2xl leading-none"
      >
        ←
      </Link>
      <div className="w-full max-w-md">
        <div className="bg-[#14131f] text-white rounded-t-2xl h-12 flex items-center px-4 border border-white/10 border-b-0">
          <div className="text-sm font-semibold tracking-wide">Admin Login</div>
        </div>

        <div className="bg-[#1f1c2e] rounded-b-2xl p-6 text-white border border-white/10">
          <form action={formAction} className="flex flex-col gap-4">
            <div>
              <label className="text-sm">Username</label>
              <input
                name="username"
                autoComplete="username"
                className="mt-2 w-full rounded-md bg-[#14131f] text-white px-3 py-2 outline-none border border-transparent focus:border-[#7c6bff]"
              />
              {state?.fieldErrors?.username ? (
                <p className="text-xs text-red-300 mt-1">
                  {state.fieldErrors.username}
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm">Password</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="mt-2 w-full rounded-md bg-[#14131f] text-white px-3 py-2 outline-none border border-transparent focus:border-[#7c6bff]"
              />
              {state?.fieldErrors?.password ? (
                <p className="text-xs text-red-300 mt-1">
                  {state.fieldErrors.password}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-[#7c6bff] hover:bg-[#6a5cf0] text-white font-semibold py-2 rounded-md"
            >
              Sign in
            </button>

            {state?.message ? (
              <div
                className={`text-sm ${state.ok ? "text-emerald-300" : "text-red-300"}`}
              >
                {state.message}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
