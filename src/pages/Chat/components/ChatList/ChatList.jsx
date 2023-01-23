import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import useFetchApi from '../../../../hook/useFetchApi'
import { ChatContext } from '../../context/ChatContextProvider';
import "./ChatList.scss";

export const ChatList = (props) => {
    //Context
    const chatContext= useContext(ChatContext);
    //state
    const [chats, setChats] = useState({
        chats: []
    });


    //custon Hooks
    const [getChats, loading] = useFetchApi({
        url: `/api/chat/list`,
        method: 'GET',
    })

    useEffect(() => {
        getChats()
            .then(data => {
                setChats(data)
            })
    }, [])
    return (
        <div className="chat-list" {...props}>
     

            {/* Users */}
            <div className="users-container">
                {
                    chats.chats.map(chat => {
                        const user = chat.chatUsers.find(u => u._id != chats.myID);
                      
                        return (
                           
                                <div onClick={()=>{
                                    chatContext.setChatID(chat._id);
                                    chatContext.setOpenModal(true)
                                    chatContext.setMessageTo(user.email);

                                }}  className="user" key={chat._id}>
                                    <div className="info">
                                        
                                        <span className='initial'>{user.email[0]}</span>
                                        <span>{user.email}</span>
                                    
                                    </div>
                                    <p>Online</p>
                                </div> 
                        
                        )
                    })
                }
            </div>
        </div>
    )
}
