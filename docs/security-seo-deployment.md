# Security and SEO release checklist

The application now server-renders published portfolio/blog content, sanitizes article HTML on save and render, uses Supabase's filtered queries and RLS, and sends security headers. This is defense in depth, not a guarantee against every attack.

## Before deploying

1. Set `SITE_URL=https://your-final-domain` before the production build, not only when starting the server: public metadata and `robots.txt` can be prerendered. Use the one canonical hostname you will keep (with or without `www`) and redirect the other hostname to it at the hosting layer. Leave `SITE_URL` unset for preview deployments. When it is missing, the site deliberately emits `noindex`, blocks crawlers in `robots.txt`, and leaves the sitemap empty so preview/local URLs cannot be indexed by mistake.
2. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the server-only `ADMIN_USER_IDS`. Never expose a service-role key. Keep Supabase `lyven_private` out of exposed API schemas. Review all existing table and Storage policies, not just policies in `lyven_schema.sql`.
3. Enable MFA, a strong password policy, and bot protection in Supabase Auth. Review its login rate limits and Auth logs. Disable public sign-up if admins are provisioned manually. Revoke a departing admin in Auth, `lyven_admin_users`, and `ADMIN_USER_IDS`.
4. Put production behind a CDN/WAF with DDoS protection and rate limits for `/admin/login`, `/admin`, and application/API traffic. Rate limiting in a single Next.js process is not a reliable DDoS defense across instances. Configure alerts and request logging at the hosting layer.
5. Enforce HTTPS and a trusted production host. The application sends HSTS in production but does not assert `includeSubDomains` until every subdomain is known to support HTTPS. The CSP intentionally permits inline Next.js scripts and styles for compatibility; it is not a strict nonce-based XSS policy. Keep dependencies updated and do not bypass the HTML sanitizer.
6. Confirm Supabase Storage only accepts the intended image MIME types and size limit. Public bucket URLs, including draft uploads, are accessible to anyone who knows the URL; use a private bucket if drafts must be confidential.

## After deploying

1. Open `/robots.txt` and `/sitemap.xml` on the final domain. The sitemap lists only published articles/projects and canonical public pages. `/admin` and unused template routes send `noindex, nofollow` headers; crawlers must be allowed to read those headers, so these paths are not blocked in production `robots.txt`.
2. Add the canonical property to Google Search Console and submit `https://your-final-domain/sitemap.xml`. Use URL Inspection on the home page, one published article, and one portfolio detail page; verify their rendered HTML, canonical URL, and image.
3. Check security headers on production responses and test admin sign-in, sign-out, and denied access with a non-admin account. Keep regular backups and monitor Supabase/Auth and hosting logs.

Google indexing and ranking are not guaranteed by metadata or a sitemap. Continue publishing useful original content and maintain working links and images.
