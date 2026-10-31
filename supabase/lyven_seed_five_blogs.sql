-- Five original, English-language Lyven articles with remote Unsplash covers.
-- Run in Supabase SQL Editor after lyven_schema.sql. Safe to run again: existing
-- media and articles are left untouched when their URL or slug already exists.
-- Four articles are featured on both the blog and landing page; the fifth is
-- available in All Articles. Images remain hosted by Unsplash, not Storage.
-- Cover photo sources and creators (each marked free under the Unsplash License):
-- 1. Etienne Beauregard-Riverin: https://unsplash.com/photos/yA-WIoC-wiA
-- 2. Hendri Sabri: https://unsplash.com/photos/wiADeL8fimY
-- 3. Nubelson Fernandes: https://unsplash.com/photos/UcYBL5V0xWQ
-- 4. Vitaly Gariev: https://unsplash.com/photos/K0aM-ztA76Q
-- 5. Rachel How: https://unsplash.com/photos/PWCu4sW70_I

begin;

insert into public.lyven_media (name, alt_text, placement, external_url)
values
  ('Blog cover - From idea to useful digital product', 'Blue glass building photographed from below', 'Blog cover', 'https://images.unsplash.com/photo-1448459322288-678e8f2bb7f9?auto=format&fit=crop&w=1600&q=85'),
  ('Blog cover - Design for clarity', 'Minimal blue architectural wall in daylight', 'Blog cover', 'https://images.unsplash.com/photo-1563441082154-be8c9b37f115?auto=format&fit=crop&w=1600&q=85'),
  ('Blog cover - Building web products', 'Developer working on code at a laptop', 'Blog cover', 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1600&q=85'),
  ('Blog cover - Better briefs and launches', 'Team discussing ideas around a whiteboard', 'Blog cover', 'https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?auto=format&fit=crop&w=1600&q=85'),
  ('Blog cover - Consistent digital experiences', 'Laptop and phone arranged on a desk', 'Blog cover', 'https://images.unsplash.com/photo-1688703702362-14d59fea489f?auto=format&fit=crop&w=1600&q=85')
on conflict do nothing;

with articles (
  slug, title, category, excerpt, body_html, cover_url, cover_alt_text,
  tags, publish_date, featured
) as (
  values
  (
    'from-idea-to-useful-digital-product',
    'From Idea to Useful Digital Product',
    'Strategy',
    'A practical way to turn an exciting idea into a focused product people can understand, use, and grow with.',
    $body$
<p>Every digital product begins with an idea. The difficult part is deciding which part of that idea is worth building first. Before sketches or code, a team needs a clear picture of the people it hopes to help and the problem those people face.</p>
<h2>Begin with the problem</h2>
<p>Describe the situation in plain language: who experiences it, what they do today, and where the current process breaks down. Speak with potential users and look for repeated patterns. A useful brief should explain the problem without already prescribing a feature.</p>
<h2>Choose one meaningful outcome</h2>
<p>It is tempting to launch with every feature on the wish list. A sharper first release focuses on a small number of tasks that create clear value. Decide what success would look like for both the user and the business, then let those outcomes guide the scope.</p>
<ul><li>Write down the primary user and the job they need to complete.</li><li>Separate essential workflows from ideas that can wait.</li><li>Test an early prototype before committing to full development.</li></ul>
<h2>Build, learn, and improve</h2>
<p>A launch is a starting point, not a finish line. Observe where people hesitate, listen to support questions, and measure the outcomes that matter. Small, deliberate improvements often create more value than a rushed collection of new features.</p>
<blockquote>A strong digital product is not the one with the longest feature list. It is the one that solves a real problem with clarity.</blockquote>
<p>When strategy, design, and technology share the same goal, an idea has a much better chance of becoming a product people return to.</p>
$body$,
    'https://images.unsplash.com/photo-1448459322288-678e8f2bb7f9?auto=format&fit=crop&w=1600&q=85',
    'Blue glass building photographed from below',
    array['product strategy', 'digital product', 'planning']::text[],
    '2026-10-18'::date,
    true
  ),
  (
    'design-for-clarity-interfaces-people-trust',
    'Design for Clarity: Interfaces People Trust',
    'Design',
    'Good interface design makes the next step obvious. Here is how to create a calmer, more useful experience.',
    $body$
<p>People rarely visit a website or open an app to admire the interface. They come with a goal: find an answer, compare options, complete a task, or contact a team. Design succeeds when it helps them do that without unnecessary effort.</p>
<h2>Make the important action visible</h2>
<p>Each screen should have a clear purpose. Use headings that describe what is there, group related information, and give the primary action enough visual emphasis. If every element competes for attention, nothing feels important.</p>
<h2>Use familiar patterns with intention</h2>
<p>Navigation, forms, and feedback should behave in ways people can predict. Familiarity reduces the time needed to learn a new product. Creativity still matters, but it works best when it improves understanding rather than hiding essential controls.</p>
<ul><li>Write labels in the language your audience uses.</li><li>Show helpful errors next to the field that needs attention.</li><li>Check contrast, text size, and keyboard access early.</li></ul>
<h2>Test with real tasks</h2>
<p>Ask someone unfamiliar with the product to complete a realistic task. Watch where they pause, backtrack, or ask questions. Those moments reveal more than a quick preference survey. Make one change, test again, and keep the result that improves the experience.</p>
<blockquote>Clarity is not a lack of personality. It is a way of making the product feel confident and considerate.</blockquote>
<p>A trustworthy interface is built through many small decisions that help people feel oriented, capable, and in control.</p>
$body$,
    'https://images.unsplash.com/photo-1563441082154-be8c9b37f115?auto=format&fit=crop&w=1600&q=85',
    'Minimal blue architectural wall in daylight',
    array['ui ux', 'accessibility', 'user experience']::text[],
    '2026-10-15'::date,
    true
  ),
  (
    'building-web-products-that-can-grow',
    'Building Web Products That Can Grow',
    'Development',
    'Scalability starts with clear foundations: a maintainable codebase, reliable data, and performance you can observe.',
    $body$
<p>Growth brings new users, new content, and new requirements. A product does not need a complicated architecture on day one, but it does need foundations that make change possible without breaking what already works.</p>
<h2>Keep the structure understandable</h2>
<p>Organize code around clear responsibilities. Reusable components should solve repeated problems, while business rules belong in places where they can be reviewed and tested. A simple, consistent structure helps a team move faster as the product evolves.</p>
<h2>Design data for real workflows</h2>
<p>Start with the information the product actually needs. Give records stable identifiers, validate important fields, and decide who may read or change each type of data. Backups and access rules are part of product quality, not tasks to postpone until launch.</p>
<ul><li>Measure loading time on ordinary devices and connections.</li><li>Optimize images and avoid sending unnecessary code to the browser.</li><li>Make errors visible to the team without exposing private details to visitors.</li></ul>
<h2>Improve with evidence</h2>
<p>Performance budgets, monitoring, and small automated checks make change safer. When usage grows, measure the actual bottleneck before adding complexity. Often the best next step is a smaller query, a better cache, or a clearer user flow.</p>
<blockquote>Build for the next reasonable stage of growth, not for every hypothetical future.</blockquote>
<p>That balance keeps a product dependable today and flexible enough for tomorrow.</p>
$body$,
    'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1600&q=85',
    'Developer working on code at a laptop',
    array['web development', 'performance', 'scalability']::text[],
    '2026-10-12'::date,
    true
  ),
  (
    'better-briefs-better-launches',
    'Better Briefs, Better Launches',
    'Process',
    'A thoughtful project brief aligns the team, reduces rework, and gives every design and development decision a direction.',
    $body$
<p>A good project does not begin with a perfect specification. It begins with a shared understanding of the goal, the audience, and the constraints. The brief gives everyone a place to return when choices become difficult.</p>
<h2>Define what success means</h2>
<p>Explain why the project exists. Is the goal to help customers find information faster, simplify an internal process, or create a new service? Name the people involved and describe what they need to accomplish. A measurable outcome is more useful than a vague request to make the experience modern.</p>
<h2>Make constraints visible</h2>
<p>Timelines, available content, integrations, approval steps, and technical limitations all shape the work. Sharing them early gives the team room to choose an honest scope. Surprises discovered late usually cost more than difficult conversations held at the start.</p>
<ul><li>List the essential pages or workflows.</li><li>Identify who can make decisions and provide feedback.</li><li>Separate launch requirements from later improvements.</li></ul>
<h2>Keep the brief alive</h2>
<p>As the team learns, update the brief rather than treating it as a frozen document. Use it to review prototypes, prioritize changes, and decide whether the product is ready to launch. A brief is most valuable when it guides real decisions.</p>
<blockquote>Alignment is not a single meeting. It is a habit of making the goal visible throughout the project.</blockquote>
<p>With that habit in place, design and development can move forward with less guesswork and more confidence.</p>
$body$,
    'https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?auto=format&fit=crop&w=1600&q=85',
    'Team discussing ideas around a whiteboard',
    array['project brief', 'collaboration', 'launch']::text[],
    '2026-10-09'::date,
    true
  ),
  (
    'making-digital-experiences-feel-consistent',
    'Making Digital Experiences Feel Consistent',
    'Design',
    'Consistency across pages and devices helps people recognize patterns, understand actions, and feel at home in a product.',
    $body$
<p>A product may have a website, a dashboard, emails, and a mobile experience. When each touchpoint uses different language and interaction patterns, even simple tasks can feel unfamiliar. Consistency turns those separate moments into one coherent experience.</p>
<h2>Start with shared principles</h2>
<p>Choose a few rules that express how the product should feel and behave. These might cover tone of voice, spacing, color, button hierarchy, and the way the interface responds to success or error. Principles are more useful than a collection of isolated visual examples.</p>
<h2>Make reusable decisions</h2>
<p>A small design system can document common components and their intended use. It does not need to be large. Begin with the patterns that appear most often, such as navigation, cards, forms, and feedback messages, then improve them as the product grows.</p>
<ul><li>Use the same name for the same action everywhere.</li><li>Keep primary and secondary actions visually distinct.</li><li>Check the experience on small screens, not only desktop.</li></ul>
<h2>Leave room for context</h2>
<p>Consistency is not about making every screen identical. A long-form article needs a different rhythm from a checkout flow. The goal is to preserve familiar behavior while giving each task the space it needs.</p>
<blockquote>The best systems make useful patterns easy to repeat and thoughtful exceptions easy to explain.</blockquote>
<p>That approach helps teams work together while giving visitors an experience that feels clear from the first interaction to the last.</p>
$body$,
    'https://images.unsplash.com/photo-1688703702362-14d59fea489f?auto=format&fit=crop&w=1600&q=85',
    'Laptop and phone arranged on a desk',
    array['design system', 'consistency', 'digital experience']::text[],
    '2026-10-06'::date,
    false
  )
)
insert into public.lyven_articles (
  slug, title, category, excerpt, body_html, cover_media_id, cover_alt_text,
  author_name, author_role, author_description, tags, publish_date,
  read_minutes, featured, status
)
select
  a.slug, a.title, a.category, a.excerpt, a.body_html, m.id, a.cover_alt_text,
  'Lyven Team', 'Design and development team',
  'We share practical ideas on strategy, design, development, and building useful digital products.',
  a.tags, a.publish_date, 3, a.featured, 'Published'
from articles as a
join public.lyven_media as m on m.external_url = a.cover_url
on conflict (slug) do nothing;

commit;

-- Confirmation: five rows should appear if they were not already present.
select title, category, status, featured
from public.lyven_articles
where slug in (
  'from-idea-to-useful-digital-product',
  'design-for-clarity-interfaces-people-trust',
  'building-web-products-that-can-grow',
  'better-briefs-better-launches',
  'making-digital-experiences-feel-consistent'
)
order by publish_date desc;
