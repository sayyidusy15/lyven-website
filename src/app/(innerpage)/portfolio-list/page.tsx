import React from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import Pricing1 from '../../Components/Pricing/Pricing1';
import PortfolioList from '../../Components/PortfolioList/PortfolioList';

const page = () => {
  return (
    <div>
             {/* <BreadCumb
                bgimg="/assets/img/page_header.jpg"
                Title="Our Pricing"
            ></BreadCumb>   */}
            <PortfolioList/>   
    </div>
  );
};

export default page;