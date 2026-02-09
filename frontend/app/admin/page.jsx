import AdminForm from "./admin.jsx";
import { submitGameResult } from "./actions.js";
import { getAllGames } from "../lib/create.jsx";

export default async function AdminPage() {
  const games = (await getAllGames()) || [];
  const gameOptions = games.map((game) => ({
    id: game.id,
    code_name: game.code,
    name: game.formal_name,
  }));

  return <AdminForm games={gameOptions} action={submitGameResult} />;
}
