import React from 'react'
import { useState } from 'react';
import Modal from '../../../../components/modal/Modal';
import { CreateDemoAccountForm } from './CreateDemoAccountForm';

export const CreateDemoAccount = ({setDemoState}) => {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
         <button onClick={() => setOpenModal(true)}>Create Demo account</button>
         {openModal && <Modal setOpenModal={setOpenModal} title='Crear cuenta demo'>
            <CreateDemoAccountForm setDemoState={setDemoState} setOpenModal={setOpenModal} openModal={openModal}/>
        </Modal>}
    </div>
  )
}
