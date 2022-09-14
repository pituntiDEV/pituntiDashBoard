import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
const NewUserContext = React.createContext();
export const NewUserContextProvider = ({children}) => {

  const initialState ={
      name:"",
      email:"",
      details:"",
      role:"admin",
      package:"",
      provider:"",
      conexion:"",
      creditos:0,
      step:1,
      byMonth:false,
      byDate:false,
      months:"",
      date:"",
  };
  
  const [state,setState]=useState(initialState)


  const value={
    state,
    setState,
    setStep:(step)=>{
      setState({...state,step})
    },
    reset:()=>{
        setState(initialState);
    },
    setRole:(role)=>{
        setState({...state,role})
    },
    setPackage:(pack)=>{
        setState({...state,package:pack})
    }
  }

  useEffect(()=>{
    setState({
      ...state,
      package:"",
      conexion:state.role=="admin" ?1:0
    
    })
  },[state.role])
  return (
    <NewUserContext.Provider value={value}>
        {children}
    </NewUserContext.Provider>
  )
}

export default NewUserContext;
