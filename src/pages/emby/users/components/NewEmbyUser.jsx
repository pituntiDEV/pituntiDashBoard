import React, { useState } from 'react'
import Modal from '../../../../components/modal/Modal';
import { NewEmbyUserForm } from './NewEmbyUserForm';

export const NewEmbyUser = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="buttons__new__user d-flex gap-3">
        <button onClick={() => setOpenModal(true)} className='btn btn-info'>Crear usuario</button>
        <button onClick={() => setOpenModal(true)} className='btn btn-info'>Agregar usuario EmbyConnect</button>
      </div>
      {openModal &&
        <Modal title="New user" setOpenModal={setOpenModal}>
          <NewEmbyUserForm setOpenModal={setOpenModal} />
        </Modal>}
    </>
  )
}
