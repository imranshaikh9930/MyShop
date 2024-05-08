import React from 'react'
import { NavLink } from 'react-router-dom'
import { addToCart } from '../redux/actions';
import { useDispatch } from 'react-redux';
import * as utils from "../utils/logic";
import Star from "./Star";
const Product = ({products}) => {

    // console.log(products);

    const dispatch = useDispatch();

    const handleProduct = ()=>{
        
        dispatch(addToCart(products));
    }

  return (
    <div className="w-full max-w-sm h-96  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <NavLink to={`/product/${products.id}`}>
        <img className="p-8 rounded-t-lg w-36 h-44 object-cover mx-auto md:w-48 md:h-60" src={products.image} />
      </NavLink>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{products.title}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5 text-[rgb(255,164,28)]">
          {/* Rating */}
          {utils.renderRating(products.rating.rate * 2).map((val, index) => (
            <Star key={index} text={val} className="star-color" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">₹{products.price}</span>
          <button href="#" className="text-white bg-[rgb(255,164,28)] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleProduct(products)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product