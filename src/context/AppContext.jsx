import React from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';

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
    
  });
  
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


