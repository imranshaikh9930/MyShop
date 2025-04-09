// components/Product.jsx
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import * as utils from "../utils/logic";
import Star from "./Star";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { StateContext } from "../Context/Context";
import {addToCart } from "../redux/cart/cartSlice";
import toast from "react-hot-toast";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlist, toggleWishlist } = useContext(StateContext);

  const handleProduct = (product) => {
    dispatch(addToCart(product));
    toast.success("Item Added To Cart")
  };

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Optional: calculate discount
  const originalPrice = Math.round(product.price * 1.2);

  return (
    <div className="relative group w-full h-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition duration-300 ease-in-out overflow-hidden">

      {/* Discount Badge */}
      <div className="absolute top-2 left-2 z-40 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
      {product.discountPercent}% OFF
      </div>

      {/* Wishlist Heart Icon */}
      <div
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2 z-40 cursor-pointer"
      >
        {isWishlisted ? (
          <AiFillHeart className="text-red-500 text-2xl" />
        ) : (
          <AiOutlineHeart className="text-gray-400 text-2xl" />
        )}
      </div>

      {/* Product Image */}
      <img
        className="p-6 rounded-t-lg w-36 h-44 object-contain mx-auto md:w-48 md:h-60 z-10 relative transition-transform duration-300 hover:scale-110 hover:-translate-y-2 hover:cursor-pointer"
        src={product.image}
        alt={product.title}
      />

      {/* Product Details */}
      <div className="px-5 pb-5">
        <h5 className="text-lg font-semibold tracking-tight text-gray-800 truncate">
          {product.title}
        </h5>

        {/* Rating */}
        <div className="flex items-center mt-2.5 mb-5 text-yellow-500">
          {utils.renderRating(product.rating.rate * 2).map((val, index) => (
            <Star key={index} text={val} />
          ))}
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
          </div>
          <button
            className="text-white bg-[rgb(255,164,28)] hover:bg-black transition px-5 py-2 rounded-lg text-sm"
            onClick={()=>handleProduct(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
