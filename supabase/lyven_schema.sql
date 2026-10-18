-- Lyven CMS schema, designed for a fresh Supabase project.
-- Run once in Supabase Dashboard > SQL Editor as a privileged project owner.
-- This does NOT create Auth users, import browser IndexedDB data, or upload files.
-- Keep the lyven_private schema out of API > Exposed schemas.

begin;

create schema if not exists lyven_private;
revoke all on schema lyven_private from public;
grant usage on schema lyven_private to authenticated;

-- Auth accounts live in auth.users. This is the app's server-controlled role list.
create table if not exists public.lyven_admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'editor' check (role in ('owner', 'editor')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function lyven_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.lyven_admin_users as member
    where member.user_id = (select auth.uid())
      and member.active = true
  );
$$;

revoke all on function lyven_private.is_admin() from public, anon, authenticated;
grant execute on function lyven_private.is_admin() to authenticated;

create or replace function lyven_private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function lyven_private.touch_updated_at() from public, anon, authenticated;

-- Every image is either a Supabase Storage object or an existing /assets image.
-- Store paths, not base64 data or a copied public Storage URL.
create table if not exists public.lyven_media (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 180),
  alt_text text not null default '',
  placement text not null default 'Media library',
  storage_path text unique,
  external_url text,
  original_filename text,
  mime_type text,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes > 0),
  width_px integer check (width_px is null or width_px > 0),
  height_px integer check (height_px is null or height_px > 0),
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lyven_media_one_source check ((storage_path is not null) <> (external_url is not null)),
  constraint lyven_media_external_url check (
    external_url is null or external_url ~ '^(https://|/assets/)'
  ),
  constraint lyven_media_storage_path check (
    storage_path is null or (storage_path <> '' and left(storage_path, 1) <> '/')
  )
);

create unique index if not exists lyven_media_external_url_idx
  on public.lyven_media (external_url) where external_url is not null;

create table if not exists public.lyven_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(btrim(title)) between 1 and 180),
  category text not null check (category in ('Branding', 'UI/UX Design', 'Development')),
  summary text not null default '' check (char_length(summary) <= 500),
  description text not null default '',
  industry text not null default '',
  duration text not null default '',
  project_year text not null default '',
  website_url text check (website_url is null or website_url ~ '^https://'),
  thumbnail_media_id uuid references public.lyven_media(id) on delete restrict,
  hero_media_id uuid references public.lyven_media(id) on delete restrict,
  about_media_id uuid references public.lyven_media(id) on delete restrict,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Takedown')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lyven_projects_list_idx
  on public.lyven_projects (status, sort_order, created_at desc);
create index if not exists lyven_projects_category_idx
  on public.lyven_projects (category, status);

create table if not exists public.lyven_project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.lyven_projects(id) on delete cascade,
  media_id uuid not null references public.lyven_media(id) on delete restrict,
  caption text not null default '',
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now()
);

create index if not exists lyven_project_gallery_order_idx
  on public.lyven_project_gallery (project_id, sort_order, id);
create index if not exists lyven_project_gallery_media_idx
  on public.lyven_project_gallery (media_id);

create table if not exists public.lyven_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(btrim(title)) between 1 and 220),
  category text not null check (category in ('Design', 'Development', 'Strategy', 'Process')),
  excerpt text not null default '' check (char_length(excerpt) <= 500),
  body_html text not null default '',
  cover_media_id uuid references public.lyven_media(id) on delete restrict,
  cover_alt_text text not null default '',
  author_name text not null default 'Lyven Team',
  author_role text not null default '',
  author_description text not null default '',
  tags text[] not null default '{}'::text[],
  publish_date date,
  read_minutes smallint check (read_minutes is null or read_minutes between 1 and 120),
  featured boolean not null default false,
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Takedown')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lyven_articles_list_idx
  on public.lyven_articles (status, publish_date desc, created_at desc);
create index if not exists lyven_articles_category_idx
  on public.lyven_articles (category, status);
