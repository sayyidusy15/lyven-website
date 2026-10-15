export interface ProjectScreenshot {
  title: string;
  image?: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  titleLead: string;
  titleAccent: string;
  industry: string;
  service: string;
  duration: string;
  year: string;
  website?: string;
  description: string;
  heroImage?: string;
  aboutImage?: string;
  screenshots: ProjectScreenshot[];
}

const humicEngineering: ProjectDetail = {
  slug: "humic-engineering",
  title: "Humic Engineering",
  titleLead: "Humic",
  titleAccent: "Engineering.",
  industry: "Industrial Engineering",
  service: "Web Development",
  duration: "3 Weeks",
  year: "2025",
  description:
    "Humic Engineering needed a modern and professional website to showcase its services and company profile. The project focused on creating a clear, responsive, and visually strong digital presence that reflects the company’s expertise in industrial engineering.",
  screenshots: [
    { title: "Homepage" },
    { title: "Services Page" },
    { title: "Projects Page" },
    { title: "Mobile View" },
  ],
};

const projectDetails: Record<string, ProjectDetail> = {
  [humicEngineering.slug]: humicEngineering,
};

export function getProjectDetail(slug: string) {
  return projectDetails[slug] ?? null;
}

export function getProjectDetailSlugs() {
  return Object.keys(projectDetails);
}
