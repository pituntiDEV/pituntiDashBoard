import React, { useState } from 'react'
import Modal from '../../../modal/Modal';
import { CreatePlexUserForm } from './components/CreatePlexUserForm';

export const CreatePlexUser = ({setNewUserState}) => {
    const [openModal,setOpenModal] = useState(false)
  return (
    <>
    <div>
        <button className='btn-add' onClick={() => {
            setOpenModal(true);
        }}>
            <i className="fa-solid fa-file-circle-plus"></i>
            Crear nuevo usuario
        </button>
    </div>
    {openModal &&
        <Modal setOpenModal={setOpenModal} title='Crear un nuevo usuario en plex'>
          <CreatePlexUserForm setNewUserState={setNewUserState} setOpenModal={setOpenModal}/>
        </Modal>
    }
    </>
  )
}
