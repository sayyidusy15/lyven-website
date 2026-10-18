# Admin access setup

The admin portal is at `/admin/login`. The path is intentionally ordinary: access is enforced by Supabase Auth and a server-only allowlist, not by hiding the URL.

1. In Supabase Authentication, create an email/password user for each admin and confirm their email address. Do not add public sign-up to this portal.
2. Copy each user's **Auth user ID (UUID)**. Set `ADMIN_USER_IDS` in `.env.local` and in the production server environment, separating multiple UUIDs with commas. Use `.env.example` as a template. Restart the Next.js server after changing environment variables.
3. Keep `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured. The publishable/anon key is expected to be public; **never** put a service-role key in client code or a `NEXT_PUBLIC_` variable.
4. Sign in at `/admin/login`. With no allowlisted UUIDs, access is denied by default. Use the sign-out button in the dashboard header when done.

The server validates the Supabase user on each dashboard request and checks the allowlist. Login failures use a generic message. Supabase Auth handles password verification and rate limits; there are no hand-built SQL queries in the login flow. For a public deployment, enable appropriate Supabase Auth password policy, MFA, bot protection, and monitoring.

**Current limitation:** The dashboard's portfolio, blog, media, and sample inquiry records still live in browser IndexedDB. This login protects the admin interface, but browser-local data is not a secure or shared content database. Before production content management, migrate CRUD and uploads to server-authorized Supabase tables/Storage with row-level security and private write policies. Do not treat an admin UI check as a database permission boundary.
