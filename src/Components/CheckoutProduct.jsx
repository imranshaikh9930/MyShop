import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions';


const CheckoutProduct = ({id,cartId,title,image,price,rating,description}) => {
    const dispatch = useDispatch();

    const handleRemoveClick = () => {
        dispatch(removeFromCart(cartId));
      }
    
  return (

    <div key={id} className="sm:max-w-[100vw] md:max-w-screen object-cover flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:p-4 md:m-6 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

  <img
    className="object-cover w-3/4 rounded-t-lg h-full my-2 md:h-full md:w-36 md:rounded-lg"
    // eslint-disable-next-line react/prop-types
    src={image}
  
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {description}
    </p>
    <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
    ₹{price}
    </p>
    <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
      {/* Quantity: {rating} */}
    </p>
    <div className='flex flex-col md:flex-row gap-4 '>
    <button
      className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-slate-500 shadow-sm "
      onClick={handleRemoveClick}
    >
     Delete
    </button>
    
    <button
      className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  shadow-slate-500 shadow-sm"
      // onClick={handleRemoveClick}
    >
   Save for later
    </button>
    </div>
   
  </div>
</div>
  )
}

export default CheckoutProduct