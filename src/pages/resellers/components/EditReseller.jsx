import React, { useState } from 'react'
import Modal from '../../../components/modal/Modal';
import { EditResellerForm } from '../../../components/Resellers/ResellerList/EditResellerForm/EditResellerForm';

export const EditReseller = ({ setResellersState, reseller }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <i onClick={() => setOpenModal(true)} className="fa-solid fa-user-gear"></i>

            {
                openModal &&
                <Modal title={`Edit ${reseller.reseller.name}`} setOpenModal={setOpenModal}>
                    <EditResellerForm setResellersState={setResellersState} setOpenModal={setOpenModal} reseller={reseller} />
                </Modal>
            }

        </>
    )
}
