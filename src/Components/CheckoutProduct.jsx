import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/cart/cartSlice';
import { useLocation } from 'react-router-dom';
import { StateContext } from '../Context/Context';

const CheckoutProduct = ({
  id,
  cartId,
  title,
  image,
  price,
  description,
  quantity,
}) => {
  const dispatch = useDispatch();
  const { setIsOrder, isOrder } = useContext(StateContext); // Get `isOrder` from context
  const location = useLocation(); // Get current route path

  const handleRemoveClick = () => {
    dispatch(removeFromCart(cartId)); // Ensure cartId is passed correctly
    toast.error("Item removed from Cart"); // Toast on removal
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity({ id })); // Pass the product `id`
    toast.success("Quantity increased!"); // Optional: Show toast on quantity change
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity({ id })); // Pass the product `id`
    toast.success("Quantity decreased!"); // Optional: Show toast on quantity change
  };

  // Check if the current route is "/payment", and if so, hide quantity controls
  const isPaymentPage = location.pathname === "/payment";

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col md:flex-row items-center p-4 my-4 transition-all transform hover:shadow-lg">
      {/* Image Section */}
      <img
        src={image}
        alt={title}
        className="w-full max-w-[120px] h-auto rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
      />

      {/* Text Content Section */}
      <div className="flex flex-col flex-1 text-center md:text-left">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="font-bold text-gray-800  text-lg mb-2">
          ₹{price}
        </p>

        {/* Quantity Controls - Hide on payment page */}
        {!isPaymentPage && !isOrder && (
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-lg transition"
              onClick={handleDecrease}
            >
              −
            </button>

            <span className="text-xl font-bold text-gray-900">
              {quantity}
            </span>

            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-lg transition"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        )}

        {/* Delete Button */}
        <div className="mt-4">
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleRemoveClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
