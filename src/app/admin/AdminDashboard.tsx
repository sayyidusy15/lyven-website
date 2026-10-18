"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { type ProjectCategory } from "../../lib/projects";
import { MAX_FEATURED_ARTICLES, MAX_HOMEPAGE_PROJECTS, sanitizeArticleHtml, type CmsArticle, type CmsMedia, type CmsProject, type PublishStatus } from "../../lib/local-cms";
import { loadAdminCms, saveProject as saveProjectToDb, saveArticle as saveArticleToDb, saveInquiry as saveInquiryToDb, saveTestimonial as saveTestimonialToDb, saveMedia as saveMediaToDb, setFeatured, uploadMedia, deleteMedia as deleteMediaFromDb, deleteRecord, type CmsInquiry, type CmsTestimonial } from "../../lib/supabase-cms";
import RichTextEditor from "./RichTextEditor";
import { logoutAdmin } from "./actions";
import styles from "./admin.module.css";

type Section = "overview" | "portfolio" | "blog" | "testimonials" | "inbox" | "media";
type Status = PublishStatus;
type InquiryStatus = "New" | "In progress" | "Replied" | "Closed";
type Project = CmsProject;
type Article = CmsArticle;

type Inquiry = CmsInquiry;

type MediaItem = CmsMedia;
type ConfirmationRequest = {
  title: string;
  message: string;
  confirmLabel: string;
  destructive?: boolean;
  resolve: (confirmed: boolean) => void;
};

const navItems: { id: Section; label: string; icon: string; caption?: string }[] = [
  { id: "overview", label: "Overview", icon: "bi-grid-1x2" },
  { id: "portfolio", label: "Portfolio", icon: "bi-collection" },
  { id: "blog", label: "Blog", icon: "bi-journal-text" },
  { id: "testimonials", label: "Testimonials", icon: "bi-chat-quote" },
  { id: "inbox", label: "Inbox", icon: "bi-inbox" },
  { id: "media", label: "Media library", icon: "bi-images" },
];

const emptyInquiry: Inquiry = {
  id: "", name: "", email: "", company: "", projectType: "Development", budget: "",
  timeline: "", message: "", received: "", status: "New", note: "",
};

const emptyTestimonial: CmsTestimonial = {
  id: "", title: "", message: "", senderName: "", senderTitle: "", star: 5, sortOrder: 0, status: "Draft",
};

const imageGuides = [
  { label: "Portfolio card", size: "1350 × 1000 px", ratio: "1.35:1" },
  { label: "Project header", size: "1920 × 725 px", ratio: "Wide" },
  { label: "Project gallery", size: "1480 × 1000 px", ratio: "1.48:1" },
  { label: "Blog cover", size: "1600 × 900 px", ratio: "16:9" },
  { label: "Page background", size: "2160 × 720 px", ratio: "3:1" },
];

const emptyProject: Project = {
  id: "", title: "", slug: "", category: "Development", summary: "", description: "",
  industry: "", duration: "", year: "", website: "", thumbnail: "", heroImage: "", aboutImage: "",
  gallery: [], featured: false, status: "Draft",
};

const emptyArticle: Article = {
  id: "", title: "", slug: "", category: "Design", excerpt: "", bodyHtml: "", image: "",
  imageAlt: "", author: "Lyven Team", authorRole: "", authorDescription: "", tags: "", publishDate: "", featured: false, status: "Draft",
};

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function Icon({ name }: { name: string }) {
  return <i className={`bi ${name}`} aria-hidden="true" />;
}

