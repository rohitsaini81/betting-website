"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const COLORS = [
  { name: "Red", className: "bg-red-500" },
  { name: "Green", className: "bg-green-500" },
  { name: "Blue", className: "bg-blue-500" },
  { name: "Yellow", className: "bg-yellow-400" },
  { name: "Orange", className: "bg-orange-500" },
  { name: "Purple", className: "bg-purple-500" },
  { name: "Pink", className: "bg-pink-500" },
  { name: "Teal", className: "bg-teal-500" },
  { name: "Indigo", className: "bg-indigo-500" },
  { name: "Lime", className: "bg-lime-500" },
];

export default function ColorGuessGamePage() {
  const [balance, setBalance] = useState(1000);
  const [betInput, setBetInput] = useState("50");
  const [selectedColor, setSelectedColor] = useState(null);
  const [resultColor, setResultColor] = useState(null);
  const [status, setStatus] = useState("Choose a color and place your bet.");
  const [isRolling, setIsRolling] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const countdownIntervalRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (revealTimeoutRef.current) {
        clearTimeout(revealTimeoutRef.current);
      }
    };
  }, []);

  const playRound = () => {
    if (isRolling) return;

    const bet = Number(betInput);
    if (!Number.isFinite(bet) || bet <= 0) {
      setStatus("Enter a valid bet amount.");
      return;
    }
    if (!selectedColor) {
      setStatus("Select one color from the color keyboard.");
      return;
    }
    if (bet > balance) {
      setStatus("Insufficient balance.");
      return;
    }

    setIsRolling(true);
    setCountdown(5);
    setStatus("Bet placed. Result in 5 seconds...");

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    revealTimeoutRef.current = setTimeout(() => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      const rolledColor =
        COLORS[Math.floor(Math.random() * COLORS.length)].name;
      setResultColor(rolledColor);
      setIsRolling(false);
      setCountdown(0);

      if (rolledColor === selectedColor) {
        const payout = bet * 9;
        const profit = payout - bet;
        setBalance((prev) => prev + profit);
        setStatus(`${rolledColor} hit! You won ${profit.toFixed(2)}.`);
        return;
      }

      setBalance((prev) => prev - bet);
      setStatus(`${rolledColor} came out. You lost ${bet.toFixed(2)}.`);
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto w-full max-w-xl rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-300">Color Guess Bet Game</h1>
          <Link
            href="/playible-online-games"
            className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600"
          >
            Back
          </Link>
        </div>

        <p className="rounded-md bg-slate-800 px-3 py-2 text-sm">
          Balance: <span className="font-semibold">{balance.toFixed(2)}</span>
        </p>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm text-slate-300">Bet Amount</span>
            <input
              type="number"
              min="1"
              value={betInput}
              onChange={(e) => setBetInput(e.target.value)}
              disabled={isRolling}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>

          <div>
            <p className="mb-2 text-sm text-slate-300">Color Keyboard (10 colors)</p>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  disabled={isRolling}
                  className={`rounded-md px-3 py-2 text-sm font-semibold ${
                    selectedColor === color.name
                      ? "ring-2 ring-white"
                      : "ring-1 ring-slate-700"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <span
                    className={`mx-auto mb-1 block h-7 w-7 rounded-full ${color.className}`}
                  />
                  <span className="text-xs">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={playRound}
          disabled={isRolling}
          className="mt-4 w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRolling ? `Waiting... ${countdown}s` : "Place Bet"}
        </button>

        <div className="mt-4 rounded-md border border-slate-700 bg-slate-950 p-3 text-sm">
          <p>Selected Color: {selectedColor ?? "-"}</p>
          <p>Result Color: {resultColor ?? "-"}</p>
          <p className="mt-1 text-emerald-300">{status}</p>
          <p className="mt-2 text-slate-400">Payout: 9x total on correct color.</p>
        </div>
      </div>
    </main>
  );
}
