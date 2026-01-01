import React from 'react';
import PortfolioList from '../../Components/PortfolioList/PortfolioList';
import { getAllPortfolioItems } from '../../../lib/portfolio';

const page = () => {
  const portfolioItems = getAllPortfolioItems();

  return (
    <div className='main-page-area3'>
      <PortfolioList data={portfolioItems} />
    </div>
  );
};

export default page;