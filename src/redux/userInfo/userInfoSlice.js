import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [], // Important: Make sure orders is initialized as an array
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Payload should be an order object, not wrapped inside { order }
      const newOrder = action.payload;
      state.orders.unshift(newOrder);
    },
    updateUserOrders: (state, action) => {
      state.orders = action.payload; // payload should be array of orders
    },
    deleteUserOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, updateUserOrders, deleteUserOrders } = userInfoSlice.actions;
export default userInfoSlice.reducer;
