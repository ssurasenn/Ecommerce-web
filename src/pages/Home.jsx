//rafce
import React from "react";
import ContentCarousel from "../components/home/contentCarousel";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";

import { Zap ,BellPlus } from 'lucide-react';

const Home = () => {
  return (
    <div className="ml-auto mr-auto">
      <ContentCarousel />

      <div className="inline-flex  gap-2 my-4 px-3 py-2 rounded-3xl bg-red-400  hover:bg-red-500 shadow-md ">
        <Zap  className="m-auto text-white" />
        <span className="text-2xl font-serif text-white">
          Best Seller สินค้าขายดี!!
        </span>
      </div>

      <BestSeller />

      <div className="inline-flex  gap-2 my-4 px-3 py-2 rounded-3xl bg-green-400  hover:bg-green-500 shadow-md ">
      <BellPlus  className="m-auto text-white" />
        <span className="text-2xl font-serif text-white">
          สินค้ามาใหม่!!
        </span>
      </div>

      <NewProduct />


    </div>
  );
};

export default Home;
