
import React, { useRef, useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import { appContext } from '../../../../context/AppContext';
import useFetchApi from '../../../../hook/useFetchApi';
import "./Messages.scss";
export const Messages = ({ chatID }) => {
    //Context
    const { socket } = useContext(appContext);

    //State
    const [chatData, setChatData] = useState(null);
    const [message, setMessage] = useState("");
    const [otherUsers, setOtherUsers] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [messages,setMessages] = useState([]);
    //Refs
    const msg = useRef("");

    //Custom Hooks
    const [getMessages, loading] = useFetchApi({
        url: `/api/chat/messages/${chatID}`,
        method: 'GET',
    });
    const [sendMessageRequest, loadingSendMessageRequest] = useFetchApi({
        url: `/api/chat/messages/${chatID}`
    })

    // Effects

    //Obtener los mensajes cusndo cambie el chtID
    useEffect(() => {
        getMessages()
            .then(data => {
                setMessages(data?.chat?.messages)
                setOtherUsers(otherUsers)
            })
    }, [chatID])

    // Bajer el escrollBar automaticamente cuando haya un nuevo mensage
    useEffect(() => {
        msg.current.scrollTop = msg.current.scrollHeight;
    
    }, [messages,newMessages])
    

    // Escuchar los eventos del socket
    useEffect(()=>{
      

        socket.on("message",chat=>{
          
          console.log(chat);
        })
    
        return () => {
            socket.off('connect');
            socket.off('message');
            socket.off('disconnect');
            socket.off('pong');
          };
      },[socket,chatID]);

    //Functions

    // SEND MESSAGE
    const sendMessage = (e) => {
        e.preventDefault();
        const newMessage = { message, user:{email:"yo:"} }
        setMessages([...messages, newMessage])
        sendMessageRequest({ body: JSON.stringify({ message, chatID,to: otherUsers.join("")}) })
            .then(data => {
                socket.emit("message", {
                    to: otherUsers.join(""),
                    message
                })
                setMessage("")
            })
    }

    return (
        <div className="chat-messages">

            <div className="user">
                <div className="info">
                    <span>🦇</span>
                    <span>{otherUsers.join(",")}</span>
                    <p>hace 7 min</p>
                </div>
            </div>


            <div className="messages" ref={msg}>
                {
                    messages.map(message => {
                        const isMe = message.isme  || false;

                        return (
                            <div key={message._id} className={`message ${isMe && "me"}`}>
                                <span className='initial'>{message.user.email[0]} </span>
                                <div className="message-container">
                                    <small>{message.user.email}</small>
                                    <p>{message.message} </p>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    // newMessages.map((mensaje) => {
                       
                    //     return (
                    //         <div key={`${mensaje.message + Date.now()}`} className="message">
                    //             {mensaje.message}
                    //         </div>
                    //     )
                    // })
                }

            </div>

            <form onSubmit={sendMessage}>
                <div className="send-message">
                    <input required type="text" name="" id="" onChange={(e) => {
                        setMessage(e.target.value);
                    }} value={message} />
                    <button >Send</button>
                </div>
            </form>
        </div>
    )
}
