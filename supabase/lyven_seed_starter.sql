-- OPTIONAL starter rows copied from the repository's current static showcase/blog lists.
-- Run AFTER lyven_schema.sql. This does not overwrite existing rows.
-- Blog entries stay Draft because the repository uses shared placeholder article body text.
-- Browser IndexedDB records and actual Storage files are NOT imported here.

begin;

insert into public.lyven_media (name, alt_text, placement, external_url) values
  ('Page header', 'Blue abstract page background', 'Page background', '/assets/img/header-page.png'),
  ('Services header', 'Digital product visuals', 'Page background', '/assets/img/what-we-do-header.png'),
  ('Consultation CTA', 'Blue abstract CTA background', 'CTA background', '/assets/img/CTA.png'),
  ('Qwibly thumbnail', 'Qwibly project preview', 'Portfolio thumbnail', '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_26 PM-1.png'),
  ('MySchoolMate thumbnail', 'MySchoolMate project preview', 'Portfolio thumbnail', '/assets/img/my-schoolmate1.png'),
  ('Muslim 101 thumbnail', 'Muslim 101 project preview', 'Portfolio thumbnail', '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_29 PM-3.png'),
  ('POS Haji Wong Halal thumbnail', 'POS Haji Wong Halal project preview', 'Portfolio thumbnail', '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_30 PM-4.png'),
  ('Photobox thumbnail', 'Photobox project preview', 'Portfolio thumbnail', '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_31 PM-5.png'),
  ('Featured article', 'Modern curved building', 'Blog cover', '/assets/img/post_9.jpg'),
  ('Real users article', 'Abstract blue architectural form', 'Blog cover', '/assets/img/post_6.jpg'),
  ('Scalable web apps article', 'Code displayed on a dark screen', 'Blog cover', '/assets/img/post_10.jpg'),
  ('Process article', 'Layered white architectural details', 'Blog cover', '/assets/img/post_8.jpg'),
  ('UI/UX article', 'Minimal workspace with a laptop', 'Blog cover', '/assets/img/post_7.jpg'),
  ('Tech stack article', 'Contemporary office building facade', 'Blog cover', '/assets/img/post_11.jpg'),
  ('Design systems article', 'Abstract architectural composition', 'Blog cover', '/assets/img/post_12.jpg'),
  ('Product strategy article', 'Modern workspace', 'Blog cover', '/assets/img/post_13.jpg')
on conflict do nothing;

with source (slug, title, category, summary, description, industry, duration, project_year, image_url, featured, sort_order) as (
  values
    ('humic-engineering', 'Humic Engineering', 'Development',
      'Company profile and product showcase for an industrial engineering company.',
      'Humic Engineering needed a modern website to showcase its services and company profile, with a clear, responsive visual identity.',
      'Industrial Engineering', '3 Weeks', '2025', null::text, false, 1),
    ('qwibly', 'Qwibly', 'Development',
      'Internal tools and workflow automation for modern teams.',
      'Internal tools and workflow automation for modern teams.', '', '', '',
      '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_26 PM-1.png', true, 2),
    ('myschoolmate', 'MySchoolMate', 'UI/UX Design',
      'School discovery and comparison platform for parents and students.',
      'School discovery and comparison platform for parents and students.', '', '', '',
      '/assets/img/my-schoolmate1.png', true, 3),
    ('muslim-101', 'Muslim 101', 'Branding',
      'Visual identity and digital assets for an Islamic education platform.',
      'Visual identity and digital assets for an Islamic education platform.', '', '', '',
      '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_29 PM-3.png', true, 4),
    ('pos-haji-wong-halal', 'POS Haji Wong Halal', 'Development',
      'Point-of-sale application for a fast and practical retail workflow.',
      'Point-of-sale application for a fast and practical retail workflow.', '', '', '',
      '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_30 PM-4.png', true, 5),
    ('photobox', 'Photobox', 'UI/UX Design',
      'A modern digital experience for event documentation services.',
      'A modern digital experience for event documentation services.', '', '', '',
      '/assets/img/ChatGPT Image Oct 8, 2026, 06_29_31 PM-5.png', true, 6)
)
insert into public.lyven_projects
  (slug, title, category, summary, description, industry, duration, project_year,
   thumbnail_media_id, featured, sort_order, status)
select s.slug, s.title, s.category, s.summary, s.description, s.industry, s.duration,
  s.project_year, m.id, s.featured, s.sort_order, 'Published'
from source as s
left join public.lyven_media as m on m.external_url = s.image_url
on conflict (slug) do nothing;

with source (slug, category, title, excerpt, publish_date, read_minutes, image_url, tags, featured) as (
  values
    ('designing-digital-products-that-actually-work', 'Strategy',
      'Designing Digital Products That Actually Work',
      'How strategy, design, and development come together to create relevant, usable digital products.',
      '2026-09-20'::date, 8, '/assets/img/post_9.jpg', array['business','strategy','product process']::text[], true),
    ('designing-for-real-users-not-just-screens', 'Design',
      'Designing for Real Users, Not Just Screens',
      'A design approach that begins with real user needs, not just interface aesthetics.',
      '2026-09-15'::date, 4, '/assets/img/post_6.jpg', array['design','ui ux','users']::text[], false),
    ('practical-guide-building-scalable-web-apps', 'Development',
      'A Practical Guide to Building Scalable Web Apps',
      'Technical principles that keep web applications fast, maintainable, and ready to scale.',
      '2026-09-10'::date, 6, '/assets/img/post_10.jpg', array['development','web apps','technology','scalable']::text[], false),
    ('how-we-work-from-brief-to-launch', 'Process',
      'How We Work: From Brief to Launch',
      'A look at Lyven’s collaborative process, from understanding the brief to product launch.',
      '2026-08-28'::date, 5, '/assets/img/post_8.jpg', array['process','brief','launch','collaboration']::text[], false),
    ('role-of-ui-ux-in-digital-product-success', 'Design',
      'The Role of UI/UX in Digital Product Success',
      'Why a clear, intuitive experience plays a central role in digital product success.',
      '2026-08-22'::date, 5, '/assets/img/post_7.jpg', array['design','ui ux','digital product']::text[], false),
    ('choosing-the-right-tech-stack-for-your-project', 'Development',
      'Choosing the Right Tech Stack for Your Project',
      'How to assess product needs, constraints, and goals before choosing the technology stack.',
      '2026-08-12'::date, 7, '/assets/img/post_11.jpg', array['development','technology','tech stack']::text[], false),
    ('design-systems-that-scale', 'Design',
      'Design Systems That Scale',
      'How a shared design language improves consistency, collaboration, and product delivery.',
      '2026-08-05'::date, 5, '/assets/img/post_12.jpg', array['design','design system','product']::text[], false),
    ('digital-product-strategy-for-early-stage-teams', 'Strategy',
      'Digital Product Strategy for Early-Stage Teams',
      'A practical framework for defining priorities, testing assumptions, and building with focus.',
      '2026-07-29'::date, 7, '/assets/img/post_13.jpg', array['business','strategy','startup','product']::text[], false)
)
insert into public.lyven_articles
  (slug, category, title, excerpt, publish_date, read_minutes, cover_media_id,
   author_name, author_role, author_description, tags, featured, status)
select s.slug, s.category, s.title, s.excerpt, s.publish_date, s.read_minutes,
  m.id, 'Lyven Team', 'Digital team at Lyven',
  'We share practical thinking on design, development, and digital products.',
  s.tags, s.featured, 'Draft'
from source as s
left join public.lyven_media as m on m.external_url = s.image_url
on conflict (slug) do nothing;

commit;
