import React, { useContext, useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct';
import { StateContext } from '../Context/Context';
// import './Order.css';

const Order = ({ order }) => {

  console.log(order);
  const {address} = useContext(StateContext);


  // Format the date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="order p-[2em] m-[1em] bg-white flex flex-col">
      <h2>Order</h2>
      <p className="order__id text-[#777] self-end">
        <small>{order.order_id}</small>
      </p>
      <div className='flex justify-between items-center'>

      <p>{order.created}</p>
      <p>Address:- {address}</p>
      </div>
      {order.cart?.map((item) => (
    
      <div key={item.id} className="sm:max-w-[100vw] md:max-w-screen object-cover flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:p-4 md:m-6 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

  <img
    className="object-cover w-3/4 rounded-t-lg h-full my-2 md:h-full md:w-36 md:rounded-lg"
    // eslint-disable-next-line react/prop-types
    src={item.image}
  
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {item.title}
    </h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {item.description}
    </p>
    <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
    ₹{item.price}
    </p>
    <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
      Rating: {item.rating.rate}
    </p>
    <div className='flex flex-col md:flex-row gap-4 '>

    </div>
   
  </div>
</div>
      ))}
      <p className="order__total font-medium self-end">
        Order Total:{order.amount} {/* Assuming 'amount' is the total price */}
      </p>
    </div>
  );
};

export default Order;
