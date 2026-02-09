import { Client } from "pg";
const hostname = process.env.HOST;
const port = process.env.PGPORT || "5432";
const database = process.env.PGDATABASE || "postgres";
const username = process.env.PGUSER || "postgres";
const password = process.env.PG_PASSWORD || process.env.PASSWORD;

if (!password) {
  throw new Error("PG_PASSWORD (or PASSWORD) environment variable is not set");
}
export const create = () => "Some data created";

export const createConnection = async () => {
  const client = new Client({
    host: hostname,
    port,
    database,
    user: username,
    password,
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const createGameResult = async (
  result,
  formal_name,
  result_date,
  game_id,
  code
) => {
  const client = await createConnection();
  if (!client) return null;

  try {
    const insertQuery = `
      INSERT INTO "happy-game-result"
      (result, formal_name, result_date, game_id, code)
      VALUES ($1, $2, $3, $4, $5);
    `;

    await client.query(insertQuery, [
      result,
      formal_name,
      result_date,
      game_id,
      code,
    ]);

    return true;
  } catch (error) {
    console.error("Error inserting game result:", error);
    return false;
  } finally {
    await client.end();
  }
};

export const findGameResult = async ({
  result_id = null,
  formal_name = null,
  game_id = null,
  code = null,
} = {}) => {
  const client = await createConnection();
  if (!client) return null;

  try {
    const conditions = [];
    const params = [];

    if (result_id) {
      conditions.push(`id = $${params.length + 1}`);
      params.push(result_id);
    }

    if (formal_name) {
      conditions.push(`formal_name ILIKE $${params.length + 1}`);
      params.push(`%${formal_name}%`);
    }

    if (game_id) {
      conditions.push(`game_id = $${params.length + 1}`);
      params.push(game_id);
    }

    if (code) {
      conditions.push(`code ILIKE $${params.length + 1}`);
      params.push(`%${code}%`);
    }

    if (conditions.length === 0) {
      return { error: "No search parameters provided" };
    }

    const query = `
      SELECT *
      FROM "happy-game-result"
      WHERE ${conditions.join(" OR ")};
    `;

    const result = await client.query(query, params);
    return result.rows.length ? result.rows : null;
  } catch (error) {
    console.error("Error fetching game results:", error);
    return null;
  } finally {
    await client.end();
  }
};

export const getAllGames = async () => {
  const client = await createConnection();
  if (!client) return null;

  try {
    const query = `
      SELECT id, code, formal_name
      FROM games
      ORDER BY formal_name;
    `;

    const result = await client.query(query);
    return result.rows || [];
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  } finally {
    await client.end();
  }
};
