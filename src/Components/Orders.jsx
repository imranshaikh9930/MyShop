import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserOrders, updateUserOrders } from '../redux/userInfo/userInfoSlice';
import Order from './Order';
import toast from 'react-hot-toast';

const Orders = () => {
  const user = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userInfo);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const didRunRef = useRef(false);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      dispatch(deleteUserOrders());
      return;
    }

    const localStorageKey = `My_Shop ${user.uid}`;
    let existingOrders = [];

    try {
      const stored = JSON.parse(localStorage.getItem(localStorageKey));
      if (stored?.orders && Array.isArray(stored.orders)) {
        existingOrders = stored.orders.filter((order) => order && order.order_id);
      }
    } catch (err) {
      console.error("Failed to parse orders from localStorage:", err);
    }

    const userOrders = (userInfo.orders || []).filter(order => order && order.order_id);

    if (!didRunRef.current) {
      didRunRef.current = true;

      if (userOrders.length > existingOrders.length) {
        const newUserInfo = { orders: userOrders };
        localStorage.setItem(localStorageKey, JSON.stringify(newUserInfo));
        setOrders(userOrders);
        dispatch(updateUserOrders(userOrders));
      } else {
        setOrders(existingOrders);
        dispatch(updateUserOrders(existingOrders));
      }
    }
  }, [user, dispatch]);

  return (
    <div className="orders py-[1em] px-[4em] font-Inter">
      <h1>Your Orders</h1>

      <div className="orders__order p-[1em] md:p-0 text-[1em]">
        {!user && <p>Sign in to see your orders.</p>}
        {user && orders.length === 0 && <p>Currently no orders.</p>}
        {orders.map((order) => (
          <Order order={order} key={order.order_id} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
