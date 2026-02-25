"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NumberGuessGamePage() {
  const [balance, setBalance] = useState(1000);
  const [betInput, setBetInput] = useState("50");
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [status, setStatus] = useState("Pick a number from 1 to 10 and place your bet.");
  const [lastRoll, setLastRoll] = useState(null);
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
    if (!selectedNumber) {
      setStatus("Select a number from the keyboard.");
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
      const roll = Math.floor(Math.random() * 10) + 1;
      setLastRoll(roll);
      setIsRolling(false);
      setCountdown(0);

      if (roll === selectedNumber) {
        const payout = bet * 9;
        const profit = payout - bet;
        setBalance((prev) => prev + profit);
        setStatus(`Exact hit ${roll}! You won ${profit.toFixed(2)}.`);
        return;
      }

      setBalance((prev) => prev - bet);
      setStatus(`Rolled ${roll}. You lost ${bet.toFixed(2)}.`);
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto w-full max-w-xl rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amber-300">Number Guess Bet Game</h1>
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
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </label>

          <div>
            <p className="mb-2 text-sm text-slate-300">Number Keyboard (1-10)</p>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedNumber(num)}
                  disabled={isRolling}
                  className={`rounded-md px-3 py-2 text-sm font-semibold ${
                    selectedNumber === num
                      ? "bg-amber-400 text-slate-900"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={playRound}
          disabled={isRolling}
          className="mt-4 w-full rounded-md bg-amber-400 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRolling ? `Waiting... ${countdown}s` : "Place Bet"}
        </button>

        <div className="mt-4 rounded-md border border-slate-700 bg-slate-950 p-3 text-sm">
          <p>Selected Number: {selectedNumber ?? "-"}</p>
          <p>Last Number: {lastRoll ?? "-"}</p>
          <p className="mt-1 text-amber-300">{status}</p>
          <p className="mt-2 text-slate-400">Payout: 9x total on exact match.</p>
        </div>
      </div>
    </main>
  );
}
