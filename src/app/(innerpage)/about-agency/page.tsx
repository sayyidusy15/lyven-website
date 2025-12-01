import React from 'react';
import BreadCumb from '../../Components/Common/BreadCumb';
import Blog4 from '../../Components/Blog/Blog4';
import Client from '../../Components/Client/Client';
import Advantages from '../../Components/About/Advantages';
import Counter1 from '../../Components/Counter/Counter1';
import AboutCustomWeb from '../../Components/AboutAgency/AboutCustomWeb';
import OurStory from '../../Components/AboutAgency/OurStory';


const page = () => {
  return (
    <div>
        <AboutCustomWeb />
        <Counter1></Counter1>
        <Client></Client>
        <OurStory />
       
    </div>
  );
};

export default page;