import { useContext, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../Context/Context";
import { v4 } from "uuid";
import moment from "moment";
import { FaPen } from "react-icons/fa";
import { addOrder } from "../redux/userInfo/userInfoSlice";
import { emptyCart } from "../redux/cart/cartSlice";
import * as utils from "../utils/logic";
import toast from "react-hot-toast";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement } from "@stripe/react-stripe-js";

const Payment = () => {
  const dispatch = useDispatch();
  const {address,setAddress} = useContext(StateContext)
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // If cart is empty, redirect to orders
    if (!cart.length) {
      navigate("/orders", { replace: true });
      return;
    }
  
    if (!error) {
      setProcessing(true);
  
      // Order object creation
      const order = {
        order_id: v4(),
        amount: utils.formatter.format(utils.getTotalPrice(cart)),
        created: moment().format("MMMM Do YYYY, h:mma"),
        cart, // you can rename it to items if you want
      };
  
      // ✅ Dispatch addOrder with correct payload
      dispatch(addOrder(order));
  
      // Simulate delay and clean up
      setTimeout(() => {
        setProcessing(false);
        setSucceeded(true);
        setDisabled(true);
        dispatch(emptyCart()); // Empty the cart after order
        toast.success("Ordered Successfully");
        navigate("/orders", { replace: true });
      }, 1000);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSave = () => {
    setActive(!active);
    console.log("Click");
    // save Address in localstorage

    localStorage.setItem("address", address);
    setAddress(localStorage.getItem("address"));
  };
  return (
    <div className="min-h-[90vh]">
      <div className="">
        {/* <h1 className="tex-center text-[1.5em]">Checkout {<Link to="/checkout">{!cart.length ? 'empty' : ${cart.length} ${cart.length === 1 ? 'item' : 'items'} }</Link>}</h1> */}

        <div className="flex p-[1em] gap-1">
          <div className="payment__title flex-1">
            <h3>Delivery Address</h3>
          </div>
          <div className="flex-1">
            {/* <p>{user?.email}</p> */}
            {active ? (
              <div className="flex items-center justify-around">
                <textarea
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Enter your address"
                  className="w-[400px] px-4 py-3"
                  
                />
                <button className="bg-black text-white px-4 py-2 rounded-md" onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div className="flex items-center justify-around ">
               
                
                <p> {!address ? "Aurangabad,Maharashtra India":address}</p>
         
                <FaPen onClick={() => setActive(!active)} />
              </div>
            )}
          </div>
        </div>

        <div className="md:py-2 p-[1em] ">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items ">
            {cart?.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                cartId={index}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="flex p-[1em]">
          <div className="payment__title flex-1">
            <h3>Payment Method</h3>
          </div>
          <div className=" flex-[.8]">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="mb-[1em]">
                <div>
                  Order Total :&nbsp;
                  <strong>
                    {utils.formatter.format(utils.getTotalPrice(cart))}
                  </strong>
                </div>
                <button
                  className="bg-[rgb(255,164,28)] text-white p-2  rounded-lg"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? "processing" : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 