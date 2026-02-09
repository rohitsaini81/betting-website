import AdminForm from "./admin.jsx";
import { submitGameResult } from "./actions.js";
import { getAllGames } from "../lib/create.js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("admin_auth")?.value === "1";
  if (!isAuthed) {
    redirect("/login");
  }

  const games = (await getAllGames()) || [];
  const gameOptions = games.map((game) => ({
    id: game.id,
    code_name: game.code,
    name: game.formal_name,
  }));

  return <AdminForm games={gameOptions} action={submitGameResult} />;
}
