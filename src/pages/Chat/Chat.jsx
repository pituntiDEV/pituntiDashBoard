import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import Modal from '../../components/modal/Modal'
import { ChatList } from './components/ChatList/ChatList'
import { Messages } from './components/Messages/Messages'

import { io } from 'socket.io-client';

import { NewChat } from './components/NewChat/NewChat'
import { ChatContext } from './context/ChatContextProvider'
import config from '../../config'
import { appContext } from '../../context/AppContext'


export const Chat = () => {
  //Context
  const AppContext = useContext(appContext);
  
  //State
  const [socket,setSocket] = useState(null);
  const chatContext = useContext(ChatContext);
  const reset = ()=>{
    chatContext.setChatID("")
  }

  useEffect(()=>{
    const socketConn = io(config.socketUrl,{
      query: {
          _id: localStorage.getItem("_id") || "",
         
            token: localStorage.getItem("access-token")
          
      }
    });

    setSocket(socketConn)
  
    return ()=>{
      socketConn.disconnect()
    }
  },[])


  return (
    <div>
      <NewChat email={AppContext?.state?.account_data?.email} />
      <ChatList />
      {chatContext.openModal &&
       <Modal reset={reset} title='Chat Messages' setOpenModal={chatContext.setOpenModal}>
        <Messages socket={socket} />
      </Modal>}
    </div>
  )
}
