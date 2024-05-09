import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useSelector } from 'react-redux'
import Subtotal from './Subtotal';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
const Checkout = () => {
    const cart = useSelector((state)=>state.cart);
    const user  = useSelector((state)=>state.user);
    
  return (

    <>
   
   <Navbar/>

<div className="mx-auto flex flex-col justify-between md:flex-row">
<div className="md:w-3/4 md:mt-2"> {/* Adjust width as needed */}
  <h1 className=" text-2xl md:text-3xl text-center text-gray-900 dark:text-white p-4 mt-[4rem] md:mt-[4.6rem] md:p-3">
    {cart.length > 0 ? ( `Your Cart Items : ${cart.length}`) : ` Your Cart is Empty`}
   
  </h1>

  <div className="flex flex-col gap-4 items-center justify-center">
    {cart.map((prod,index) => (
    //   <Checkout key={prod.id} prod={prod} />
    
      <CheckoutProduct
        key={prod.id}
        cartId = {index}
        image={prod.image}
        title={prod.title}
        price={prod.price}
        rating={prod.rating}
        quantity= {prod.quantity}
        description={prod.description}
      />
    ))}
  </div>
</div>

<div className="md:w-1/4 bg-white rounded p-4 mt-0 md:mt-20 text-center ">
 
  <Subtotal/>
  {user ? 
  <NavLink to="/payment">
    <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Proceed to Checkout
    </button>
  </NavLink>
 : (
  <NavLink to="/login">

    <p className='text-red-500 text-md space-y-5'>Login First</p>
  </NavLink>
)}
  
</div>
</div>
</>
)
}



export default Checkout