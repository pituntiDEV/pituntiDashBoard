import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { PlusIcon } from '../../../components/icons/PlusIcon'
import { SearchIcon } from '../../../components/icons/SearchIcon';
import Modal from '../../../components/modal/Modal';
import useFetchApi from '../../../hook/useFetchApi';
import { ChatContext } from '../context/ChatContextProvider';
import "./NewChatButton.scss";
export const NewChatButton = () => {
    //Context
    const chatContext = useContext(ChatContext)
    //States
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    //Customs Hooks
    const [searchUser, LoadingSearchUser] = useFetchApi({
        url: `/api/chat/users/search`,
        method: "POST"
    });

    const [createChatRequest,loadingCreateChatRequest] = useFetchApi({
        url:`/api/chat/create`,
        method: "POST"
    })

    //useEffects
    useEffect(() => {
        searchUser({ body: JSON.stringify({ email }) })
            .then(data => {
                setUsers(data)
            })
    }, [email]);
    const createChat =(user)=>{

       
        createChatRequest({body: JSON.stringify({user:user._id})})
        .then(data=>{
            const chatId = data._id
            chatContext.setChatID(chatId)
            // window.location.href=`/chat/${chatId}`
            setOpenModal(false)
            
        })
    }

    return (
        <div className='NewChatButton' >
            <PlusIcon onClick={() => setOpenModal(true)} />

            {
                openModal &&
                <Modal title="new Chat" setOpenModal={setOpenModal}>
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
                </Modal>

            }
        </div>
    )
}
