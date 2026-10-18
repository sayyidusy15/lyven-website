"use server";

import { redirect } from "next/navigation";
import { createAdminAuthClient, isAllowedAdmin, isAdminAuthConfigured } from "../../lib/admin-auth";

export type LoginState = { error: string };

export async function loginAdmin(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminAuthConfigured()) return { error: "Admin sign-in is not configured yet." };

  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string" ||
      !email.trim() || email.length > 254 || !password || password.length > 1024) {
    return { error: "Enter a valid email and password." };
  }

  const supabase = await createAdminAuthClient();
  if (!supabase) return { error: "Admin sign-in is not configured yet." };

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error || !data.user || !isAllowedAdmin(data.user)) {
      if (data.user) await supabase.auth.signOut();
      return { error: "Invalid credentials or account access." };
    }
  } catch {
    return { error: "Sign-in is temporarily unavailable. Please try again." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createAdminAuthClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
