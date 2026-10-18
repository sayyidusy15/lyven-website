import React from "react";
import Header1 from "../Components/Header/Header1";
import Footer1 from "../Components/Footer/Footer1";
import Header5 from "../Components/Header/Header5";
import Footer2 from "../Components/Footer/Footer2";
import Footer3 from "../Components/Footer/Footer3";

const DefalultLayout = ({ children }) => {
  return (
    <div className="main-page-area3">
      <Header5></Header5>
      {children}
      {/* <Footer2></Footer2> */}
      <Footer3></Footer3>
    </div>
  );
};

export default DefalultLayout;
