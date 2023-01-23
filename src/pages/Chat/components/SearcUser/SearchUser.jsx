import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { SearchIcon } from '../../../../components/icons/SearchIcon';
import useFetchApi from '../../../../hook/useFetchApi';
import { ChatContext } from '../../context/ChatContextProvider';
import "./SearchUser.scss";

export const SearchUser = () => {
  //Context
  const chatContext = useContext(ChatContext);
  //State
  const [email, setEmail] = useState("");
  const [users,setUsers] = useState([]);

  //Custon Hooks
  const [searchUser, LoadingSearchUser] = useFetchApi({
    url: `/api/chat/users/search`,
    method: "POST"
  });

  //useEffects
  useEffect(() => {
    searchUser({ body: JSON.stringify({ email }) })
      .then(data => {
        setUsers(data)
      })
  }, [email]);

  const [createChatRequest,loadingCreateChatRequest] = useFetchApi({
    url:`/api/chat/create`,
    method: "POST"
})

  //Functions
  const createChat =(user)=>{

    createChatRequest({body: JSON.stringify({user:user._id})})
    .then(data=>{
        const chatId = data._id
        chatContext.setChatID(chatId)
        // window.location.href=`/chat/${chatId}`
    })
}
  //Html
  return (
    <div>
       <div className="search-user">
                        <input type="text" onChange={(e) => {
                            setEmail(e.target.value);

                        }} />
                        <div className="icon">
                            <SearchIcon onClick={() => {
                                searchUser({ body: JSON.stringify({ email }) })
                                    .then(data => {
                                        setUsers(data)
                                    })
                            }} />
                        </div>
                    </div>

                    <div className="results">
                        {
                            users.map(user => {
                                return (
                                    <div onClick={()=>createChat(user)} key={user._id} className='user'>
                                        {user.email}
                                    </div>
                                )
                            })
                        }
                    </div>
    </div>
  )
}
