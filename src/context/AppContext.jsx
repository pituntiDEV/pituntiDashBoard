import React from 'react';
import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import useFetchApi from '../hook/useFetchApi';

export const appContext = React.createContext();
const socket =  io("192.168.1.38:1992", {
  query: {
      _id: localStorage.getItem("_id") || ""
  }
});


export const AppContext = ({ children }) => {
  //State
  const [state, setState] = useState({
    openModal: false,
    openEditModal: false,
    users:[],
    packages:[],
    account_data:{},
    onChangeCredits:null,
    
  });
  //Custom Hooks
  const [getMyInfo,loadingGetMyInfo] = useFetchApi({
    url:"/api/auth/my-info",
    method:"GET",
  })
  
  //Effects
  useEffect(()=>{
     getMyInfo().then(data=>{
      localStorage.setItem("_id",data._id)
      setState({...state,account_data:data})
     });
  },[])
  
  const value={
    state,
    setState,
    socket,
    setOpenModal: () => {
      setState(state=>({...state,openModal:!state.openModal}));
    },
    setOpenEditModal: () => {
      setState(state=>({...state,openEditModal:!state.openEditModal}));
    },
  }


  return (
    <appContext.Provider value={value}>
      {
        children
      }
    </appContext.Provider>
  )
}


