import  { useState } from 'react'
import {NavLink} from "react-router-dom";
import {createUserWithEmailAndPassword } from 'firebase/auth';
import { db,auth } from '../firebase';
import {toast} from "react-toastify"
import { doc, setDoc,getDoc } from 'firebase/firestore';
import {useDispatch,useSelector } from "react-redux";
import { setUser } from '../redux/actions';
import {useNavigate} from 'react-router-dom';
import bg from "../assets/Eccom3.png"

const Signup =  () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setCpassword] = useState("");

  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>state.user);

  // console.log(user);

  const handleSignUp = async(e)=>{

    // e.preventDefault();
    try{

      if(password !== cpassword){
        throw new Error("Password & Confirm Password Not Matched");
      }

      if(password.length < 6){
        throw new Error('Password must be at least 6 characters long');
     
      }
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
    
      await setDoc(doc(db,"users",user.uid),{
        name: name,
        email:user.email,
        uid:user.uid
      })
    
      // fetch data from firebase db to  redux store
    
      const userDoc = await getDoc(doc(db,"users",user.uid));
      const updatedUser = {...userDoc.data(),uid:user.uid};
    
      dispatch(setUser(updatedUser));
  
    //   alert("User Created");
    toast.success("Signup SucessFull")
      
      navigate("/login")

    }catch(e){
      console.log(e.message)
    }
    
  }
  
    
  
  return (
//     <div className='flex justify-center items-center w-screen h-screen'>
//   <div className="w-full max-w-xs">
//     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
//           Name
//         </label>
//         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Name" type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
//           Email
//         </label>
//         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//           Password
//         </label>
//         <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
//         {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword" >
//           Confirm Password
//         </label>
//         <input className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="cpassword" type="password" placeholder="Enter Confirm Password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)}/>
//         {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
//       </div>
//       <div className="flex items-center justify-between">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={()=>handleSignIn()}>
//           Sign In
//         </button>
//       </div>

      
//     </form>
//     <p className="text-center text-gray-500 text-xs">
//       Already Have an Account. <NavLink to={"/login"} className='text-blue-700 font-bold '>Login</NavLink>
//     </p>
//   </div>
// </div>

<div className="flex justify-center items-center w-screen h-screen mx-auto">
      <div className="flex flex-col justify-center shadow-md p-2 shadow-slate-300 space-y-2 my-auto mx-auto md:flex-row md:shadow-sm md:shadow-slate-500 rounded-xl md:w-[60%] md:p-4 items-center">
        <div className="w-auto h-auto md:w-[70%] md:h-[300px] md:p-5">
          <img src={bg} className="w-[100%] h-[100%] object-cover md:w-auto md:flex" alt="" />
        </div>
        <div className="w-[50%] h-auto md:w-[100%] bg-white opacity-">
          <form className="bg-transparent rounded px-8 pt-6 pb-8 mb-4 md:mx-auto ">
            <h4 className="text-center text-lg font-bold p-3">Signup</h4>
            {/* {!!error && <p className="login__error">{error}</p>} */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full md:w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none rounded w-full md:w-[70%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter Email"
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
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cpassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none rounded w-full md:w-[70%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="cpassword"
                type="password"
                placeholder="Enter Confirm Password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center space-y-4 md:w-[100%] md:space-y-0 md:flex-row md:items-center md:space-x-4">
              <button
                className="w-[100%] md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="button"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
        
            </div>
          </form>
          <div className="text-center text-gray-500 text-xs">
          <p className="text-center text-gray-500 text-xs">
      Already Have an Account. <NavLink to={"/login"} className='text-blue-700 font-bold '>Login</NavLink>    </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;