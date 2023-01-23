import React from 'react'
import { useState } from 'react';

export const ChatContext = React.createContext("");
export const ChatContextProvider = ({children}) => {
    const [openModal,setOpenModal] = useState(false);
    const [chatID,setChatID] = useState("");
    const [messageTo,setMessageTo] = useState(null);

    const contextValue = {
      openModal,
      setOpenModal,
      chatID,
      setChatID,
      messageTo,
      setMessageTo
    }
  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  )
}
