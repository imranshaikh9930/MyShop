import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import bg from "../assets/Eccom3.png";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { setUser } from "../redux/user/userSlice";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("imran@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      dispatch(setUser({
        name: userData.name,
        email: userData.email,
        uid: userData.uid,
      }));

      toast.success("Successfully Logged In");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        
        {/* Image Section */}
        <div className="md:w-1/2 bg-blue-100 flex justify-center items-center">
          <img
            src={bg}
            alt="Login"
            className="object-cover w-full h-full p-4"
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back!</h2>
          {!!error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
          >
            Log In
          </button>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <NavLink to="/forgot" className="hover:text-blue-600">
              Forgot Password?
            </NavLink>
            <span>
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-blue-600 font-medium hover:underline">
                Sign up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
