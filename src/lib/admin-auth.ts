import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.ADMIN_USER_IDS?.trim(),
  );
}

function allowedAdminIds() {
  return new Set(
    (process.env.ADMIN_USER_IDS ?? "")
      .split(",")
      .map((id) => id.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAllowedAdmin(user: { id: string; email_confirmed_at?: string | null }) {
  return Boolean(user.email_confirmed_at && allowedAdminIds().has(user.id.toLowerCase()));
}

export async function isActiveAdminMember(
  supabase: NonNullable<Awaited<ReturnType<typeof createAdminAuthClient>>>,
  user: { id: string; email_confirmed_at?: string | null },
) {
  if (!isAllowedAdmin(user)) return false;
  const { data, error } = await supabase.from("lyven_admin_users")
    .select("active").eq("user_id", user.id).maybeSingle();
  return !error && data?.active === true;
}

export async function createAdminAuthClient() {
  if (!isAdminAuthConfigured()) return null;

  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { sameSite: "lax", secure: process.env.NODE_ENV === "production" },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(items) {
          try {
            items.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Components cannot set cookies; the proxy refreshes sessions.
          }
        },
      },
    },
  );
}

export async function getAdminUser() {
  const supabase = await createAdminAuthClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user || !(await isActiveAdminMember(supabase, data.user))) return null;
    return data.user;
  } catch {
    return null;
  }
}
