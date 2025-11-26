import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(i => i.id === item.id); // also fixed here
    
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    

    removeFromCart: (state, action) => {
      state.cart.splice(action.payload.id, 1); // id here refers to cart index
    },

    increaseQuantity: (state, action) => {
      console.log(action.payload.id);
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      
    },

    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
