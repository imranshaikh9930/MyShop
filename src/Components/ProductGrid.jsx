import React from 'react';
import Product from './Product';

const ProductGrid = ({ products }) => {
  return (
    <section className="w-full px-4 md:px-10 py-10 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Featured Products</h2>
      
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
