import React from "react";
import Hero from "../components/home/Hero";
import Bar from "../components/home/Bar";
import NewProduct from "../components/home/NewProduct";

import PremiumCollection from "../components/home/ PremiumCollection";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <Bar />
      <NewProduct />
      <PremiumCollection />
      <Testimonials />
      </div>
  );
};

export default Home;
