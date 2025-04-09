import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const StateContext = createContext();

const MyProvider = ({ children }) => {
  const [address, setAddress] = useState("Aurangabad Maharashtra 431001");
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage if available
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [isOrder,setIsOrder] = useState(false);

  // Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      localStorage.removeItem('wishlist');
    }
  }, [wishlist]);

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
    toast.success("Item Added To Wishlist");
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    toast.error("Item Removed From Wishlist");
  };

  // Toggle product in wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
     
    } else {
      addToWishlist(product);
      
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        setAddress,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isOrder,setIsOrder
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default MyProvider;
