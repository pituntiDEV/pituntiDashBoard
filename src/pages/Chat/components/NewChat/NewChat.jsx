import React, { useState } from 'react'
import Modal from '../../../../components/modal/Modal';
import { SearchUser } from '../SearcUser/SearchUser';
import "./NewChat.scss";
export const NewChat = ({email}) => {
    const [openModal,setOpenModal] = useState(false);
  return (
    <div className='newChat'>
      <h2>{email}</h2>
        <button onClick={()=>setOpenModal(true)}>NewChat</button>
        {openModal && <Modal title="New Chat" setOpenModal={setOpenModal}>
            <SearchUser/>
        </Modal>}
    </div>
  )
}
