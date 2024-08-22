import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
// import Navbar from "./Components/Navbar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import Payment from './Components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import Orders from './Components/Orders';
import Login from "./Components/Login";
import Signup from './Components/Signup';
import Forgot from './Components/Forgot';
import Footer from './Components/Footer';


function App() {
  
  const promise = loadStripe(
    "pk_test_51MVurHSH94er34giiHeXaFdVTJSFY2mlUeb3hHdCQaHPNc12e9nCDzrTtkF5MBQnxDY1jX0IMyj7YDCNjxbLFBXu00MpZdf1zB"
  );
  return (
    <>
    <Router>
      <ToastContainer/>
      <Routes>
      
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot' element={<Forgot/>}/>

        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Checkout/>}/>
   
        
        <Route path="/payment" element={
        
        <Elements stripe={promise}>

          <Payment/>
        </Elements>
        
        
        
        }/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
      {/* <Footer /> */}
    </Router>
    </>
  )
}

export default App
