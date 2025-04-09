import React, { useContext } from 'react';
import { StateContext } from '../Context/Context';

const Order = ({ order }) => {
  const { address } = useContext(StateContext);

  return (
    <div className="order bg-white rounded-xl shadow-md p-6 m-4 font-Inter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        <div className="text-sm text-gray-600 text-right">
          <p><small>Order ID: {order.order_id}</small></p>
          <p>{order.created}</p>
        </div>
      </div>

      <p className="text-sm mb-4 text-gray-700">
        <span className="font-medium">Shipping Address:</span> {address}
      </p>

      <div className="flex flex-col gap-6">
        {order.cart?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full md:w-32 h-32 object-contain rounded-md"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-md font-semibold text-green-700 mt-2">₹{item.price}</p>
              <p className="text-sm text-gray-500">Rating: {item.rating?.rate}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 font-semibold text-lg text-gray-800">
        Order Total: {order.amount}
      </div>
    </div>
  );
};

export default Order;
