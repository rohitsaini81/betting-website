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
    <div className="relative flex min-h-screen items-center justify-center bg-[#f1f2f7] px-4 py-10">
      <Link
        href="/"
        aria-label="Back to home"
        className="absolute left-4 top-4 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-50"
      >
        ← Home
      </Link>
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div className="grid md:grid-cols-2">
          <div className="p-6 sm:p-9">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Sign In</h1>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-9 w-9 rounded-full border border-slate-200 bg-white text-sm font-bold text-[#db4437] transition hover:bg-slate-50"
                  aria-label="Login with Google"
                >
                  G
                </button>
                <button
                  type="button"
                  className="h-9 w-9 rounded-full border border-slate-200 bg-white text-sm font-bold text-[#1877f2] transition hover:bg-slate-50"
                  aria-label="Login with Facebook"
                >
                  f
                </button>
              </div>
            </div>

            <form action={formAction} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Username
                </label>
                <input
                  name="username"
                  autoComplete="username"
                  placeholder="Username"
                  className="mt-2 w-full rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
                {state?.fieldErrors?.username ? (
                  <p className="mt-1 text-xs text-red-600">
                    {state.fieldErrors.username}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="w-full rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 pr-20 text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-semibold text-pink-600 hover:bg-pink-50"
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
                className="mt-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 py-2.5 font-semibold text-white transition hover:from-pink-600 hover:to-rose-600"
              >
                Sign In
              </button>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-pink-600">
                  <input type="checkbox" className="h-3.5 w-3.5 accent-pink-500" />
                  Remember me
                </label>
                <button type="button" className="text-slate-500 hover:text-slate-700">
                  Forgot password
                </button>
              </div>

              {state?.message ? (
                <div
                  className={`text-sm ${state.ok ? "text-emerald-600" : "text-red-600"}`}
                >
                  {state.message}
                </div>
              ) : null}
            </form>
          </div>

          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 px-6 py-10 text-center text-white">
            <h2 className="text-3xl font-bold">Welcome to Login</h2>
            <p className="mt-2 text-sm text-white/90">Don&apos;t have an account?</p>
            <Link
              href="/signup"
              className="mt-6 rounded-full border border-white px-6 py-2 text-sm font-semibold transition hover:bg-white hover:text-pink-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
