export type ProjectCategory =
  | "Branding"
  | "UI/UX Design"
  | "Development";

export interface LyvenProject {
  index: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryPill: string;
  description: string;
  image?: string;
  detailHref?: string;
  featured: boolean;
  bgColor: string;
  hoverBgColor: string;
}

export const lyvenProjects: LyvenProject[] = [
  {
    index: "01",
    slug: "humic-engineering",
    title: "Humic Engineering",
    category: "Development",
    categoryPill: "Web App • Company Profile",
    description: "Company profile and product showcase for an industrial engineering company.",
    detailHref: "/portfolio-details/humic-engineering",
    featured: false,
    bgColor: "#edf3fa",
    hoverBgColor: "#e4edf7",
  },
  {
    index: "02",
    slug: "qwibly",
    title: "Qwibly",
    category: "Development",
    categoryPill: "Internal Tools • Automation",
    description: "Internal tools and workflow automation for modern teams.",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_26 PM-1.png",
    featured: true,
    bgColor: "#eef3f8",
    hoverBgColor: "#e6edf5",
  },
  {
    index: "03",
    slug: "myschoolmate",
    title: "MySchoolMate",
    category: "UI/UX Design",
    categoryPill: "Web App • Education",
    description: "School discovery and comparison platform for parents and students.",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_27 PM-2.png",
    featured: true,
    bgColor: "#f5f6f8",
    hoverBgColor: "#eceef2",
  },
  {
    index: "04",
    slug: "muslim-101",
    title: "Muslim 101",
    category: "Branding",
    categoryPill: "Mobile App • Community",
    description: "Visual identity and digital assets for an Islamic education platform.",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_29 PM-3.png",
    featured: true,
    bgColor: "#e9eef4",
    hoverBgColor: "#dfe5ee",
  },
  {
    index: "05",
    slug: "pos-haji-wong-halal",
    title: "POS Haji Wong Halal",
    category: "Development",
    categoryPill: "Mobile App • POS",
    description: "Point-of-sale application for a fast and practical retail workflow.",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_30 PM-4.png",
    featured: true,
    bgColor: "#f3f5fa",
    hoverBgColor: "#e9edf5",
  },
  {
    index: "06",
    slug: "photobox",
    title: "Photobox",
    category: "UI/UX Design",
    categoryPill: "Mobile App • IoT",
    description: "A modern digital experience for event documentation services.",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_31 PM-5.png",
    featured: true,
    bgColor: "#eceef4",
    hoverBgColor: "#e2e5ee",
  },
];
