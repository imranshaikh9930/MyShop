import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserOrders, updateUserOrders } from '../redux/actions';
import Order from './Order';
// import './Orders.css';

const Orders = () => {
  const user = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userInfo);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem(`My_Shop ${user?.uid}`))?.orders || [];

    if (user) {
      if (existingOrders.length < userInfo.orders?.length) {
        localStorage.setItem(`My_Shop ${user.uid}`, JSON.stringify(userInfo));
      }

      setOrders(existingOrders);
    }
  }, [userInfo, user]);

  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem(`My_Shop ${user?.uid}`))?.orders || [];

    if (user) {
      dispatch(updateUserOrders(existingOrders));
      setOrders(existingOrders);
    } else {
      setOrders([]);
      dispatch(deleteUserOrders());
    }
  }, [dispatch, user]);

  return (
    <div className="orders py-[1em] px-[4em]">
      <h1>Your Orders</h1>

      <div className="orders__order p-[1em] md:p-0 text-[1em] ">
        {!user && "Sign In to see your orders"}
        {user && !orders.length && "Currently no orders"}
        {orders.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
