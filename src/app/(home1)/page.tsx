import React from 'react';
import Brand2 from '../Components/Brand/Brand2';
import HowWeDo2 from '../Components/HowWeDo/HowWeDo2';
import Services2 from '../Components/Services/Services2';
import Project2 from '../Components/Project/Project2';
import Pricing1 from '../Components/Pricing/Pricing1';
import Awards from '../Components/Award/Awards';
import Testimonial2 from '../Components/Testimonial/Testimonial2';
import Faq1 from '../Components/Faq/Faq1';
import Contact2 from '../Components/Contact/Contact2';
import Blog2 from '../Components/Blog/Blog2';
import HeroBanner4 from '../Components/HeroBanner/HeroBanner4';
import About1 from '../Components/About/About1';
import HowWeDo from '../Components/HowWeDo/HowWeDo';
import PortfolioShowcase from '../Components/Project/PortfolioShowcase';
import Testimonial1 from '../Components/Testimonial/Testimonial1';
import Pricing2 from '../Components/Pricing/Pricing2';
import ServiceCategory from '../Components/Services/ServiceCategory';
import Marquee2 from '../Components/Marquee/Marquee2';
import TestimonialCard from '../Components/Testimonial/TestimonialCard';
import Marquee from '../Components/Marquee/Marquee';
import Client from '../Components/Client/Client';
import Advantages from '../Components/About/Advantages';


const page = () => {
    return (
        <div>
            {/* <HeroBanner1></HeroBanner1> */}
            <HeroBanner4></HeroBanner4>
            <Brand2></Brand2>
            <HowWeDo></HowWeDo>
            <PortfolioShowcase></PortfolioShowcase>
            {/* <Testimonial1></Testimonial1> */}
            <ServiceCategory></ServiceCategory>
             <Advantages></Advantages>
            {/* <Marquee2></Marquee2> */}
            <Pricing2></Pricing2>
            {/* <TestimonialCard2></TestimonialCard2> */}
            <Client></Client>
            <Faq1></Faq1>
            <TestimonialCard></TestimonialCard>
            {/* <Marquee2></Marquee2> */}
            {/* <HowWeDo2></HowWeDo2>
            <Services2></Services2>
            <Project2></Project2>
            <Pricing1></Pricing1>
            <Awards></Awards>
            <Testimonial1></Testimonial1>
            
            <Contact2></Contact2>
            <Blog2></Blog2> */}
        </div>
    );
};

export default page;