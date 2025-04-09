import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cart/cartSlice'; 
import userReducer from "../redux/user/userSlice";
import userInfoReducer from "./userInfo/userInfoSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    userInfo:userInfoReducer
  },
});
