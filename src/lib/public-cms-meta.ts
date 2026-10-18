import "server-only";
import { createClient } from "@supabase/supabase-js";

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function publicProjectMeta(slug: string) {
  const client = publicClient();
  if (!client) return null;
  try {
    const { data } = await client.from("lyven_projects").select("title,summary").eq("slug", slug).eq("status", "Published").maybeSingle();
    return data;
  } catch { return null; }
}

export async function publicArticleMeta(slug: string) {
  const client = publicClient();
  if (!client) return null;
  try {
    const { data } = await client.from("lyven_articles").select("title,excerpt").eq("slug", slug).eq("status", "Published").maybeSingle();
    return data;
  } catch { return null; }
}
