import React, { useState } from "react";
import Navbar from "./Navbar";
import { prod } from "../Data/data";
import Carousal from "./Carousal";
import Footer from "./Footer";
import ProductGrid from "./ProductGrid";

const Home = () => {
  const [filterData, setFilterData] = useState(prod);
  const [search, setSearch] = useState("");

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
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">

        {/* Sticky Navbar */}
        <header className="fixed top-0 w-full z-50 bg-white shadow-md">
          <Navbar handleSearch={handleSearch} />
        </header>

        {/* Space for fixed navbar */}
        <div className="mt-[40px] md:mt-[40px]" />
      
        {/* Carousel Section */}
        <section className="w-full ">
          <Carousal />
        </section>

        {/* Product Grid */}
        <main className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-16">
          {filterData.length === 0 ? (
            <p className="text-2xl font-semibold text-center text-gray-600 animate-pulse">
              😢 Sorry! No product found.
            </p>
          ) : (
            <ProductGrid products={filterData} />
          )}
        </main>
      </div>

    </>
  );
};

export default Home;