create index if not exists lyven_articles_tags_idx
  on public.lyven_articles using gin (tags);

-- Inbox is private. A future validated, rate-limited server endpoint will
-- accept public Contact submissions and insert them with a server-only key.
create table if not exists public.lyven_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 160),
  email text not null check (char_length(email) between 3 and 254 and position('@' in email) > 1),
  company text not null default '' check (char_length(company) <= 180),
  project_type text not null check (char_length(btrim(project_type)) between 1 and 100),
  budget text not null default '' check (char_length(budget) <= 100),
  timeline text not null default '' check (char_length(timeline) <= 100),
  message text not null check (char_length(btrim(message)) between 1 and 10000),
  source text not null default 'website' check (source in ('website', 'manual')),
  status text not null default 'New' check (status in ('New', 'In progress', 'Replied', 'Closed')),
  internal_note text not null default '',
  received_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lyven_inquiries_queue_idx
  on public.lyven_inquiries (status, received_at desc);

-- One legacy service page currently reads `testimoni`; migrate it later to this table.
create table if not exists public.lyven_testimonials (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  message text not null check (char_length(btrim(message)) between 1 and 2000),
  sender_name text not null check (char_length(btrim(sender_name)) between 1 and 160),
  sender_title text not null default '',
  star smallint not null default 5 check (star between 1 and 5),
  sort_order integer not null default 0,
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Takedown')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lyven_testimonials_list_idx
  on public.lyven_testimonials (status, sort_order, created_at desc);

-- Updated-at triggers are recreated safely if this script is rerun.
drop trigger if exists lyven_media_touch on public.lyven_media;
create trigger lyven_media_touch before update on public.lyven_media
  for each row execute function lyven_private.touch_updated_at();
drop trigger if exists lyven_projects_touch on public.lyven_projects;
create trigger lyven_projects_touch before update on public.lyven_projects
  for each row execute function lyven_private.touch_updated_at();
drop trigger if exists lyven_articles_touch on public.lyven_articles;
create trigger lyven_articles_touch before update on public.lyven_articles
  for each row execute function lyven_private.touch_updated_at();
drop trigger if exists lyven_inquiries_touch on public.lyven_inquiries;
create trigger lyven_inquiries_touch before update on public.lyven_inquiries
  for each row execute function lyven_private.touch_updated_at();
drop trigger if exists lyven_testimonials_touch on public.lyven_testimonials;
create trigger lyven_testimonials_touch before update on public.lyven_testimonials
  for each row execute function lyven_private.touch_updated_at();

-- RLS plus SQL grants: both are required. No client can manage admin accounts.
alter table public.lyven_admin_users enable row level security;
alter table public.lyven_media enable row level security;
alter table public.lyven_projects enable row level security;
alter table public.lyven_project_gallery enable row level security;
alter table public.lyven_articles enable row level security;
alter table public.lyven_inquiries enable row level security;
alter table public.lyven_testimonials enable row level security;

revoke all on table public.lyven_admin_users, public.lyven_media,
  public.lyven_projects, public.lyven_project_gallery, public.lyven_articles,
  public.lyven_inquiries, public.lyven_testimonials from public, anon, authenticated;

grant select on public.lyven_admin_users to authenticated;
grant select on public.lyven_media, public.lyven_projects, public.lyven_project_gallery,
  public.lyven_articles, public.lyven_testimonials to anon;
grant select, insert, update, delete on public.lyven_media, public.lyven_projects,
  public.lyven_project_gallery, public.lyven_articles, public.lyven_inquiries,
  public.lyven_testimonials to authenticated;

drop policy if exists lyven_admin_self_read on public.lyven_admin_users;
create policy lyven_admin_self_read on public.lyven_admin_users
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists lyven_projects_public_read on public.lyven_projects;
create policy lyven_projects_public_read on public.lyven_projects
  for select to anon, authenticated using (status = 'Published');
drop policy if exists lyven_projects_admin_read on public.lyven_projects;
create policy lyven_projects_admin_read on public.lyven_projects
  for select to authenticated using ((select lyven_private.is_admin()));
drop policy if exists lyven_projects_admin_insert on public.lyven_projects;
create policy lyven_projects_admin_insert on public.lyven_projects
  for insert to authenticated with check ((select lyven_private.is_admin()));
drop policy if exists lyven_projects_admin_update on public.lyven_projects;
create policy lyven_projects_admin_update on public.lyven_projects
  for update to authenticated using ((select lyven_private.is_admin()))
  with check ((select lyven_private.is_admin()));
drop policy if exists lyven_projects_admin_delete on public.lyven_projects;
create policy lyven_projects_admin_delete on public.lyven_projects
  for delete to authenticated using ((select lyven_private.is_admin()));

drop policy if exists lyven_gallery_public_read on public.lyven_project_gallery;
create policy lyven_gallery_public_read on public.lyven_project_gallery
  for select to anon, authenticated using (
    exists (select 1 from public.lyven_projects as p
      where p.id = project_id and p.status = 'Published')
  );
drop policy if exists lyven_gallery_admin_read on public.lyven_project_gallery;
create policy lyven_gallery_admin_read on public.lyven_project_gallery
  for select to authenticated using ((select lyven_private.is_admin()));
drop policy if exists lyven_gallery_admin_insert on public.lyven_project_gallery;
create policy lyven_gallery_admin_insert on public.lyven_project_gallery
  for insert to authenticated with check ((select lyven_private.is_admin()));
drop policy if exists lyven_gallery_admin_update on public.lyven_project_gallery;
create policy lyven_gallery_admin_update on public.lyven_project_gallery
  for update to authenticated using ((select lyven_private.is_admin()))
  with check ((select lyven_private.is_admin()));
drop policy if exists lyven_gallery_admin_delete on public.lyven_project_gallery;
create policy lyven_gallery_admin_delete on public.lyven_project_gallery
  for delete to authenticated using ((select lyven_private.is_admin()));

drop policy if exists lyven_articles_public_read on public.lyven_articles;
create policy lyven_articles_public_read on public.lyven_articles
  for select to anon, authenticated using (status = 'Published');
drop policy if exists lyven_articles_admin_read on public.lyven_articles;
create policy lyven_articles_admin_read on public.lyven_articles
  for select to authenticated using ((select lyven_private.is_admin()));
drop policy if exists lyven_articles_admin_insert on public.lyven_articles;
create policy lyven_articles_admin_insert on public.lyven_articles
  for insert to authenticated with check ((select lyven_private.is_admin()));
drop policy if exists lyven_articles_admin_update on public.lyven_articles;
create policy lyven_articles_admin_update on public.lyven_articles
  for update to authenticated using ((select lyven_private.is_admin()))
  with check ((select lyven_private.is_admin()));
drop policy if exists lyven_articles_admin_delete on public.lyven_articles;
create policy lyven_articles_admin_delete on public.lyven_articles
  for delete to authenticated using ((select lyven_private.is_admin()));

-- Media metadata is public only when used by published work/articles.
drop policy if exists lyven_media_public_read on public.lyven_media;
create policy lyven_media_public_read on public.lyven_media
  for select to anon, authenticated using (
    exists (select 1 from public.lyven_projects as p
      where p.status = 'Published' and lyven_media.id in (p.thumbnail_media_id, p.hero_media_id, p.about_media_id))
    or exists (select 1 from public.lyven_project_gallery as g
      join public.lyven_projects as p on p.id = g.project_id
      where p.status = 'Published' and g.media_id = lyven_media.id)
    or exists (select 1 from public.lyven_articles as a
      where a.status = 'Published' and a.cover_media_id = lyven_media.id)
  );
drop policy if exists lyven_media_admin_read on public.lyven_media;
create policy lyven_media_admin_read on public.lyven_media
  for select to authenticated using ((select lyven_private.is_admin()));
drop policy if exists lyven_media_admin_insert on public.lyven_media;
create policy lyven_media_admin_insert on public.lyven_media
  for insert to authenticated with check ((select lyven_private.is_admin()));
drop policy if exists lyven_media_admin_update on public.lyven_media;
create policy lyven_media_admin_update on public.lyven_media
  for update to authenticated using ((select lyven_private.is_admin()))
  with check ((select lyven_private.is_admin()));
drop policy if exists lyven_media_admin_delete on public.lyven_media;
create policy lyven_media_admin_delete on public.lyven_media
  for delete to authenticated using ((select lyven_private.is_admin()));

drop policy if exists lyven_inquiries_public_insert on public.lyven_inquiries;
drop policy if exists lyven_inquiries_admin_read on public.lyven_inquiries;
create policy lyven_inquiries_admin_read on public.lyven_inquiries
  for select to authenticated using ((select lyven_private.is_admin()));
drop policy if exists lyven_inquiries_admin_insert on public.lyven_inquiries;
create policy lyven_inquiries_admin_insert on public.lyven_inquiries
  for insert to authenticated with check ((select lyven_private.is_admin()));
drop policy if exists lyven_inquiries_admin_update on public.lyven_inquiries;
create policy lyven_inquiries_admin_update on public.lyven_inquiries
  for update to authenticated using ((select lyven_private.is_admin()))
  with check ((select lyven_private.is_admin()));
drop policy if exists lyven_inquiries_admin_delete on public.lyven_inquiries;
create policy lyven_inquiries_admin_delete on public.lyven_inquiries
  for delete to authenticated using ((select lyven_private.is_admin()));

drop policy if exists lyven_testimonials_public_read on public.lyven_testimonials;
create policy lyven_testimonials_public_read on public.lyven_testimonials
  for select to anon, authenticated using (status = 'Published');
drop policy if exists lyven_testimonials_admin_read on public.lyven_testimonials;
create policy lyven_testimonials_admin_read on public.lyven_testimonials
  for select to authenticated using ((select lyven_private.is_admin()));
drop policy if exists lyven_testimonials_admin_insert on public.lyven_testimonials;
create policy lyven_testimonials_admin_insert on public.lyven_testimonials
  for insert to authenticated with check ((select lyven_private.is_admin()));
drop policy if exists lyven_testimonials_admin_update on public.lyven_testimonials;
create policy lyven_testimonials_admin_update on public.lyven_testimonials
  for update to authenticated using ((select lyven_private.is_admin()))
  with check ((select lyven_private.is_admin()));
drop policy if exists lyven_testimonials_admin_delete on public.lyven_testimonials;
create policy lyven_testimonials_admin_delete on public.lyven_testimonials
  for delete to authenticated using ((select lyven_private.is_admin()));

-- Website images are public to view by URL, but only admins can list/upload/edit/delete.
-- Draft images are therefore not confidential if someone knows their URL.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lyven-media', 'lyven-media', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']::text[]
)
on conflict (id) do nothing;

drop policy if exists lyven_storage_admin_read on storage.objects;
create policy lyven_storage_admin_read on storage.objects
  for select to authenticated using (
    bucket_id = 'lyven-media' and (select lyven_private.is_admin())
  );
drop policy if exists lyven_storage_admin_insert on storage.objects;
create policy lyven_storage_admin_insert on storage.objects
  for insert to authenticated with check (
    bucket_id = 'lyven-media' and (select lyven_private.is_admin())
  );
drop policy if exists lyven_storage_admin_update on storage.objects;
create policy lyven_storage_admin_update on storage.objects
  for update to authenticated using (
    bucket_id = 'lyven-media' and (select lyven_private.is_admin())
  ) with check (
    bucket_id = 'lyven-media' and (select lyven_private.is_admin())
  );
drop policy if exists lyven_storage_admin_delete on storage.objects;
create policy lyven_storage_admin_delete on storage.objects
  for delete to authenticated using (
    bucket_id = 'lyven-media' and (select lyven_private.is_admin())
  );

commit;
