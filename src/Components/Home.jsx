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
    <div className="overflow-hidden max-w-screen h-[100vh] pb-3 mx-auto">
      <Navbar handleSearch={handleSearch} />

      {/* Making Carousal */}
      {/* <img src={bg1} alt="bg1" className='h-5' /> */}
      <div className="w-screen bg-red-500">

      <Carousal />
      </div>
      <div className="flex justify-center items-center gap-10 max-w-screen flex-wrap max-w-screen absolute top-[62%] -mt-[10rem] md:-mt-[3rem]">
      {noProductsFound ? (
        <p className="w-[100vw] text-2xl font-bold text-center">Sorry ! No product found :-</p>
      ) : (
          <>
           {filterData.map((item) => (
            <Product key={item.id} products={item} />
          ))}
          </>
         
        )}
        </div>
    </div>
  );
};

export default Home;
