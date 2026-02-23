"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPopup() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
        <h2 className="text-lg font-bold text-slate-900">Play More Games</h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to play other online betting games.
        </p>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={() => router.push("/login")}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            OK
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300"
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}
