export type BlogPost = {
  slug: string;
  category: "Design" | "Development" | "Strategy" | "Process";
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  searchTerms?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-digital-products-that-actually-work",
    category: "Strategy",
    title: "Designing Digital Products That Actually Work",
    excerpt: "How strategy, design, and development come together to create relevant, usable digital products.",
    date: "20 Sep 2026",
    readTime: "8 min read",
    image: "/assets/img/post_9.jpg",
    imageAlt: "Modern curved building used as the featured article visual",
    featured: true,
    searchTerms: ["business", "strategy", "product process"],
  },
  {
    slug: "designing-for-real-users-not-just-screens",
    category: "Design",
    title: "Designing for Real Users, Not Just Screens",
    excerpt: "A design approach that begins with real user needs, not just interface aesthetics.",
    date: "15 Sep 2026",
    readTime: "4 min read",
    image: "/assets/img/post_6.jpg",
    imageAlt: "Abstract blue architectural form",
    featured: true,
    searchTerms: ["design", "ui ux", "users"],
  },
  {
    slug: "practical-guide-building-scalable-web-apps",
    category: "Development",
    title: "A Practical Guide to Building Scalable Web Apps",
    excerpt: "Technical principles that keep web applications fast, maintainable, and ready to scale.",
    date: "10 Sep 2026",
    readTime: "6 min read",
    image: "/assets/img/post_10.jpg",
    imageAlt: "Code displayed on a dark screen",
    featured: true,
    searchTerms: ["development", "web apps", "technology", "scalable"],
  },
  {
    slug: "how-we-work-from-brief-to-launch",
    category: "Process",
    title: "How We Work: From Brief to Launch",
    excerpt: "A look at Lyven’s collaborative process, from understanding the brief to product launch.",
    date: "28 Aug 2026",
    readTime: "5 min read",
    image: "/assets/img/post_8.jpg",
    imageAlt: "Layered white architectural details",
    featured: true,
    searchTerms: ["process", "brief", "launch", "collaboration"],
  },
  {
    slug: "role-of-ui-ux-in-digital-product-success",
    category: "Design",
    title: "The Role of UI/UX in Digital Product Success",
    excerpt: "Why a clear, intuitive experience plays a central role in digital product success.",
    date: "22 Aug 2026",
    readTime: "5 min read",
    image: "/assets/img/post_7.jpg",
    imageAlt: "Minimal workspace with a laptop",
    searchTerms: ["design", "ui ux", "digital product"],
  },
  {
    slug: "choosing-the-right-tech-stack-for-your-project",
    category: "Development",
    title: "Choosing the Right Tech Stack for Your Project",
    excerpt: "How to assess product needs, constraints, and goals before choosing the technology stack.",
    date: "12 Aug 2026",
    readTime: "7 min read",
    image: "/assets/img/post_11.jpg",
    imageAlt: "Contemporary office building facade",
    searchTerms: ["development", "technology", "tech stack"],
  },
  {
    slug: "design-systems-that-scale",
    category: "Design",
    title: "Design Systems That Scale",
    excerpt: "How a shared design language improves consistency, collaboration, and product delivery.",
    date: "5 Aug 2026",
    readTime: "5 min read",
    image: "/assets/img/post_12.jpg",
    imageAlt: "Abstract architectural composition",
    searchTerms: ["design", "design system", "product"],
  },
  {
    slug: "digital-product-strategy-for-early-stage-teams",
    category: "Strategy",
    title: "Digital Product Strategy for Early-Stage Teams",
    excerpt: "A practical framework for defining priorities, testing assumptions, and building with focus.",
    date: "29 Jul 2026",
    readTime: "7 min read",
    image: "/assets/img/post_13.jpg",
    imageAlt: "Modern workspace used as an article visual",
    searchTerms: ["business", "strategy", "startup", "product"],
  },
];

export const blogDetailHref = (slug: string) => `/blog/${slug}`;

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
