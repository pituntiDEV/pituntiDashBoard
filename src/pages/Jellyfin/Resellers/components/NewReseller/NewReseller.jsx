import React, { useState } from 'react'
import { UserTieIcon } from '../../../../../components/icons/UserTieIcon'
import Modal from '../../../../../components/modal/Modal';
import { NewResellerForm } from './NewResellerForm';

export const NewReseller = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <button onClick={() => setOpenModal(true)} className='btn btn-secondary'><UserTieIcon /> Agregar reseller</button>
            {openModal &&
                <Modal title="Crear nuevo reseller" setOpenModal={setOpenModal}>
                    <NewResellerForm setOpenModal={setOpenModal} />
                </Modal>}
        </>
    )
}
