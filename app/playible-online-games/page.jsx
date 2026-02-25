import Link from "next/link";

export default function PlayibleOnlineGamesPage() {
  const games = [
    { name: "Teen Patti", href: null, highlighted: false },
    { name: "Rummy", href: null, highlighted: false },
    { name: "Poker", href: null, highlighted: false },
    { name: "Ludo", href: null, highlighted: false },
    { name: "Carrom", href: null, highlighted: false },
    { name: "Chess", href: null, highlighted: false },
    {
      name: "Stake",
      href: "/playible-online-games/stake",
      highlighted: true,
    },
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
              key={game.name}
              className={`rounded-lg border p-4 shadow-sm ${
                game.highlighted
                  ? "border-amber-300 bg-amber-100"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p className="font-semibold text-slate-800">{game.name}</p>
              <p className="mt-1 text-sm text-slate-500">Available online</p>
              {game.href ? (
                <Link
                  href={game.href}
                  className="mt-3 inline-block rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Play Stake
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
