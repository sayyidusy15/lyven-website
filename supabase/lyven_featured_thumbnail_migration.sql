-- Run once in Supabase SQL Editor before saving projects from the updated admin.
-- Adds a separate image for homepage-featured portfolio cards.
-- Existing featured projects keep using their portfolio thumbnail until assigned.

begin;

alter table public.lyven_projects
  add column if not exists featured_thumbnail_media_id uuid
  references public.lyven_media(id) on delete restrict;

-- Anonymous visitors must be able to read the media record when a published
-- project's homepage-only thumbnail is different from its portfolio thumbnail.
drop policy if exists lyven_media_public_read on public.lyven_media;
create policy lyven_media_public_read on public.lyven_media
  for select to anon, authenticated using (
    exists (select 1 from public.lyven_projects as p
      where p.status = 'Published'
        and lyven_media.id in (
          p.thumbnail_media_id,
          p.featured_thumbnail_media_id,
          p.hero_media_id,
          p.about_media_id
        ))
    or exists (select 1 from public.lyven_project_gallery as g
      join public.lyven_projects as p on p.id = g.project_id
      where p.status = 'Published' and g.media_id = lyven_media.id)
    or exists (select 1 from public.lyven_articles as a
      where a.status = 'Published' and a.cover_media_id = lyven_media.id)
  );

commit;
