import type { Metadata } from 'next';
import LocalProjectDetail from '../../../Components/PortfolioDetails/LocalProjectDetail';
import { publicProjectMeta } from '../../../../lib/public-cms-meta';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await publicProjectMeta((await params).slug);
  return project ? { title: `${project.title} | Lyven`, description: project.summary } : { title: 'Portfolio | Lyven', description: 'Explore Lyven projects.' };
}

const PortfolioDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <LocalProjectDetail slug={slug} />;
};

export default PortfolioDetailsPage;
