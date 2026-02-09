"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import initialState from "./state";

export async function loginAction(_prevState, formData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();

  const fieldErrors = {};
  if (!username) fieldErrors.username = "Username is required";
  if (!password) fieldErrors.password = "Password is required";

  if (Object.keys(fieldErrors).length > 0) {
    return { ...initialState, ok: false, message: "Fix the errors below.", fieldErrors };
  }

  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return {
      ...initialState,
      ok: false,
      message: "Admin credentials are not configured on the server.",
    };
  }

  if (username !== expectedUser || password !== expectedPass) {
    return { ...initialState, ok: false, message: "Invalid username or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });

  redirect("/admin");
}
