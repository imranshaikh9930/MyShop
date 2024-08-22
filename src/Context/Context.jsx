import React ,{createContext, useState}from 'react';


export const StateContext = createContext();

const MyProvider = ({children}) => {
    const [address,setAddress] = useState("");
  return (
   <StateContext.Provider value={{address,setAddress}}>
    {children}
   </StateContext.Provider>
  )
}



export default MyProvider;