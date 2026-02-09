"use client";

import { useFormState } from "react-dom";

const initialState = {
  ok: null,
  message: "",
  fieldErrors: {},
};

export default function AdminForm({ games, action }) {
  const [state, formAction] = useFormState(action, initialState);
  const defaultDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#1e1e2e] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-[#161622] text-white rounded-t-xl h-10 flex items-center justify-between px-3">
          <div className="text-sm font-semibold">Game Form</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-white/80 hover:text-white text-sm"
              aria-label="Minimize"
            >
              —
            </button>
            <button
              type="button"
              className="text-white/80 hover:text-white text-xs"
              aria-label="Maximize"
            >
              ⬜
            </button>
            <button
              type="button"
              className="text-red-400 hover:text-red-300 text-sm"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="bg-[#2a2a40] rounded-b-xl p-5 text-white">
          <form action={formAction} className="flex flex-col gap-4">
            <div>
              <label className="text-sm">Game</label>
              <select
                name="game"
                defaultValue="select"
                className="mt-2 w-full rounded-md bg-[#1e1e2e] text-white px-3 py-2 outline-none border border-transparent focus:border-[#6c63ff]"
              >
                <option value="select">Select a game</option>
                {games.map((game) => (
                  <option
                    key={game.id}
                    value={JSON.stringify(game)}
                  >
                    {game.name}
                  </option>
                ))}
              </select>
              {state?.fieldErrors?.game ? (
                <p className="text-xs text-red-300 mt-1">
                  {state.fieldErrors.game}
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm">Result</label>
              <input
                name="result"
                inputMode="numeric"
                className="mt-2 w-full rounded-md bg-[#1e1e2e] text-white px-3 py-2 outline-none border border-transparent focus:border-[#6c63ff]"
              />
              {state?.fieldErrors?.result ? (
                <p className="text-xs text-red-300 mt-1">
                  {state.fieldErrors.result}
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm">Result Date (YYYY-MM-DD)</label>
              <input
                name="result_date"
                defaultValue={defaultDate}
                className="mt-2 w-full rounded-md bg-[#1e1e2e] text-white px-3 py-2 outline-none border border-transparent focus:border-[#6c63ff]"
              />
              {state?.fieldErrors?.result_date ? (
                <p className="text-xs text-red-300 mt-1">
                  {state.fieldErrors.result_date}
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm">Description (optional)</label>
              <textarea
                name="description"
                rows={4}
                className="mt-2 w-full rounded-md bg-[#1e1e2e] text-white px-3 py-2 outline-none border border-transparent focus:border-[#6c63ff]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#6c63ff] hover:bg-[#5a54e6] text-white font-semibold py-2 rounded-md"
            >
              Submit
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
