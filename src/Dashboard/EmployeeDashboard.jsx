import React from "react";
import Header from "../Common/Header";
import Landingpage from "../Pages/Landingpage";
import JobSection from "../Components/JobSection";
import WhatWeOffer from "../Components/WhatWeoffer";
import Footer from "../Components/Footer";

const EmployeeDash = () => {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#14243A] flex flex-col">
      <Header />
      <main className="flex-1">
        <Landingpage />
        <JobSection />
        <WhatWeOffer />
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeDash;
