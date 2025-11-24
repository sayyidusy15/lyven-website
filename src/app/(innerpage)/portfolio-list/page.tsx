import React from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import Pricing1 from '../../Components/Pricing/Pricing1';
import PortfolioList from '../../Components/PortfolioList/PortfolioList';
import Herobanner4 from '../../Components/HeroBanner/HeroBanner4';

const page = () => {
  return (
    <div className='main-page-area3'>
             {/* <BreadCumb
                bgimg="/assets/img/page_header.jpg"
                Title="Our Pricing"
            ></BreadCumb>   */}
            <PortfolioList></PortfolioList>   
    </div>
  );
};

export default page;