import Brand2 from '../../../Components/Brand/Brand2';
import Faq1 from '../../../Components/Faq/Faq1';
import HowWeDo from '../../../Components/HowWeDo/HowWeDo';
import PortfolioShowcase from '../../../Components/Project/PortfolioShowcase';
import Pricing2 from '../../../Components/Pricing/Pricing2';
import ServiceCategory from '../../../Components/Services/ServiceCategory';
import TestimonialCard from '../../../Components/Testimonial/TestimonialCard';
import Client from '../../../Components/Client/Client';
import Advantages from '../../../Components/About/Advantages';

export default function WebDevelopmentPage() {
    return (
        <main>
            <Brand2 />
            <HowWeDo />
            <PortfolioShowcase />
            <ServiceCategory />
            <Advantages />
            <Pricing2 />
            <Client />
            <Faq1 />
            <TestimonialCard />
        </main>
    );
}