function Thumb({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  return (
    <span
      className={`${styles.thumb} ${className}`}
      role="img"
      aria-label={src ? label : `${label}, no image added`}
      style={src ? { backgroundImage: `url("${src.replaceAll('"', '%22')}")` } : undefined}
    >
      {!src && <Icon name="bi-image" />}
    </span>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className={styles.field}><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function MediaField({ label, hint, value, library, onChange, onUploaded, onClear }: {
  label: string; hint: string; value: string; library: MediaItem[]; onChange: (value: string) => void;
  onUploaded: (item: MediaItem) => void; onClear: () => void;
}) {
  const selectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    try { const item = await uploadMedia(file); onUploaded(item); onChange(item.src); }
    catch (error) { window.alert(error instanceof Error ? error.message : "Image upload failed."); }
  };

  return (
    <div className={styles.mediaField}>
      <div className={styles.fieldTop}><strong>{label}</strong><span>{hint}</span></div>
      <div className={styles.mediaFieldBody}>
        <Thumb src={value} label={label} className={styles.mediaFieldThumb} />
        <div className={styles.mediaFieldActions}>
          <label className={styles.uploadButton}>
            <Icon name="bi-upload" /> Choose image
            <input type="file" accept="image/*" onChange={selectFile} />
          </label>
          {value && <button type="button" className={styles.clearImageButton} onClick={onClear}>Clear image</button>}
          <select className={styles.input} aria-label={`Choose ${label} from media library`} value={library.find((item) => item.src === value)?.id ?? ""} onChange={(event) => { const item = library.find((entry) => entry.id === event.target.value); if (item) onChange(item.src); }}>
            <option value="">Or choose from media library</option>
            {library.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <input aria-label={`${label} image URL`} className={styles.input} value={value.startsWith("data:") ? "" : value}
            placeholder="Or paste an image URL" onChange={(event) => onChange(event.target.value)} />
          <small>Uploaded images are stored in Supabase Storage.</small>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [projectDraft, setProjectDraft] = useState<Project | null>(null);
  const [articleDraft, setArticleDraft] = useState<Article | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [notice, setNotice] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mediaDraft, setMediaDraft] = useState<MediaItem | null>(null);
  const [inquiryDraft, setInquiryDraft] = useState<Inquiry | null>(null);
  const [testimonialDraft, setTestimonialDraft] = useState<CmsTestimonial | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationRequest | null>(null);

  const refresh = async () => {
    const data = await loadAdminCms();
    setProjects(data.projects); setArticles(data.articles); setInquiries(data.inquiries); setMedia(data.media); setTestimonials(data.testimonials);
    setLoadError("");
  };

  useEffect(() => {
    let cancelled = false;
    loadAdminCms().then((data) => {
      if (cancelled) return;
      setProjects(data.projects); setArticles(data.articles); setInquiries(data.inquiries); setMedia(data.media); setTestimonials(data.testimonials);
      setLoading(false);
    }).catch((error) => {
      if (cancelled) return;
      setLoadError(error instanceof Error ? error.message : "Could not load Supabase data.");
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!projectDraft && !articleDraft && !mediaDraft && !inquiryDraft && !testimonialDraft && !confirmation) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (confirmation) { confirmation.resolve(false); setConfirmation(null); return; }
      setProjectDraft(null); setArticleDraft(null); setMediaDraft(null); setInquiryDraft(null); setTestimonialDraft(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [Boolean(projectDraft), Boolean(articleDraft), Boolean(mediaDraft), Boolean(inquiryDraft), Boolean(testimonialDraft), confirmation]);

  const activeInquiry = inquiries.find((inquiry) => inquiry.id === selectedInquiry) ?? null;
  const visibleProjects = useMemo(() => projects.filter((project) =>
    `${project.title} ${project.category} ${project.summary}`.toLowerCase().includes(query.toLowerCase()) &&
    (statusFilter === "All statuses" || project.status === statusFilter)), [projects, query, statusFilter]);
  const visibleArticles = useMemo(() => articles.filter((article) =>
    `${article.title} ${article.category} ${article.excerpt}`.toLowerCase().includes(query.toLowerCase()) &&
    (statusFilter === "All statuses" || article.status === statusFilter)), [articles, query, statusFilter]);

  const navigate = (next: Section) => {
    setSection(next);
    setQuery("");
    setStatusFilter("All statuses");
    setSelectedInquiry(null);
    setMobileNavOpen(false);
  };
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 4500);
  };
  const confirmChange = (title: string, message: string, confirmLabel: string, destructive = false) =>
    new Promise<boolean>((resolve) => setConfirmation({ title, message, confirmLabel, destructive, resolve }));
  const closeConfirmation = (confirmed: boolean) => {
    confirmation?.resolve(confirmed);
    setConfirmation(null);
  };
  const confirmImageClear = async (label: string, clear: () => void) => {
    if (await confirmChange("Clear image?", `${label} will be removed from this editor. Save the record to apply the change to the website. The file will stay in Media Library.`, "Clear image", true)) clear();
  };
  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectDraft?.title.trim()) return;
    const slug = slugify(projectDraft.slug || projectDraft.title);
    if (!slug) return;
    if (projects.some((item) => item.slug === slug && item.id !== projectDraft.id)) { notify("This URL slug is already used by another project."); return; }
    if (projectDraft.featured && projectDraft.status === "Published" && !projectDraft.thumbnail) { notify("Add a card thumbnail before featuring this published project."); return; }
    if (projectDraft.featured && projects.filter((item) => item.featured && item.id !== projectDraft.id).length >= MAX_HOMEPAGE_PROJECTS) { notify(`Choose no more than ${MAX_HOMEPAGE_PROJECTS} homepage projects.`); return; }
    const record = { ...projectDraft, gallery: projectDraft.gallery.filter(Boolean), slug };
    if (!await confirmChange(record.id ? "Save project changes?" : "Create this project?", record.status === "Published" ? "This project will be visible on the website after saving." : "This project will be saved in the admin workspace.", record.id ? "Save changes" : "Create project")) return;
    try { await saveProjectToDb(record, media); await refresh(); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not save the project."); return; }
    setProjectDraft(null);
    notify(record.status === "Published" ? "Project published." : "Project saved.");
  };
  const saveArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!articleDraft?.title.trim()) return;
    if (articleDraft.status === "Published" && !articleDraft.bodyHtml.trim()) {
      notify("Write the article body before publishing a new article.");
      return;
    }
    if (articleDraft.status === "Published" && !articleDraft.image) { notify("Add a cover image before publishing this article."); return; }
    const slug = slugify(articleDraft.slug || articleDraft.title);
    if (!slug) return;
    if (articles.some((item) => item.slug === slug && item.id !== articleDraft.id)) { notify("This URL slug is already used by another article."); return; }
    if (articleDraft.featured && articles.filter((item) => item.featured && item.id !== articleDraft.id).length >= MAX_FEATURED_ARTICLES) { notify(`Choose no more than ${MAX_FEATURED_ARTICLES} featured articles.`); return; }
    const record = { ...articleDraft, bodyHtml: sanitizeArticleHtml(articleDraft.bodyHtml), publishDate: articleDraft.publishDate || (articleDraft.status === "Published" ? new Date().toISOString().slice(0, 10) : ""), slug };
    if (!await confirmChange(record.id ? "Save article changes?" : "Create this article?", record.status === "Published" ? "This article will be visible on the website after saving." : "This article will be saved in the admin workspace.", record.id ? "Save changes" : "Create article")) return;
    try { await saveArticleToDb(record, media); await refresh(); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not save the article."); return; }
    setArticleDraft(null);
    notify(record.status === "Published" ? "Article published." : "Article saved.");
  };
  const deleteProject = async (project: Project) => {
    if (!await confirmChange("Delete project?", `“${project.title}” will be permanently removed from the portfolio. Its media files will remain in Media Library.`, "Delete project", true)) return;
    try { await deleteRecord("lyven_projects", project.id); await refresh(); notify("Project deleted."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not delete the project."); }
  };
  const deleteArticle = async (article: Article) => {
    if (!await confirmChange("Delete article?", `“${article.title}” will be permanently removed from the blog. Its cover image will remain in Media Library.`, "Delete article", true)) return;
    try { await deleteRecord("lyven_articles", article.id); await refresh(); notify("Article deleted."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not delete the article."); }
  };
  const toggleFeaturedProject = async (project: Project) => {
    if (!project.featured && projects.filter((item) => item.featured).length >= MAX_HOMEPAGE_PROJECTS) { notify(`Choose no more than ${MAX_HOMEPAGE_PROJECTS} homepage projects.`); return; }
    if (!project.featured && !project.thumbnail) { notify("Add a card thumbnail before featuring this project."); return; }
    if (!await confirmChange(project.featured ? "Remove from homepage?" : "Feature on homepage?", `This will ${project.featured ? "remove" : "add"} “${project.title}” ${project.featured ? "from" : "to"} the homepage showcase.`, project.featured ? "Remove feature" : "Feature project")) return;
    try { await setFeatured("lyven_projects", project.id, !project.featured); await refresh(); notify(project.featured ? "Removed from homepage showcase." : "Added to homepage showcase."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not update homepage selection."); }
  };
  const toggleFeaturedArticle = async (article: Article) => {
    if (!article.featured && articles.filter((item) => item.featured).length >= MAX_FEATURED_ARTICLES) { notify(`Choose no more than ${MAX_FEATURED_ARTICLES} featured articles.`); return; }
    if (!article.featured && !article.image) { notify("Add a cover image before featuring this article."); return; }
    if (!await confirmChange(article.featured ? "Remove featured article?" : "Feature this article?", `This will ${article.featured ? "remove" : "add"} “${article.title}” ${article.featured ? "from" : "to"} blog and homepage highlights.`, article.featured ? "Remove feature" : "Feature article")) return;
    try { await setFeatured("lyven_articles", article.id, !article.featured); await refresh(); notify(article.featured ? "Removed from featured articles." : "Featured on the blog and homepage."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not update featured articles."); }
  };
  const updateInquiry = async (inquiry: Inquiry) => {
    if (!await confirmChange("Save inquiry changes?", `Update the status or private note for ${inquiry.name}?`, "Save changes")) return;
    try { await saveInquiryToDb(inquiry); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not save inquiry changes."); return; }
    setInquiries((current) => current.map((item) => item.id === inquiry.id ? inquiry : item));
    notify("Inquiry updated.");
  };
  const saveInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inquiryDraft?.name.trim() || !inquiryDraft.email.trim()) return;
    if (!await confirmChange(inquiryDraft.id ? "Save inquiry changes?" : "Add this inquiry?", inquiryDraft.id ? "The client inquiry will be updated." : "A new inquiry will be added to the inbox.", inquiryDraft.id ? "Save changes" : "Add inquiry")) return;
    try { const id = await saveInquiryToDb(inquiryDraft); await refresh(); setSelectedInquiry(id); setNoteDraft(inquiryDraft.note); setInquiryDraft(null); notify("Inquiry saved."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not save the inquiry."); }
  };
  const deleteInquiry = async (inquiry: Inquiry) => {
    if (!await confirmChange("Delete inquiry?", `The message from ${inquiry.name} will be permanently removed from the inbox.`, "Delete inquiry", true)) return;
    try { await deleteRecord("lyven_inquiries", inquiry.id); await refresh(); setSelectedInquiry(null); setNoteDraft(""); notify("Inquiry deleted."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not delete the inquiry."); }
  };
  const saveTestimonial = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!testimonialDraft?.senderName.trim() || !testimonialDraft.message.trim()) return;
    if (!await confirmChange(testimonialDraft.id ? "Save testimonial changes?" : "Add this testimonial?", testimonialDraft.status === "Published" ? "This testimonial will be visible on the website." : "This testimonial will remain hidden until published.", testimonialDraft.id ? "Save changes" : "Add testimonial")) return;
    try { await saveTestimonialToDb(testimonialDraft); await refresh(); setTestimonialDraft(null); notify("Testimonial saved."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not save testimonial."); }
  };
  const deleteTestimonial = async (item: CmsTestimonial) => {
    if (!await confirmChange("Delete testimonial?", `The testimonial from ${item.senderName} will be permanently removed.`, "Delete testimonial", true)) return;
    try { await deleteRecord("lyven_testimonials", item.id); await refresh(); notify("Testimonial deleted."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not delete testimonial."); }
  };
  const uploadToLibrary = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    try { await Promise.all(files.map(uploadMedia)); await refresh(); notify("Images uploaded to Supabase Storage."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not upload images."); await refresh().catch(() => {}); }
  };
  const saveMedia = async (item: MediaItem) => {
    if (!await confirmChange("Save image details?", `Update the name and alt text for “${item.name}”?`, "Save changes")) return;
    try { await saveMediaToDb(item); await refresh(); setMediaDraft(null); notify("Media details saved."); }
    catch (error) { notify(error instanceof Error ? error.message : "Could not save media details."); }
  };
  const deleteMedia = async (item: MediaItem) => {
    const usageCount = projects.reduce((count, project) => count + [project.thumbnail, project.heroImage, project.aboutImage, ...project.gallery].filter((src) => src === item.src).length, 0) + articles.filter((article) => article.image === item.src).length;
    if (!await confirmChange("Remove image permanently?", usageCount ? `“${item.name}” is assigned ${usageCount} time${usageCount === 1 ? "" : "s"}. Removing it will also clear those project or article image fields, including published pages. This cannot be undone.` : `“${item.name}” will be removed from Media Library and Supabase Storage. This cannot be undone.`, "Remove image", true)) return;
    try { await deleteMediaFromDb(item); await refresh(); setMediaDraft(null); notify("Image removed from Media Library."); }
    catch (error) { await refresh().catch(() => {}); notify(error instanceof Error ? error.message : "Could not remove the image."); }
  };

  const sectionTitle: Record<Section, string> = {
    overview: "Workspace overview", portfolio: "Portfolio", blog: "Blog articles",
    testimonials: "Testimonials", inbox: "Client inquiries", media: "Media library",
  };
  const sectionDescription: Record<Section, string> = {
    overview: "A clear view of the content behind Lyven.",
    portfolio: "Create and organize the projects shown in your showcase.",
    blog: "Write, review, and prepare articles for publication.",
    testimonials: "Manage the client feedback shown on the website.",
    inbox: "Review project requests and keep the conversation organized.",
    media: "Upload once, reuse in project and article image fields.",
  };

  return (
    <div className={styles.admin}>
      <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ""}`} aria-label="Admin navigation">
        <div className={styles.brandRow}>
          <Link href="/" className={styles.brand} aria-label="Lyven website home">
            <Image src="/assets/img/logo-lyven-primary.svg" alt="Lyven" width={101} height={30} priority />
          </Link>
          <span className={styles.brandDivider} />
          <span className={styles.brandAdmin}>Admin</span>
        </div>
        <p className={styles.navLabel}>WORKSPACE</p>
        <nav className={styles.nav}>
          {navItems.map((item) => <button key={item.id} type="button" onClick={() => navigate(item.id)}
            className={`${styles.navItem} ${section === item.id ? styles.navActive : ""}`}
            aria-current={section === item.id ? "page" : undefined}>
            <Icon name={item.icon} /><span>{item.label}</span>
            {item.id === "inbox" && <b>{inquiries.filter((inquiry) => inquiry.status === "New").length}</b>}
          </button>)}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.connectionCard}>
            <span className={styles.connectionIcon}><Icon name="bi-database" /></span>
            <strong>{loadError ? "Connection needs attention" : "Supabase workspace"}</strong>
            <p>{loadError ? "Review the connection message and retry." : "Content and media are managed in your project database."}</p>
          </div>
          <Link href="/" className={styles.backLink}><Icon name="bi-arrow-up-right" /> View website</Link>
        </div>
      </aside>

      {mobileNavOpen && <button type="button" className={styles.mobileScrim} aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <button type="button" className={styles.menuButton} aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Icon name="bi-list" /></button>
          <div className={styles.breadcrumb}>Lyven <Icon name="bi-chevron-right" /> <strong>{sectionTitle[section]}</strong></div>
          <div className={styles.topbarRight}><span className={styles.previewDot} /> {loadError ? "Connection issue" : "Live data"} <span className={styles.avatar}>L</span><form action={logoutAdmin}><button className={styles.logoutButton} type="submit" aria-label="Sign out" title="Sign out"><Icon name="bi-box-arrow-right" /></button></form></div>
        </header>

        <main className={styles.main}>
          <div className={styles.pageHeading}>
            <div><p className={styles.eyebrow}>CONTENT WORKSPACE</p><h1>{sectionTitle[section]}</h1><p>{sectionDescription[section]}</p></div>
            {section === "portfolio" && <button type="button" className={styles.primaryButton} onClick={() => setProjectDraft({ ...emptyProject })}><Icon name="bi-plus-lg" /> New project</button>}
            {section === "blog" && <button type="button" className={styles.primaryButton} onClick={() => setArticleDraft({ ...emptyArticle })}><Icon name="bi-plus-lg" /> New article</button>}
            {section === "testimonials" && <button type="button" className={styles.primaryButton} onClick={() => setTestimonialDraft({ ...emptyTestimonial })}><Icon name="bi-plus-lg" /> New testimonial</button>}
            {section === "inbox" && <button type="button" className={styles.primaryButton} onClick={() => setInquiryDraft({ ...emptyInquiry })}><Icon name="bi-plus-lg" /> Add inquiry</button>}
            {section === "media" && <label className={styles.primaryButton}><Icon name="bi-upload" /> Add images<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={uploadToLibrary} /></label>}
          </div>

          {loading && <div className={styles.inboxNotice} role="status"><Icon name="bi-arrow-repeat" /><span>Loading your content from Supabase…</span></div>}
          {loadError && <div className={styles.inboxNotice} role="alert"><Icon name="bi-exclamation-circle" /><span><strong>Could not load content</strong><br />{loadError}</span><button type="button" className={styles.secondaryButton} onClick={() => { setLoading(true); refresh().catch((error) => setLoadError(error instanceof Error ? error.message : "Could not load content.")).finally(() => setLoading(false)); }}>Retry</button></div>}

          {section === "overview" && <>
            <section className={styles.welcomePanel}>
              <div className={styles.welcomeCopy}><p className={styles.eyebrow}>WELCOME TO YOUR WORKSPACE</p><h2>Everything Lyven,<br /><em>in one place.</em></h2><p>Manage projects, publish ideas, and stay close to every new opportunity.</p><button type="button" onClick={() => navigate("portfolio")}>Explore content <Icon name="bi-arrow-up-right" /></button></div>
              <div className={styles.welcomeArt} aria-hidden="true"><span /><span /><span /></div>
            </section>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}><span><Icon name="bi-collection" /></span><strong>{projects.length.toString().padStart(2, "0")}</strong><p>Portfolio projects</p></div>
              <div className={styles.metricCard}><span><Icon name="bi-journal-text" /></span><strong>{articles.length.toString().padStart(2, "0")}</strong><p>Blog articles</p></div>
              <div className={styles.metricCard}><span><Icon name="bi-inbox" /></span><strong>{inquiries.filter((item) => item.status === "New").length.toString().padStart(2, "0")}</strong><p>New inquiries</p></div>
            </div>
            <div className={styles.overviewGrid}>
              <section className={styles.panel}><div className={styles.panelHeading}><div><p className={styles.eyebrow}>SHOWCASE</p><h2>Recent projects</h2></div><button type="button" className={styles.textButton} onClick={() => navigate("portfolio")}>View all <Icon name="bi-arrow-up-right" /></button></div>
                <div className={styles.compactList}>{projects.slice(0, 3).map((project) => <button key={project.id} type="button" className={styles.compactRow} onClick={() => { navigate("portfolio"); setProjectDraft({ ...project }); }}><Thumb src={project.thumbnail} label={project.title} /><span><strong>{project.title}</strong><small>{project.category}</small></span><Icon name="bi-arrow-up-right" /></button>)}{!loading && !loadError && projects.length === 0 && <p className={styles.panelCopy}>No projects yet. Add your first portfolio project to get started.</p>}</div>
              </section>
              <section className={styles.panel}><div className={styles.panelHeading}><div><p className={styles.eyebrow}>INBOX</p><h2>Keep the conversation moving</h2></div></div><p className={styles.panelCopy}>{inquiries.length ? `${inquiries.filter((item) => item.status === "New").length} new inquiries are waiting for review.` : "No inquiries yet. New client messages will appear here when the contact form is connected."}</p><button type="button" className={styles.secondaryButton} onClick={() => navigate("inbox")}>Open inbox <Icon name="bi-arrow-right" /></button></section>
            </div>
          </>}

          {(section === "portfolio" || section === "blog") && <>
            <div className={styles.featuredGuide}>
              <span className={styles.featuredGuideIcon}><Icon name={section === "portfolio" ? "bi-stars" : "bi-bookmark-star"} /></span>
              <div><strong>{section === "portfolio" ? "Homepage showcase" : "Featured articles"}</strong><p>{section === "portfolio" ? `Select up to ${MAX_HOMEPAGE_PROJECTS} published projects for the landing page. Only projects with a card thumbnail can appear.` : `Select up to ${MAX_FEATURED_ARTICLES} articles. The same selection appears in the blog highlights and on the landing page.`}</p></div>
              <span className={styles.featuredCount}>{section === "portfolio" ? projects.filter((item) => item.featured).length : articles.filter((item) => item.featured).length} / {section === "portfolio" ? MAX_HOMEPAGE_PROJECTS : MAX_FEATURED_ARTICLES} selected</span>
            </div>
            <div className={styles.toolbar}>
              <label className={styles.search}><Icon name="bi-search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={section === "portfolio" ? "Search projects..." : "Search articles..."} /></label>
              <select className={styles.select} aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Published</option><option>Draft</option><option>Takedown</option></select>
              <span className={styles.resultCount}>{section === "portfolio" ? visibleProjects.length : visibleArticles.length} items</span>
            </div>
            <section className={styles.panel} aria-label={section === "portfolio" ? "Portfolio projects" : "Blog articles"}>
              <div className={styles.tableHeading}><span>CONTENT</span><span>CATEGORY</span><span>STATUS</span><span>ACTION</span></div>
              {!loading && !loadError && (section === "portfolio" ? visibleProjects : visibleArticles).length === 0 && <div className={styles.emptyState}><Icon name={query || statusFilter !== "All statuses" ? "bi-search" : "bi-folder-plus"} /><h2>{query || statusFilter !== "All statuses" ? "No matching content" : section === "portfolio" ? "No projects yet" : "No articles yet"}</h2><p>{query || statusFilter !== "All statuses" ? "Try a different search or status filter." : section === "portfolio" ? "Create a project to start building your showcase." : "Create your first article when you are ready to publish."}</p></div>}
              {section === "portfolio" && visibleProjects.map((project) => <div className={styles.tableRow} key={project.id}>
                <div className={styles.rowIdentity}><Thumb src={project.thumbnail} label={project.title} /><span><strong>{project.title}</strong><small>{project.featured ? "★ Homepage showcase" : project.summary || "Add a short project description"}</small></span></div>
                <span className={styles.categoryPill}>{project.category}</span><span className={`${styles.status} ${project.status === "Published" ? styles.published : project.status === "Takedown" ? styles.takedown : styles.draft}`}><i />{project.status}</span>
                <span className={styles.actionGroup}><button type="button" className={`${styles.rowAction} ${project.featured ? styles.featuredAction : ""}`} onClick={() => toggleFeaturedProject(project)} aria-label={`${project.featured ? "Remove" : "Add"} ${project.title} ${project.featured ? "from" : "to"} homepage showcase`} aria-pressed={project.featured}><Icon name={project.featured ? "bi-star-fill" : "bi-star"} /></button><button type="button" className={styles.rowAction} onClick={() => setProjectDraft({ ...project })} aria-label={`Edit ${project.title}`}><Icon name="bi-pencil" /></button><button type="button" className={styles.deleteAction} onClick={() => deleteProject(project)} aria-label={`Delete ${project.title}`}><Icon name="bi-trash3" /></button></span>
              </div>)}
              {section === "blog" && visibleArticles.map((article) => <div className={styles.tableRow} key={article.id}>
                <div className={styles.rowIdentity}><Thumb src={article.image} label={article.title} /><span><strong>{article.title}</strong><small>{article.featured ? "★ Featured on blog and homepage" : article.excerpt || "Add a short article excerpt"}</small></span></div>
                <span className={styles.categoryPill}>{article.category}</span><span className={`${styles.status} ${article.status === "Published" ? styles.published : article.status === "Takedown" ? styles.takedown : styles.draft}`}><i />{article.status}</span>
                <span className={styles.actionGroup}><button type="button" className={`${styles.rowAction} ${article.featured ? styles.featuredAction : ""}`} onClick={() => toggleFeaturedArticle(article)} aria-label={`${article.featured ? "Remove" : "Add"} ${article.title} ${article.featured ? "from" : "to"} featured articles`} aria-pressed={Boolean(article.featured)}><Icon name={article.featured ? "bi-star-fill" : "bi-star"} /></button><button type="button" className={styles.rowAction} onClick={() => setArticleDraft({ ...article })} aria-label={`Edit ${article.title}`}><Icon name="bi-pencil" /></button><button type="button" className={styles.deleteAction} onClick={() => deleteArticle(article)} aria-label={`Delete ${article.title}`}><Icon name="bi-trash3" /></button></span>
              </div>)}
            </section>
            <p className={styles.belowNote}><Icon name="bi-info-circle" /> Saved in Supabase. Only Published items are visible to website visitors.</p>
          </>}

          {section === "testimonials" && <section className={styles.panel} aria-label="Client testimonials">
            <div className={styles.panelHeading}><div><p className={styles.eyebrow}>CLIENT FEEDBACK</p><h2>Testimonials</h2></div><span className={styles.resultCount}>{testimonials.length} items</span></div>
            {!loading && !loadError && testimonials.length === 0 && <div className={styles.emptyState}><Icon name="bi-chat-quote" /><h2>No testimonials yet</h2><p>Add a client testimonial when you have permission to share it.</p></div>}
            {testimonials.map((item) => <div className={styles.tableRow} key={item.id}>
              <div className={styles.rowIdentity}><span className={styles.inquiryAvatar}>{item.senderName.charAt(0)}</span><span><strong>{item.senderName}</strong><small>{item.message}</small></span></div>
              <span className={styles.categoryPill}>{item.star} / 5 stars</span><span className={`${styles.status} ${item.status === "Published" ? styles.published : item.status === "Takedown" ? styles.takedown : styles.draft}`}><i />{item.status}</span>
              <span className={styles.actionGroup}><button type="button" className={styles.rowAction} onClick={() => setTestimonialDraft({ ...item })} aria-label={`Edit testimonial from ${item.senderName}`}><Icon name="bi-pencil" /></button><button type="button" className={styles.deleteAction} onClick={() => deleteTestimonial(item)} aria-label={`Delete testimonial from ${item.senderName}`}><Icon name="bi-trash3" /></button></span>
            </div>)}
          </section>}

          {section === "inbox" && <>
            <div className={styles.inboxNotice}><Icon name="bi-shield-check" /><span><strong>Private inbox</strong><br />Only administrators can view these messages. Website submissions require the contact form integration.</span></div>
            <div className={styles.inboxLayout}>
              <div className={styles.panel}>
                <div className={styles.inboxPanelHeading}><h2>Messages</h2><span>{inquiries.length} messages</span></div>
                {!loading && !loadError && inquiries.length === 0 && <div className={styles.emptyState}><Icon name="bi-inbox" /><h2>No inquiries yet</h2><p>Messages will appear here once received.</p></div>}
                {inquiries.map((inquiry) => <button type="button" key={inquiry.id} className={`${styles.inquiryRow} ${selectedInquiry === inquiry.id ? styles.inquiryActive : ""}`} onClick={() => { setSelectedInquiry(inquiry.id); setNoteDraft(inquiry.note); }}><span className={styles.inquiryAvatar}>{inquiry.name.charAt(0)}</span><span className={styles.inquiryInfo}><strong>{inquiry.name}</strong><small>{inquiry.company} · {inquiry.projectType}</small><span>{inquiry.message}</span></span><span className={styles.inquiryMeta}>{inquiry.received}<b className={inquiry.status === "New" ? styles.newBadge : ""}>{inquiry.status}</b></span></button>)}
              </div>
              <div className={styles.panel}>
                {activeInquiry ? <div className={styles.inquiryDetail}><p className={styles.eyebrow}>PROJECT INQUIRY</p><h2>{activeInquiry.name}</h2><a href={`mailto:${activeInquiry.email}`}>{activeInquiry.email} <Icon name="bi-arrow-up-right" /></a><div className={styles.detailGrid}><span>Company<strong>{activeInquiry.company}</strong></span><span>Service<strong>{activeInquiry.projectType}</strong></span><span>Budget<strong>{activeInquiry.budget}</strong></span><span>Timeline<strong>{activeInquiry.timeline}</strong></span></div><h3>Message</h3><p className={styles.messageBox}>{activeInquiry.message}</p><Field label="Status"><select className={styles.input} value={activeInquiry.status} onChange={(event) => updateInquiry({ ...activeInquiry, status: event.target.value as InquiryStatus })}><option>New</option><option>In progress</option><option>Replied</option><option>Closed</option></select></Field><Field label="Internal note" hint="Save explicitly to update the private note."><textarea className={styles.textarea} rows={3} value={noteDraft} placeholder="Keep a private follow-up note..." onChange={(event) => setNoteDraft(event.target.value)} /></Field><div className={styles.inquiryActions}><button type="button" className={styles.secondaryButton} disabled={noteDraft === activeInquiry.note} onClick={() => updateInquiry({ ...activeInquiry, note: noteDraft })}>Save note</button><button type="button" className={styles.textButton} onClick={() => setInquiryDraft({ ...activeInquiry })}><Icon name="bi-pencil" /> Edit inquiry</button><button type="button" className={styles.deleteTextButton} onClick={() => deleteInquiry(activeInquiry)}><Icon name="bi-trash3" /> Delete inquiry</button></div></div>
                  : <div className={styles.inboxPlaceholder}><span><Icon name="bi-chat-square-text" /></span><h2>Select a conversation</h2><p>Choose a message to review its details.</p></div>}
              </div>
            </div>
          </>}

          {section === "media" && <>
            <div className={styles.mediaGuide}><div><p className={styles.eyebrow}>REUSABLE ASSETS</p><h2>One library for all visuals.</h2><p>Upload an image here, then choose it for a portfolio thumbnail, project header, gallery, or blog cover. Rename assets and add accessible alt text. Images assigned in Portfolio or Blog must be replaced before removal.</p></div><div className={styles.guideList}>{imageGuides.map((guide) => <div key={guide.label}><span>{guide.label}</span><strong>{guide.size}</strong><small>{guide.ratio}</small></div>)}</div></div>
            <div className={styles.mediaGrid}>{media.map((item) => {
              const usageCount = projects.reduce((count, project) => count + [project.thumbnail, project.heroImage, project.aboutImage, ...project.gallery].filter((src) => src === item.src).length, 0) + articles.filter((article) => article.image === item.src).length;
              return <article className={styles.mediaCard} key={item.id}><Thumb src={item.src} label={item.alt || item.name} /><div><strong>{item.name}</strong><span>{item.placement} · {usageCount ? `Assigned ${usageCount}×` : "Not assigned in admin"}</span><button className={styles.mediaEditButton} type="button" onClick={() => setMediaDraft({ ...item })}>Edit asset <Icon name="bi-arrow-right" /></button></div></article>;
            })}</div>
            {!loading && !loadError && media.length === 0 && <div className={styles.emptyState}><Icon name="bi-images" /><h2>No media yet</h2><p>Upload an image to use it in a project or article.</p></div>}
            <p className={styles.belowNote}><Icon name="bi-info-circle" /> Uploaded images are stored in Supabase Storage; asset details are stored in the database.</p>
          </>}
        </main>
      </div>

      {notice && <div className={styles.toast} role="status"><Icon name="bi-check-circle" />{notice}<button type="button" aria-label="Dismiss notice" onClick={() => setNotice("")}><Icon name="bi-x-lg" /></button></div>}

      {projectDraft && <div className={styles.drawerLayer}>
        <button className={styles.drawerBackdrop} type="button" aria-label="Close project editor" onClick={() => setProjectDraft(null)} />
        <aside className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="project-editor-title">
          <div className={styles.drawerHeader}><div><p className={styles.eyebrow}>PORTFOLIO EDITOR</p><h2 id="project-editor-title">{projectDraft.id ? "Edit project" : "New project"}</h2></div><button type="button" className={styles.closeButton} aria-label="Close editor" onClick={() => setProjectDraft(null)}><Icon name="bi-x-lg" /></button></div>
          <form onSubmit={saveProject} className={styles.drawerForm}>
            <div className={styles.drawerBody} data-lenis-prevent>
              <div className={styles.editorBlock}><h3>Project details</h3><Field label="Project name"><input required className={styles.input} value={projectDraft.title} placeholder="e.g. Humic Engineering" onChange={(event) => setProjectDraft({ ...projectDraft, title: event.target.value })} /></Field><div className={styles.twoFields}><Field label="Slug" hint="Used in the page URL"><input className={styles.input} value={projectDraft.slug} placeholder={slugify(projectDraft.title) || "project-name"} onChange={(event) => setProjectDraft({ ...projectDraft, slug: event.target.value })} /></Field><Field label="Category"><select className={styles.input} value={projectDraft.category} onChange={(event) => setProjectDraft({ ...projectDraft, category: event.target.value as ProjectCategory })}><option>Branding</option><option>UI/UX Design</option><option>Development</option></select></Field></div><Field label="Card summary" hint="One or two clear sentences; around 100–160 characters."><textarea className={styles.textarea} rows={3} value={projectDraft.summary} placeholder="What did this project help the client achieve?" onChange={(event) => setProjectDraft({ ...projectDraft, summary: event.target.value })} /></Field><Field label="Project overview" hint="Describe the challenge, your approach, and the outcome."><textarea className={styles.textarea} rows={5} value={projectDraft.description} placeholder="Tell the story behind this work..." onChange={(event) => setProjectDraft({ ...projectDraft, description: event.target.value })} /></Field><div className={styles.twoFields}><Field label="Industry"><input className={styles.input} value={projectDraft.industry} placeholder="e.g. Education" onChange={(event) => setProjectDraft({ ...projectDraft, industry: event.target.value })} /></Field><Field label="Duration"><input className={styles.input} value={projectDraft.duration} placeholder="e.g. 3 weeks" onChange={(event) => setProjectDraft({ ...projectDraft, duration: event.target.value })} /></Field></div><div className={styles.twoFields}><Field label="Year"><input className={styles.input} value={projectDraft.year} placeholder="e.g. 2026" onChange={(event) => setProjectDraft({ ...projectDraft, year: event.target.value })} /></Field><Field label="Website link"><input className={styles.input} type="url" value={projectDraft.website} placeholder="https://example.com" onChange={(event) => setProjectDraft({ ...projectDraft, website: event.target.value })} /></Field></div></div>
              <div className={styles.editorBlock}>
                <h3>Project visuals</h3>
                <p className={styles.helperNotice}>Each image has its own placement. The thumbnail appears on the portfolio list; the header is the wide background on the detail page; gallery images appear below the project overview.</p>
                <MediaField label="01 · Portfolio card thumbnail" hint="1350 × 1000 px" value={projectDraft.thumbnail} library={media} onUploaded={(item) => setMedia((current) => [item, ...current])} onChange={(value) => setProjectDraft({ ...projectDraft, thumbnail: value })} onClear={() => confirmImageClear("Portfolio card thumbnail", () => setProjectDraft((current) => current ? { ...current, thumbnail: "" } : current))} />
                <MediaField label="02 · Detail page header" hint="1920 × 725 px" value={projectDraft.heroImage} library={media} onUploaded={(item) => setMedia((current) => [item, ...current])} onChange={(value) => setProjectDraft({ ...projectDraft, heroImage: value })} onClear={() => confirmImageClear("Detail page header", () => setProjectDraft((current) => current ? { ...current, heroImage: "" } : current))} />
                <MediaField label="03 · Overview supporting image" hint="1450 × 1000 px" value={projectDraft.aboutImage} library={media} onUploaded={(item) => setMedia((current) => [item, ...current])} onChange={(value) => setProjectDraft({ ...projectDraft, aboutImage: value })} onClear={() => confirmImageClear("Overview supporting image", () => setProjectDraft((current) => current ? { ...current, aboutImage: "" } : current))} />
                <div className={styles.galleryHeading}><div><strong>04 · Detail gallery</strong><small>Images appear in this order. Recommended 1480 × 1000 px.</small></div><button type="button" className={styles.secondaryButton} onClick={() => setProjectDraft({ ...projectDraft, gallery: [...projectDraft.gallery, ""] })}><Icon name="bi-plus-lg" /> Add image</button></div>
                {projectDraft.gallery.map((src, index) => <div className={styles.galleryItem} key={`${index}-${projectDraft.gallery.length}`}>
                  <div className={styles.galleryItemHeading}><span>Image {String(index + 1).padStart(2, "0")}</span><div><button type="button" aria-label={`Move image ${index + 1} up`} disabled={index === 0} onClick={() => { const next = [...projectDraft.gallery]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; setProjectDraft({ ...projectDraft, gallery: next }); }}><Icon name="bi-arrow-up" /></button><button type="button" aria-label={`Move image ${index + 1} down`} disabled={index === projectDraft.gallery.length - 1} onClick={() => { const next = [...projectDraft.gallery]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; setProjectDraft({ ...projectDraft, gallery: next }); }}><Icon name="bi-arrow-down" /></button><button type="button" aria-label={`Remove image ${index + 1}`} onClick={async () => { if (await confirmChange("Remove gallery image?", "This image will be removed from the project gallery after you save. It will stay in Media Library.", "Remove image", true)) setProjectDraft((current) => current ? { ...current, gallery: current.gallery.filter((_, imageIndex) => imageIndex !== index) } : current); }}><Icon name="bi-trash3" /></button></div></div>
                  <MediaField label="Gallery image" hint="1480 × 1000 px" value={src} library={media} onUploaded={(item) => setMedia((current) => [item, ...current])} onChange={(value) => setProjectDraft({ ...projectDraft, gallery: projectDraft.gallery.map((item, imageIndex) => imageIndex === index ? value : item) })} onClear={() => confirmImageClear(`Gallery image ${index + 1}`, () => setProjectDraft((current) => current ? { ...current, gallery: current.gallery.map((item, imageIndex) => imageIndex === index ? "" : item) } : current))} />
                </div>)}
              </div>
              <div className={styles.editorBlock}><h3>Publishing</h3><div className={styles.twoFields}><Field label="Status"><select className={styles.input} value={projectDraft.status} onChange={(event) => setProjectDraft({ ...projectDraft, status: event.target.value as Status })}><option>Draft</option><option>Published</option><option>Takedown</option></select></Field><label className={styles.checkboxField}><input type="checkbox" checked={projectDraft.featured} onChange={(event) => setProjectDraft({ ...projectDraft, featured: event.target.checked })} /> Show in homepage showcase</label></div><p className={styles.helperNotice}>Up to {MAX_HOMEPAGE_PROJECTS} projects. Only Published projects with a card thumbnail appear on the landing page.</p></div>
            </div><div className={styles.drawerFooter}>{projectDraft.id && projectDraft.status === "Published" && <Link className={styles.viewLink} href={`/portfolio-details/${projectDraft.slug}`} target="_blank">View page <Icon name="bi-arrow-up-right" /></Link>}<button type="button" className={styles.secondaryButton} onClick={() => setProjectDraft(null)}>Cancel</button><button type="submit" className={styles.primaryButton}>Save project <Icon name="bi-arrow-right" /></button></div>
          </form>
        </aside>
      </div>}

      {articleDraft && <div className={styles.drawerLayer}>
        <button className={styles.drawerBackdrop} type="button" aria-label="Close article editor" onClick={() => setArticleDraft(null)} />
        <aside className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="article-editor-title">
          <div className={styles.drawerHeader}><div><p className={styles.eyebrow}>BLOG EDITOR</p><h2 id="article-editor-title">{articleDraft.id ? "Edit article" : "New article"}</h2></div><button type="button" className={styles.closeButton} aria-label="Close editor" onClick={() => setArticleDraft(null)}><Icon name="bi-x-lg" /></button></div>
          <form onSubmit={saveArticle} className={styles.drawerForm}><div className={styles.drawerBody} data-lenis-prevent>
            <div className={styles.editorBlock}>
              <h3>Article details</h3>
              <Field label="Article title"><input required className={styles.input} value={articleDraft.title} placeholder="A clear, useful article title" onChange={(event) => setArticleDraft({ ...articleDraft, title: event.target.value })} /></Field>
              <div className={styles.twoFields}><Field label="Slug"><input className={styles.input} value={articleDraft.slug} placeholder={slugify(articleDraft.title) || "article-title"} onChange={(event) => setArticleDraft({ ...articleDraft, slug: event.target.value })} /></Field><Field label="Category"><select className={styles.input} value={articleDraft.category} onChange={(event) => setArticleDraft({ ...articleDraft, category: event.target.value })}><option>Design</option><option>Development</option><option>Strategy</option><option>Process</option></select></Field></div>
              <Field label="Description / excerpt" hint="Shown below the title and on blog cards. Aim for 120–160 characters."><textarea className={styles.textarea} rows={3} value={articleDraft.excerpt} placeholder="What will readers learn?" onChange={(event) => setArticleDraft({ ...articleDraft, excerpt: event.target.value })} /></Field>
            </div>
            <div className={styles.editorBlock}><h3>Author</h3><div className={styles.twoFields}><Field label="Written by"><input className={styles.input} value={articleDraft.author} placeholder="Author name" onChange={(event) => setArticleDraft({ ...articleDraft, author: event.target.value })} /></Field><Field label="Author role"><input className={styles.input} value={articleDraft.authorRole} placeholder="e.g. Product Designer at Lyven" onChange={(event) => setArticleDraft({ ...articleDraft, authorRole: event.target.value })} /></Field></div><Field label="Author description" hint="A short introduction for the article sidebar."><textarea className={styles.textarea} rows={3} value={articleDraft.authorDescription} placeholder="What does this author work on?" onChange={(event) => setArticleDraft({ ...articleDraft, authorDescription: event.target.value })} /></Field></div>
            <div className={styles.editorBlock}><h3>Cover image</h3><p className={styles.helperNotice}>Only one article image: it appears above the article body and on blog cards. Recommended 1600 × 900 px.</p><MediaField label="Article cover" hint="1600 × 900 px" value={articleDraft.image} library={media} onUploaded={(item) => setMedia((current) => [item, ...current])} onChange={(value) => setArticleDraft({ ...articleDraft, image: value })} onClear={() => confirmImageClear("Article cover", () => setArticleDraft((current) => current ? { ...current, image: "" } : current))} /><Field label="Image alt text" hint="Describe what is visible for accessibility."><input className={styles.input} value={articleDraft.imageAlt} placeholder="e.g. Blue abstract architectural detail" onChange={(event) => setArticleDraft({ ...articleDraft, imageAlt: event.target.value })} /></Field></div>
            <div className={styles.editorBlock}><h3>Article body</h3><p className={styles.editorIntro}>Write paragraphs, headings, quotes, and lists. Select text to apply bold, italic, or underline.</p><RichTextEditor value={articleDraft.bodyHtml} onChange={(value) => setArticleDraft((current) => current ? { ...current, bodyHtml: value } : current)} /></div>
            <div className={styles.editorBlock}><h3>Publishing</h3><div className={styles.twoFields}><Field label="Tags / topics" hint="Separate with commas"><input className={styles.input} value={articleDraft.tags} placeholder="design, product" onChange={(event) => setArticleDraft({ ...articleDraft, tags: event.target.value })} /></Field><Field label="Publish date"><input className={styles.input} type="date" value={articleDraft.publishDate} onChange={(event) => setArticleDraft({ ...articleDraft, publishDate: event.target.value })} /></Field></div><div className={styles.twoFields}><Field label="Status"><select className={styles.input} value={articleDraft.status} onChange={(event) => setArticleDraft({ ...articleDraft, status: event.target.value as Status })}><option>Draft</option><option>Published</option><option>Takedown</option></select></Field><label className={styles.checkboxField}><input type="checkbox" checked={Boolean(articleDraft.featured)} onChange={(event) => setArticleDraft({ ...articleDraft, featured: event.target.checked })} /> Feature on blog and homepage</label></div><p className={styles.helperNotice}>Up to {MAX_FEATURED_ARTICLES} articles. The same Published articles appear in blog highlights and on the landing page. Draft and Takedown stay hidden.</p></div>
            <details className={styles.articlePreview}><summary>Preview article layout <Icon name="bi-chevron-down" /></summary><div className={styles.articlePreviewBody}><small>{articleDraft.category}</small><h2>{articleDraft.title || "Article title"}</h2><p>{articleDraft.excerpt || "Article description appears here."}</p><span>Written by {articleDraft.author || "Author name"} · {articleDraft.authorRole || "Role"}</span><Thumb src={articleDraft.image} label="Article cover" /><div className={styles.previewProse} dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(articleDraft.bodyHtml) }} /></div></details>
          </div><div className={styles.drawerFooter}>{articleDraft.id && articleDraft.status === "Published" && <Link className={styles.viewLink} href={`/blog/${articleDraft.slug}`} target="_blank">View article <Icon name="bi-arrow-up-right" /></Link>}<button type="button" className={styles.secondaryButton} onClick={() => setArticleDraft(null)}>Cancel</button><button type="submit" className={styles.primaryButton}>Save article <Icon name="bi-arrow-right" /></button></div></form>
        </aside>
      </div>}
      {mediaDraft && <div className={styles.drawerLayer}>
        <button className={styles.drawerBackdrop} type="button" aria-label="Close media editor" onClick={() => setMediaDraft(null)} />
        <aside className={`${styles.drawer} ${styles.mediaDrawer}`} role="dialog" aria-modal="true" aria-labelledby="media-editor-title">
          <div className={styles.drawerHeader}><div><p className={styles.eyebrow}>MEDIA LIBRARY</p><h2 id="media-editor-title">Edit asset</h2></div><button type="button" className={styles.closeButton} aria-label="Close editor" onClick={() => setMediaDraft(null)}><Icon name="bi-x-lg" /></button></div>
          <form className={styles.drawerForm} onSubmit={(event) => { event.preventDefault(); saveMedia(mediaDraft); }}>
            <div className={styles.drawerBody} data-lenis-prevent><Thumb src={mediaDraft.src} label={mediaDraft.alt || mediaDraft.name} className={styles.mediaDrawerPreview} /><Field label="Asset name"><input required className={styles.input} value={mediaDraft.name} onChange={(event) => setMediaDraft({ ...mediaDraft, name: event.target.value })} /></Field><Field label="Alt text" hint="Describe what is visible in the image."><textarea className={styles.textarea} rows={3} value={mediaDraft.alt} onChange={(event) => setMediaDraft({ ...mediaDraft, alt: event.target.value })} /></Field><p className={styles.helperNotice}>Removing an assigned image also clears it from its projects and articles. You will be asked to confirm before deletion.</p><button type="button" className={styles.deleteTextButton} onClick={() => deleteMedia(mediaDraft)}><Icon name="bi-trash3" /> Remove from library</button></div>
            <div className={styles.drawerFooter}><button type="button" className={styles.secondaryButton} onClick={() => setMediaDraft(null)}>Cancel</button><button type="submit" className={styles.primaryButton}>Save asset <Icon name="bi-arrow-right" /></button></div>
          </form>
        </aside>
      </div>}
      {inquiryDraft && <div className={styles.drawerLayer}>
        <button className={styles.drawerBackdrop} type="button" aria-label="Close inquiry editor" onClick={() => setInquiryDraft(null)} />
        <aside className={`${styles.drawer} ${styles.mediaDrawer}`} role="dialog" aria-modal="true" aria-labelledby="inquiry-editor-title">
          <div className={styles.drawerHeader}><div><p className={styles.eyebrow}>INBOX</p><h2 id="inquiry-editor-title">{inquiryDraft.id ? "Edit inquiry" : "New inquiry"}</h2></div><button type="button" className={styles.closeButton} aria-label="Close editor" onClick={() => setInquiryDraft(null)}><Icon name="bi-x-lg" /></button></div>
          <form className={styles.drawerForm} onSubmit={saveInquiry}><div className={styles.drawerBody} data-lenis-prevent>
            <p className={styles.helperNotice}>Use this form to add or correct an inquiry manually. Only administrators can access these details.</p>
            <div className={styles.twoFields}><Field label="Name"><input required className={styles.input} value={inquiryDraft.name} onChange={(event) => setInquiryDraft({ ...inquiryDraft, name: event.target.value })} /></Field><Field label="Email"><input required type="email" className={styles.input} value={inquiryDraft.email} onChange={(event) => setInquiryDraft({ ...inquiryDraft, email: event.target.value })} /></Field></div>
            <div className={styles.twoFields}><Field label="Company"><input className={styles.input} value={inquiryDraft.company} onChange={(event) => setInquiryDraft({ ...inquiryDraft, company: event.target.value })} /></Field><Field label="Project type"><select className={styles.input} value={inquiryDraft.projectType} onChange={(event) => setInquiryDraft({ ...inquiryDraft, projectType: event.target.value })}><option>Branding</option><option>UI/UX Design</option><option>Development</option></select></Field></div>
            <div className={styles.twoFields}><Field label="Budget"><input className={styles.input} value={inquiryDraft.budget} onChange={(event) => setInquiryDraft({ ...inquiryDraft, budget: event.target.value })} /></Field><Field label="Timeline"><input className={styles.input} value={inquiryDraft.timeline} onChange={(event) => setInquiryDraft({ ...inquiryDraft, timeline: event.target.value })} /></Field></div>
            <Field label="Message"><textarea className={styles.textarea} rows={5} value={inquiryDraft.message} onChange={(event) => setInquiryDraft({ ...inquiryDraft, message: event.target.value })} /></Field>
          </div><div className={styles.drawerFooter}><button type="button" className={styles.secondaryButton} onClick={() => setInquiryDraft(null)}>Cancel</button><button type="submit" className={styles.primaryButton}>Save inquiry <Icon name="bi-arrow-right" /></button></div></form>
        </aside>
      </div>}
      {testimonialDraft && <div className={styles.drawerLayer}>
        <button className={styles.drawerBackdrop} type="button" aria-label="Close testimonial editor" onClick={() => setTestimonialDraft(null)} />
        <aside className={`${styles.drawer} ${styles.mediaDrawer}`} role="dialog" aria-modal="true" aria-labelledby="testimonial-editor-title">
          <div className={styles.drawerHeader}><div><p className={styles.eyebrow}>CLIENT FEEDBACK</p><h2 id="testimonial-editor-title">{testimonialDraft.id ? "Edit testimonial" : "New testimonial"}</h2></div><button type="button" className={styles.closeButton} aria-label="Close editor" onClick={() => setTestimonialDraft(null)}><Icon name="bi-x-lg" /></button></div>
          <form className={styles.drawerForm} onSubmit={saveTestimonial}><div className={styles.drawerBody} data-lenis-prevent>
            <Field label="Client name"><input required className={styles.input} value={testimonialDraft.senderName} onChange={(event) => setTestimonialDraft({ ...testimonialDraft, senderName: event.target.value })} /></Field>
            <Field label="Client role or company"><input className={styles.input} value={testimonialDraft.senderTitle} onChange={(event) => setTestimonialDraft({ ...testimonialDraft, senderTitle: event.target.value })} /></Field>
            <Field label="Short title"><input className={styles.input} value={testimonialDraft.title} onChange={(event) => setTestimonialDraft({ ...testimonialDraft, title: event.target.value })} /></Field>
            <Field label="Testimonial"><textarea required className={styles.textarea} rows={5} value={testimonialDraft.message} onChange={(event) => setTestimonialDraft({ ...testimonialDraft, message: event.target.value })} /></Field>
            <div className={styles.twoFields}><Field label="Rating"><select className={styles.input} value={testimonialDraft.star} onChange={(event) => setTestimonialDraft({ ...testimonialDraft, star: Number(event.target.value) })}>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select></Field><Field label="Display order"><input type="number" min={0} className={styles.input} value={testimonialDraft.sortOrder} onChange={(event) => setTestimonialDraft({ ...testimonialDraft, sortOrder: Number(event.target.value) })} /></Field></div>
            <Field label="Status"><select className={styles.input} value={testimonialDraft.status} onChange={(event) => setTestimonialDraft({ ...testimonialDraft, status: event.target.value as Status })}><option>Draft</option><option>Published</option><option>Takedown</option></select></Field>
          </div><div className={styles.drawerFooter}><button type="button" className={styles.secondaryButton} onClick={() => setTestimonialDraft(null)}>Cancel</button><button type="submit" className={styles.primaryButton}>Save testimonial <Icon name="bi-arrow-right" /></button></div></form>
        </aside>
      </div>}
      {confirmation && <div className={styles.confirmLayer}>
        <button type="button" className={styles.confirmBackdrop} aria-label="Cancel confirmation" onClick={() => closeConfirmation(false)} />
        <div className={styles.confirmDialog} role={confirmation.destructive ? "alertdialog" : "dialog"} aria-modal="true" aria-labelledby="admin-confirm-title" aria-describedby="admin-confirm-message">
          <div className={`${styles.confirmIcon} ${confirmation.destructive ? styles.confirmIconDanger : ""}`}><Icon name={confirmation.destructive ? "bi-exclamation-triangle" : "bi-check2-circle"} /></div>
          <h2 id="admin-confirm-title">{confirmation.title}</h2>
          <p id="admin-confirm-message">{confirmation.message}</p>
          <div className={styles.confirmActions}>
            <button type="button" className={styles.secondaryButton} autoFocus onClick={() => closeConfirmation(false)}>Cancel</button>
            <button type="button" className={confirmation.destructive ? styles.dangerButton : styles.primaryButton} onClick={() => closeConfirmation(true)}>{confirmation.confirmLabel}</button>
          </div>
        </div>
      </div>}
    </div>
  );
}
