import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const portfolioDirectory = path.join(process.cwd(), 'src/content/portfolio');

export interface Technology {
  name: string;
  logo: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  categories: string[]; // For list view filters
  description: string;
  scopeOfWork: string[];
  projectType: string;
  projectLink: string;
  projectDisplayLink: string;
  images: string[];
  image: string; // Thumbnail
  companyLogo: string;
  technologies: Technology[];
  content: string;
}

export function getPortfolioSlugs() {
  if (!fs.existsSync(portfolioDirectory)) {
    return [];
  }
  return fs.readdirSync(portfolioDirectory);
}

export function getPortfolioItemBySlug(slug: string): PortfolioItem | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(portfolioDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    category: data.category || '',
    categories: data.categories || [],
    description: data.description || '',
    scopeOfWork: data.scopeOfWork || [],
    projectType: data.projectType || 'website',
    projectLink: data.projectLink || '#',
    projectDisplayLink: data.projectDisplayLink || 'Visit Link',
    images: data.images || [],
    image: data.image || '',
    companyLogo: data.companyLogo || '',
    technologies: data.technologies || [],
    content: content,
  } as PortfolioItem;
}

export function getAllPortfolioItems(): PortfolioItem[] {
  const slugs = getPortfolioSlugs();
  const posts = slugs
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => getPortfolioItemBySlug(slug))
    // Filter out nulls if any file read failed
    .filter((post): post is PortfolioItem => post !== null);
  return posts;
}
