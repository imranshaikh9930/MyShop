import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import bg from "../assets/Eccom3.png";
import { useDispatch } from "react-redux";
import { auth,db } from "../firebase";
import { setUser } from "../redux/actions";
import { getDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      dispatch(
        setUser({
          name: userData.name,
          email: userData.email,
          uid: userData.uid,
        })
      );
      // alert('Successfully Logged In');
      toast.success("Sucessfully Logged In")
      navigate('/');
    } catch (error) {
      console.log(error);
        setError("Invalid Credentials"); // Handle login errors
    }
  };
  

  return (
    <div className="flex justify-center items-center w-screen h-screen mx-auto">
        
      <div className="flex flex-col justify-center shadow-md p-2 shadow-slate-300 space-y-2 my-auto mx-auto md:flex-row md:shadow-sm md:shadow-slate-500 rounded-xl md:w-[60%] md:p-4 items-center">
      
        <div className="w-auto h-auto md:w-[70%] md:h-[300px] md:p-5">
          <img src={bg} className="w-[100%] h-[100%] object-cover md:w-auto md:flex" alt="" />
        </div>
        
        <div className="w-[50%] h-auto md:w-[100%] bg-white opacity-">
          <form className="bg-transparent rounded px-8 pt-6 pb-8 mb-4 md:mx-auto ">
        <h4 className="text-center text-lg font-bold p-3">Login</h4>
           
            {!!error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full md:w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none rounded w-full md:w-[70%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center space-y-4 md:w-[100%] md:space-y-0 md:flex-row md:items-center md:space-x-4">
              <button
                className="w-[100%] md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="button"
                onClick={handleLogin}
              >
                Log In
              </button>
              <NavLink
                to={'/forgot'}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </NavLink>
            </div>
          </form>
          <div className="text-center text-gray-500 text-xs">
            Don't Have an Account.{" "}
            <NavLink to={"/signup"} className="text-blue-700 font-bold ">
              Signup
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
