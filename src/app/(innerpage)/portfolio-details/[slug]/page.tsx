import React from 'react';
import { notFound } from 'next/navigation';
import PortfolioDetails from '../../../Components/PortfolioDetails/PortfolioDetails';
import { getPortfolioItemBySlug, getPortfolioSlugs } from '../../../../lib/portfolio';

// Generate static params for all slugs
export async function generateStaticParams() {
  const slugs = getPortfolioSlugs();
  return slugs
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => ({
      slug: slug.replace(/\.md$/, ''),
    }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PortfolioDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;
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
