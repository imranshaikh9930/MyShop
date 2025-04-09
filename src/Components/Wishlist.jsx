import React, { useContext } from 'react';
import { StateContext } from '../Context/Context'; 
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/cart/cartSlice"; 
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlist, setWishlist,removeFromWishlist } = useContext(StateContext);
  const dispatch = useDispatch();


  

  const moveToCart = (item) => {
    dispatch(addToCart(item));
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Your Wishlist is Empty 💔
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist 💖</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
            <img src={item.image} alt={item.name} className="w-40 h-40 object-contain mb-4" />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-lg text-gray-700 mb-2">₹{item.price}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <FaTrash /> Remove
              </button>
              <button
                onClick={() => moveToCart(item)}
                className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
              >
                <FaShoppingCart /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
