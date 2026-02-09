"use server";

import { createGameResult } from "../lib/create.jsx";

const buildError = (message, fieldErrors = {}) => ({
  ok: false,
  message,
  fieldErrors,
});

export async function submitGameResult(prevState, formData) {
  const gameRaw = formData.get("game");
  const resultRaw = formData.get("result");
  const resultDateRaw = formData.get("result_date");

  if (!gameRaw || gameRaw === "select") {
    return buildError("Please select a game.", { game: "Select a game." });
  }

  if (!resultRaw) {
    return buildError("Result value is required.", {
      result: "Result is required.",
    });
  }

  if (!/^\d+$/.test(resultRaw)) {
    return buildError("Result must be a whole number.", {
      result: "Only digits allowed.",
    });
  }

  const result = Number(resultRaw);
  if (Number.isNaN(result) || !Number.isInteger(result)) {
    return buildError("Result must be an integer.", {
      result: "Result must be an integer.",
    });
  }

  if (result <= 0) {
    return buildError("Result must be greater than 0.", {
      result: "Must be greater than 0.",
    });
  }

  if (result > 100) {
    return buildError("Result must be less than or equal to 100.", {
      result: "Must be 100 or less.",
    });
  }

  if (!resultDateRaw) {
    return buildError("Result date is required.", {
      result_date: "Result date is required.",
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(resultDateRaw)) {
    return buildError("Date must be in YYYY-MM-DD format.", {
      result_date: "Use YYYY-MM-DD.",
    });
  }

  const parsed = new Date(resultDateRaw);
  if (Number.isNaN(parsed.getTime())) {
    return buildError("Invalid date.", { result_date: "Invalid date." });
  }

  let game;
  try {
    game = JSON.parse(gameRaw);
  } catch (error) {
    return buildError("Invalid game selection.", {
      game: "Invalid game selection.",
    });
  }

  const ok = await createGameResult(
    result,
    game.name,
    resultDateRaw,
    game.id,
    game.code_name
  );

  if (!ok) {
    return buildError("Failed to save result. Try again.");
  }

  return {
    ok: true,
    message: `Game ${game.name} result saved: ${result}`,
    fieldErrors: {},
  };
}
