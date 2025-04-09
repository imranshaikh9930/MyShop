import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as utils from "../utils/logic";

const Subtotal = () => {
  const { cart } = useSelector((state) => state.cart); // fixed destructuring
  const [error, setError] = useState('');

  // Calculate subtotal with quantity
  const subtotalAmount = cart?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="subtotal p-4 bg-gray-100 rounded shadow-md">
      <div className="subtotal__title text-lg font-medium mb-2 text-gray-800">
        Subtotal ({cart.length === 0 ? 'empty' : `${cart.length} ${cart.length === 1 ? 'item' : 'items'}`}):&nbsp;
        <strong className="text-blue-600">
          {utils.formatter.format(subtotalAmount)}
        </strong>
      </div>

      <div className="subtotal__gift flex items-center gap-2 mb-4">
        <input type="checkbox" name="gift" className="w-4 h-4" />
        <span className="text-sm text-gray-700">This order contains a gift</span>
      </div>

      {/* Optional: if you want to add a button again */}
      {/* 
      <button
        onClick={() => {
          if (!cart.length) {
            setError('Cart is empty');
            return;
          }
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        type="button"
      >
        Proceed to checkout
      </button> 
      */}

      {error && (
        <div className="subtotal__error text-red-500 mt-2 text-sm">{error}</div>
      )}
    </div>
  );
};

export default Subtotal;
