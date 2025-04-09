import React, { useState, useContext } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { StateContext } from "../Context/Context"; // 👈 Make sure this is correct path
import { clearUser } from "../redux/user/userSlice"; // Import clearUser action

const Navbar = ({ handleSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); // To dispatch actions
  const navigate = useNavigate();
  const { wishlist } = useContext(StateContext); // 👈 Getting wishlist from context

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Dispatch the clearUser action to clear the Redux state
        dispatch(clearUser());
        navigate("/login"); // Navigate to login page after logging out
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="w-full sticky top-0 z-50  bg-white shadow-md">
      <nav className="bg-black max-w-screen h-full flex justify-between items-center text-white p-3 gap-3">
        <NavLink className="text-xl hidden md:block" to={"/"}>
          MY Shop
        </NavLink>

        {/* Search Input */}
        <div className="flex flex-1 items-center h-10 bg-white w-1/2 gap-2 rounded-r-lg">
          <input
            type="text"
            placeholder="Search Products...."
            className="border border-0 text-black outline-0 w-full px-4"
            onChange={handleSearch}
          />
          <div className="bg-yellow-500 h-full p-3 rounded-r-lg">
            <FaSearch className="text-black h-full" />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {mobileMenuOpen ? (
            <FaTimes
              className="text-white text-2xl"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
          ) : (
            <FaBars
              className="text-white text-2xl"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between gap-6 p-2">
          {user ? (
            <>
              <span className="text-white">
                Hello, {user.name || "Guest"} <br />
                <button onClick={handleLogout}>Logout</button>
              </span>
            </>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}

          <NavLink to={"/orders"}>
            Return & <br />
            Orders
          </NavLink>

          {/* Wishlist */}
          <div className="relative">
            <NavLink to={"/wishlist"}>
              WishList
            </NavLink>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs text-center text-white">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <NavLink to={"/cart"}>
              <FaShoppingCart className="w-6 h-6 text-yellow-500" />
            </NavLink>
            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs text-center text-white">
              {cart.length}
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[100%] left-0 z-0 w-full bg-black text-white transition-transform">
            <ul className="flex flex-col items-center gap-4 py-4">
              {user ? (
                <li>
                  Hello <small>{user.name}</small> <br />
                  <button
                    onClick={handleLogout}
                    className="text-center mt-2 rounded-lg py-1 px-3 bg-[rgb(255,164,28)]"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              )}
              <li>
                <NavLink to={"/orders"}>Return & Orders</NavLink>
              </li>
              <li>
                <NavLink to={"/wishlist"}>Wishlist</NavLink>
              </li>
              <li>
                <NavLink to={"/cart"}>Cart ({cart.length})</NavLink>
              </li>
              <li>
                <NavLink to={"/"} onClick={() => setMobileMenuOpen(false)}>
                  Back To Home
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Cart Button */}
        <div className="fixed bottom-[2.5rem] right-4 bg-black p-2 rounded-full md:hidden z-50">
          <NavLink to={"/cart"}>
            <FaShoppingCart className="w-6 h-6 text-yellow-500" />
          </NavLink>
          <p className="absolute -top-3 -right-1 bg-red-600 rounded-full w-5 text-center">
            {cart.length}
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
