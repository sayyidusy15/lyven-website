import React from 'react';
import Header5 from '../Components/Header/Header5';
import Footer3 from '../Components/Footer/Footer3';

const DefalultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='main-page-area'>
            <Header5 />
            {children}
            <Footer3 />
        </div>
    );
};

export default DefalultLayout;