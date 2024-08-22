import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import { prod } from "../Data/data";
import Carousal from "./Carousal";
const Home = () => {
  const [filterData, setFilterData] = useState(prod);
  const [search, setSearch] = useState("");
  const [noProductsFound, setNoProductsFound] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    const filtered =
      query.trim() === ""
        ? prod
        : prod.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );

    setFilterData(filtered);
    setNoProductsFound(filtered.length === 0);
  };

  return (
    <>
    
    <div className="overflow-hidden flex flex-col min-w-screen min-h-screen pb-3 md:mb-[5rem] mx-auto">
      <Navbar handleSearch={handleSearch} />

      {/* Making Carousal */}
      {/* <img src={bg1} alt="bg1" className='h-5' /> */}
      <div className="min-w-screen h-screen mb-[5rem]">

      <Carousal />
      </div>
      <div className="flex justify-center items-center gap-10 max-w-screen flex-wrap  absolute top-[62%] -mt-[10rem] md:-mt-[3rem] md:py-[5rem]">
      {noProductsFound ? (
        <p className="w-[100vw] text-2xl font-bold text-center">Sorry ! No product found :-</p>
      ) : (
          <>
           {filterData.map((item) => (
            <div key={item.id} className="">

              <Product key={item.id} products={item} />
            </div>
          ))}
          </>
         
        )}
        </div>

       
    </div>
    
        </>
  );
};

export default Home;
