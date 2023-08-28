import React, { useState } from 'react'
import Modal from '../../../modal/Modal';
import { CreatePlexUserForm } from './components/CreatePlexUserForm';

export const CreatePlexUser = ({ lang }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div>
        <button className='btn-add' onClick={() => {
          setOpenModal(true);
        }}>
          <i className="fa-solid fa-file-circle-plus"></i>
          {lang.pages.users.buttons.btnCreateUser}
        </button>
      </div>
      {openModal &&
        <Modal setOpenModal={setOpenModal} title='Crear un nuevo usuario en plex'>
          <CreatePlexUserForm setOpenModal={setOpenModal} />
        </Modal>
      }
    </>
  )
}
