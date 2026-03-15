import React from "react";
import Navbar from "../components/Navbar";
import InputForm from "../components/InputForm";
import Footer from "../components/Footer";

const TrackPage = () => (
  <div className="page-shell bg-[#f0fdf4] font-sans">
    <Navbar />
    <main className="page-main">
      <InputForm />
    </main>
    <Footer />
  </div>
);

export default TrackPage;
