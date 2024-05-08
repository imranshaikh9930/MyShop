import React from 'react';
import CheckoutProduct from './CheckoutProduct';
// import './Order.css';

const Order = ({ order }) => {
  console.log(order);

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
      <p>{order.created}</p>
      {order.cart?.map((item) => (
        <CheckoutProduct
          key={item.id} // Assuming 'id' is a unique identifier for each item
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      <p className="order__total font-medium self-end">
        Order Total:{order.amount} {/* Assuming 'amount' is the total price */}
      </p>
    </div>
  );
};

export default Order;
