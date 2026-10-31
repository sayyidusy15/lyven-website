import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalProjectDetail from '../../../Components/PortfolioDetails/LocalProjectDetail';
import { getPublishedProject } from '../../../../lib/public-cms-content';
import { canonicalUrl } from '../../../../lib/site-url';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: 'Project unavailable', robots: { index: false, follow: false } };
  const url = canonicalUrl(`/portfolio-details/${slug}`);
  const image = project.heroImage || project.thumbnail;
  return {
    title: project.title,
    description: project.summary || project.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title: `${project.title} | Lyven`, description: project.summary || project.description,
      images: image ? [{ url: image, alt: `${project.title} project` }] : undefined },
    twitter: { card: 'summary_large_image', title: `${project.title} | Lyven`, description: project.summary || project.description,
      images: image ? [image] : undefined },
  };
}

const PortfolioDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();
  return <LocalProjectDetail record={project} />;
};

export default PortfolioDetailsPage;
