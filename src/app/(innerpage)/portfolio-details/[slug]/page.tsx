import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioDetails from '../../../Components/PortfolioDetails/PortfolioDetails';
import ProjectCaseStudy from '../../../Components/PortfolioDetails/ProjectCaseStudy';
import FinalCTA from '../../../Components/Cta/FinalCTA';
import { getPortfolioItemBySlug, getPortfolioSlugs } from '../../../../lib/portfolio';
import { getProjectDetail, getProjectDetailSlugs } from '../../../../lib/project-details';

// Generate static params for all slugs
export async function generateStaticParams() {
  const legacySlugs = getPortfolioSlugs()
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => slug.replace(/\.md$/, ''));

  return Array.from(new Set([...legacySlugs, ...getProjectDetailSlugs()])).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Lyven`,
    description: project.description,
  };
}

const PortfolioDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (project) {
    return (
      <div className="main-page-area3">
        <ProjectCaseStudy project={project} />
        <FinalCTA />
      </div>
    );
  }

  const portfolioItem = getPortfolioItemBySlug(slug);

  if (!portfolioItem) {
    notFound();
  }

  return (
    <div className='main-page-area3'>
      <PortfolioDetails data={portfolioItem} />
    </div>
  );
};

export default PortfolioDetailsPage;
