import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useSelector } from "react-redux";
import Subtotal from "./Subtotal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  // console.log(cart);

  const handleBackToProduct = ()=>{
    navigate("/")
  }
  return (
    <>
      {/* Main Checkout Content */}
      <div className="mx-auto flex flex-col justify-between md:flex-row ">
        {" "}
        {/* Adjusted padding-top */}
        <div className="md:w-3/4 flex-1">
          {" "}
          {/* Adjust width as needed */}
          <h1 className="text-2xl md:text-3xl text-center text-gray-900 ">
            {cart.length > 0
              ? `Your Cart Items: ${cart.length}`
              : "Your Cart is Empty"}
          </h1>
          <div className="flex flex-col gap-4 items-center justify-center">
            {cart.map((prod, index) => (
              <CheckoutProduct
                key={prod.id}
                cartId={index}
                image={prod.image}
                title={prod.title}
                price={prod.price}
                rating={prod.rating}
                quantity={prod.quantity}
                description={prod.description}
                id={prod.id} // Make sure this is passed for increase/decrease logic
              />
            ))}
          </div>
        </div>
        <div className="md:hidden  mx-auto text-white  ">
          <button onClick={handleBackToProduct} className="p-3 text-center max-w-fit bg-blue-500  rounded-2xl hover:bg-white hover:text-blue-500">
            Back To Products
          </button>
        </div>
        {/* Subtotal and Checkout Button */}
        <div className="md:w-1/4 bg-white rounded p-4 mt-4 md:mt-0 text-center">
          <Subtotal />
          {user ? (
            <NavLink to="/payment">
              <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Proceed to Checkout
              </button>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <p className="text-red-500 text-md">Login First</p>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
