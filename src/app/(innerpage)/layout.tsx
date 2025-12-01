import React from 'react';
import Header5 from '../Components/Header/Header5';
import Footer3 from '../Components/Footer/Footer3';
import Marquee2 from '../Components/Marquee/Marquee2';


const DefalultLayout = ({ children }) => {
    return (
        <div className='main-page-area'>
            <Header5></Header5>
            {children}
            <Marquee2></Marquee2>
            <Footer3></Footer3>
        </div>
    );
};

export default DefalultLayout;