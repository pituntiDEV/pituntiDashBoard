import React, { useState } from 'react'
import Modal from '../../../../components/modal/Modal';
import { NewEmbyUserForm } from './NewEmbyUserForm';

export const NewEmbyUser = ({ setUpdateUserState }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="buttons__new__user">
        <button onClick={() => setOpenModal(true)} className='btn btn-primary'>Nuevo usuario EmbyConnect</button>
      </div>
      {openModal &&
        <Modal title="New user" setOpenModal={setOpenModal}>
          <NewEmbyUserForm setUpdateUserState={setUpdateUserState} setOpenModal={setOpenModal} />
        </Modal>}
    </>
  )
}
