import Link from "next/link";

export default function PlayibleOnlineGamesPage() {
  const games = [
    "Teen Patti",
    "Rummy",
    "Poker",
    "Ludo",
    "Carrom",
    "Chess",
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Playible Online Games
          </h1>
          <Link
            href="/"
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-slate-800">{game}</p>
              <p className="mt-1 text-sm text-slate-500">Available online</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
