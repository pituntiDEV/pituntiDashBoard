import React, { useContext, useState, memo, useRef } from 'react'
import { useEffect } from 'react';
import "./Messages.scss";
import { ChatContext } from '../../context/ChatContextProvider';
import useFetchApi from '../../../../hook/useFetchApi';
export const Messages = memo(({ socket }) => {
    //Context
    const chatContext = useContext(ChatContext);
   

    //State
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [oldMessages,setOldMessages] = useState([]);

    //Ref
    const messagesRef = useRef("")

    //Custon hooks
    //Custom Hooks
    const [getMessages, loading] = useFetchApi({
        url: `/api/chat/messages/${chatContext.chatID}`,
        method: 'GET',
    });

    // EFFECTS
    // Obtener los mensages anteriores
    useEffect(()=>{
        getMessages().then(data=>{
           setOldMessages(data);
        })
    },[])

    //When recive a new message
    useEffect(() => {
        socket.on("privateMessage", (data) => {
            // setMessages([...messages,data.message])

            const validate = chatContext.messageTo == data.from;

            validate && setMessages([...messages, {
                message: data.message,
                me: false,
                from: data.from
            }])
        })

    }, [messages])

    // Bajer el escrollBar automaticamente cuando haya un nuevo mensage
    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

    }, [messages,oldMessages])


    // Functions 

    //Send Message
    const sendMessage = (e) => {
        e.preventDefault();

        setMessages([...messages, {
            me: true,
            message,
        }])
        setMessage("")
        socket.emit("privateMessage", {
            to: chatContext.messageTo,
            message,
            chat: chatContext.chatID
        })
    }
    return (
        <div className='chat-messages'>Messages
            <div className="messages" ref={messagesRef}>
                {
                    oldMessages.map((msg,i)=>{
                        const isMe = chatContext.messageTo != msg.from;
                        return (<div key={i} className={`message ${isMe && "me"}`}>
                            <div className="text">
                                <p className='from'>{isMe ? "Yo":msg.from}</p>
                                <hr />
                                {msg.message}
                            </div>
                        </div>)
                    
                    })
                }
                {
                    messages.map((msg, i) => {
                        return (<div key={i} className={`message ${msg.me && "me"}`}>
                            <div className="text">
                                <p className='from'>{msg.from ? msg.from : "Yo"}</p>
                                <hr />
                                {msg.message}
                            </div>
                        </div>)
                    })
                }

                
            </div>
            <form onSubmit={sendMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} name="" id="" />
                <button>Enviar</button>

            </form>
        </div>
    )
})
