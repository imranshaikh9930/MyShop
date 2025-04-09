import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase';
import { toast } from "react-hot-toast";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/Eccom3.png";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    try {
      if (password !== cpassword) {
        throw new Error("Password & Confirm Password Not Matched");
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        uid: user.uid
      });

      // Fetch data from Firebase DB to Redux store
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const updatedUser = { ...userDoc.data(), uid: user.uid };

      dispatch(setUser(updatedUser));

      toast.success("Signup Successful");
      navigate("/login");

    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen md:w-full min-h-screen mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto w-full">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <img src={bg} alt="Signup Background" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-8 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-bold text-center">Create an Account</h2>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm your password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSignUp}
              className="w-full md:w-3/4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>

          {/* Login Redirect */}
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Already have an account? <NavLink to="/login" className="text-blue-600 font-bold">Login</NavLink></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
