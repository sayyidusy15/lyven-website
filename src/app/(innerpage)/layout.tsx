import React from 'react';
import Header5 from '../Components/Header/Header5';
import Footer2 from '../Components/Footer/Footer2';
import Marquee2 from '../Components/Marquee/Marquee2';


const DefalultLayout = ({ children }) => {
    return (
        <div className='main-page-area'>
            <Header5></Header5>
            {children}
            <Marquee2></Marquee2>
            <Footer2></Footer2>
        </div>
    );
};

export default DefalultLayout;