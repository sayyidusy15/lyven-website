import React from "react";
import Header1 from "../Components/Header/Header1";
import Footer1 from "../Components/Footer/Footer1";
import Header2 from "../Components/Header/Header2";
import Footer2 from "../Components/Footer/Footer2";

const DefalultLayout = ({ children }) => {
  return (
    <div className="main-page-area3">
      <Header2></Header2>
      {children}
      {/* <Footer2></Footer2> */}
    </div>
  );
};

export default DefalultLayout;
