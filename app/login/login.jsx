"use client";

import { useFormState } from "react-dom";

const initialState = {
  ok: null,
  message: "",
  fieldErrors: {},
};

export default function LoginForm({ action }) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <div className="min-h-screen bg-[#1e1e2e] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-[#161622] text-white rounded-t-xl h-10 flex items-center justify-between px-3">
          <div className="text-sm font-semibold">Admin Login</div>
        </div>

        <div className="bg-[#2a2a40] rounded-b-xl p-5 text-white">
          <form action={formAction} className="flex flex-col gap-4">
            <div>
              <label className="text-sm">Username</label>
              <input
                name="username"
                autoComplete="username"
                className="mt-2 w-full rounded-md bg-[#1e1e2e] text-white px-3 py-2 outline-none border border-transparent focus:border-[#6c63ff]"
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
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-2 w-full rounded-md bg-[#1e1e2e] text-white px-3 py-2 outline-none border border-transparent focus:border-[#6c63ff]"
              />
              {state?.fieldErrors?.password ? (
                <p className="text-xs text-red-300 mt-1">
                  {state.fieldErrors.password}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-[#6c63ff] hover:bg-[#5a54e6] text-white font-semibold py-2 rounded-md"
            >
              Sign In
            </button>

            {state?.message ? (
              <div
                className={`text-sm ${
                  state.ok ? "text-emerald-300" : "text-red-300"
                }`}
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
