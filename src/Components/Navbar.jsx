import React,{useState} from 'react';
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {NavLink} from "react-router-dom"
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({handleSearch}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cart  = useSelector((state)=>state.cart);
    const user = useSelector((state)=>state.user);
      const navigate = useNavigate();
    // console.log(user); 

    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          // toast.success("User Logged Out !");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
  // const getUserName = (email) => email.split("@")[0];
  return (
    
    <header className="fixed top-0 left-0 right-0 z-[100] w-screen">
    <nav className="bg-black max-w-screen h-full flex justify-between items-center text-white p-3 gap-3">
      <NavLink className="text-xl hidden md:block" to={"/"}>
      {/* <img src={logo} alt="" className="w-[100px] object-contain mx-auto mt-[18px] "/> */}
      MY SHop
      </NavLink>

      {/* Search Input */}
      <div className="flex flex-1 items-center h-10 bg-white w-1/2 gap-2 rounded-r-lg">
        <input
          type="text"
          placeholder="Search Products...."
          className="border border-0 text-black outline-0 w-[100%] px-4 md:w-[100%]  "
          onChange={handleSearch}
        />
        <div className="bg-yellow-500 h-[100%] p-3 rounded-r-lg">
          <FaSearch className="text-black h-[100%]" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {mobileMenuOpen ? (
          <FaTimes
          
            className="text-white text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <FaBars
            className="text-white text-2xl"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between gap-6 p-2 ">
        {/* <NavLink to={"/login"}>Login</NavLink> */}
        {user ? (
          <>
            <span className="text-white">
            Hello, {user ? user.name : "Guest"} <br />
              <button onClick={handleLogout}>Logout</button>
            </span>
            {/* <span className="header__optionTwo">
                  {user ? "Sign Out" : "Sign In"}
                </span> */}
          </>
        ) : (
          <>
            <NavLink to={"/login"}>Login</NavLink>
          </>
        )}
        <NavLink to={"/orders"}>Return & <br/>Orders</NavLink>
        <div className="md:relative">
          <NavLink to={"/cart"}>
            <FaShoppingCart className="w-6 h-6 text-yellow-500 md:mr-4" />
          </NavLink>
          <p className="absolute -top-3 -right-1 bg-red-600 rounded-full w-5 text-center md:mr-4">
            {cart.length}
          </p>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[100%] left-0 z-0 w-full bg-black text-white transition-transform ">
          <ul className="flex flex-col items-center gap-4 py-4">
            {user ? (
              <li>
                Hello <small>{user.name}</small> <br />
                <button onClick={handleLogout} className='text-center mt-2 rounded-lg py-1 px-3 bg-[rgb(255,164,28)]'>Logout</button>
              </li> 
            ) : (
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to={"/orders"}>Return & Orders</NavLink>
            </li>
          </ul>
        </div>
      )}

      <div className="fixed bottom-[2.5rem] right-4 bg-black p-2 rounded-full md:hidden">
        <NavLink to={"/cart"}>
          <FaShoppingCart className="w-6 h-6 text-yellow-500" />
        </NavLink>
        <p className="absolute -top-3 -right-1 bg-red-600 rounded-full w-5 text-center">
          {cart.length}
        </p>
      </div>
    </nav>
  </header>

  )
}

export default Navbar