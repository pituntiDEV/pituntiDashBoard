import React from 'react'
import { useState } from 'react'
import Modal from '../../../../../../components/modal/Modal';

export const ShowErrors = ({ user }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <i onClick={() => setOpenModal(true)} className="m-1 fa-solid fa-triangle-exclamation text-danger"></i>
            {openModal &&
                <Modal title='Error message' setOpenModal={setOpenModal}>
                    <div className="alert  alert-danger">
                        {user?.error.message}
                    </div>
                </Modal>}
        </>
    )
}
