import React from 'react'
import { useState } from 'react'
import Modal from '../../../../../../components/modal/Modal';
import { CreateEmbyUserForm } from './CreateEmbyUserForm';

export const CreateEmbyUser = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <button onClick={() => setOpenModal(true)} className='btn btn-info'>Crear Usuario</button>
            {
                openModal &&

                <Modal setOpenModal={setOpenModal} title="Crear usuario emby">
                    <CreateEmbyUserForm setOpenModal={setOpenModal} />
                </Modal>
            }

        </>
    )
}
