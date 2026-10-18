# Lyven Supabase data plan

The copy-paste SQL is in [`supabase/lyven_schema.sql`](../supabase/lyven_schema.sql). Run it in **Supabase Dashboard → SQL Editor** using the same project as `.env.local`. It creates the schema, Storage bucket, and access rules. The admin dashboard and public Portfolio/Blog pages now read this schema directly. It does **not** copy records previously saved in browser IndexedDB or upload local browser images; those need a separate migration.

Optionally, run [`supabase/lyven_seed_starter.sql`](../supabase/lyven_seed_starter.sql) **after** the schema. It copies six portfolio entries, eight blog titles/excerpts, and their bundled `/assets/` image references. Portfolio entries are Published. Blog entries are Draft because their individual article bodies are not authored yet; complete and review each one before publishing. The seed does not invent client inquiries or testimonials, and it does not import browser-only edits. Empty tables show dedicated empty states in the admin and public pages.

## What each table holds

| Table | Website/dashboard purpose |
| --- | --- |
| `lyven_admin_users` | Server-managed list of admin Auth UUIDs; not passwords. `owner`/`editor` is stored for future permissions; both currently have the same CMS rights. |
| `lyven_media` | Media Library metadata: name, alt text, placement, dimensions, Storage object path or existing `/assets/` URL. |
| `lyven_projects` | Portfolio card and case-study title, slug, category, summary, description, industry, duration, year, link, thumbnail/header/overview image, featured flag, publishing status. |
| `lyven_project_gallery` | Ordered detail-page gallery images and optional captions, each linked to a project and media item. |
| `lyven_articles` | Blog title, slug, category, excerpt, rich-text HTML, cover image, author details, tags, date, reading time, featured flag, publishing status. |
| `lyven_inquiries` | Contact-form submissions and Inbox fields: sender, project type, budget, timeline, message, received time, status, internal note. |
| `lyven_testimonials` | Client feedback, status, rating, and display order. The admin editor and testimonial components use this table. |

The admin Overview counts are derived from these tables, so it needs no table of its own. The website's About, FAQ, services, navigation, CTA copy, and footer remain code-defined; the dashboard currently has no Site Content editor.

## Admin account setup

1. In **Authentication → Users**, select **Add user** and create or invite an email/password user. Complete email verification. Do not create an Auth account by inserting a password directly into SQL.
2. Copy the user's **UUID** from that Auth page. In SQL Editor, run this with the real UUID and display name:

   ```sql
   insert into public.lyven_admin_users (user_id, display_name, role)
   values ('REPLACE-WITH-AUTH-USER-UUID'::uuid, 'Lyven Admin', 'owner')
   on conflict (user_id) do update
     set display_name = excluded.display_name, role = excluded.role, active = true;
   ```

3. Set the **same UUID** in the server-side `ADMIN_USER_IDS` environment variable and restart Next.js. The current `/admin/login` code checks this environment allowlist; the SQL policies check `lyven_admin_users`. Both must contain the admin until the login code is migrated to the database role list.
4. Keep the Supabase publishable/anon key in `NEXT_PUBLIC_SUPABASE_ANON_KEY`; **never** expose the secret/service-role key in a `NEXT_PUBLIC_` variable. Use the root project URL (`https://PROJECT.supabase.co`), not a `/rest/v1` URL.

To revoke an admin now, set `active = false` in `lyven_admin_users` **and** remove the UUID from `ADMIN_USER_IDS`. For urgent account revocation, also delete/disable the Auth account or revoke its sessions in Supabase.

## Media workflow

- Bucket: `lyven-media`, public-read, 10 MB per file, JPEG/PNG/WebP/AVIF only. Upload, replace, and delete are allowed only for an active admin by Storage policies. Do not insert or delete directly in `storage.objects`; use the Storage API.
- The SQL creates policies for this bucket but cannot neutralize unrelated, pre-existing broad policies on `storage.objects`. Review all Storage policies in the Supabase dashboard before production. If a `lyven-media` bucket already exists, the schema leaves its existing configuration unchanged; confirm it is public and has the expected MIME/size limits.
- The dashboard uploads to a unique `uploads/<uuid>.<extension>` path and inserts a `lyven_media` row with that **relative path**. Its UUID is used in `lyven_projects.thumbnail_media_id`, `hero_media_id`, or `about_media_id`; `lyven_project_gallery` holds ordered screenshots. Blog cover uses `lyven_articles.cover_media_id`.
- Derive display URLs with `supabase.storage.from('lyven-media').getPublicUrl(storage_path)`. Existing bundled images can use `external_url` such as `/assets/img/post_9.jpg` instead. Browser `data:`/base64 images must be uploaded as files before migration.
- Suggested source sizes from the dashboard: portfolio card **1350×1000**, project header **1920×725**, gallery **1480×1000**, blog cover **1600×900**, page background **2160×720**. SQL stores measured dimensions; the upload UI should check them. The public bucket makes even unpublished files accessible to anyone who knows a file URL; use a separate private bucket if draft images must be confidential.
- Foreign keys prevent deleting a media metadata row still referenced by a project or article. When removing an unused asset, delete its `lyven_media` row and then remove the Storage object with the SDK. Deleting the metadata alone does not delete the bytes.

## Access behavior and integration notes

- Anonymous visitors can read only `Published` projects, gallery entries, articles, and testimonials. Media metadata is visible only when referenced by published content. Admins can CRUD these tables and Storage assets.
- `lyven_inquiries` is completely private to admins. The public Contact form currently does not send messages. During integration, add a server endpoint that validates input, checks CAPTCHA/rate limits, and inserts with a **server-only** Supabase secret key (never `NEXT_PUBLIC_`). Do not grant anonymous table inserts without anti-spam protection; RLS alone is not anti-spam.
- `lyven_articles.body_html` must be sanitized on the server before saving and before rendering. SQL constraints and RLS prevent unauthorized writes but do not make arbitrary HTML safe.
- Use Supabase SDK filters and typed inserts/updates, not string-concatenated SQL. The query API is separate from SQL Editor and prevents the usual string-built SQL injection pattern.
- The dashboard and public Portfolio/Blog pages now use `src/lib/supabase-cms.ts` rather than IndexedDB. Browser-local records from the older prototype are not imported automatically. If you need them, export them from the old browser before clearing its storage.
- The public Contact form is still not connected to `lyven_inquiries`: there is no server-only Supabase secret key in the local environment. Inbox can read and manage existing rows, including manually added inquiries. Do not enable anonymous inserts to work around this; add a validated, rate-limited server endpoint when ready to accept public submissions.
