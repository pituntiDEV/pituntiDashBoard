import React, { useState } from 'react'
import Modal from '../../../../components/modal/Modal';

export const ShowPassword = ({ user }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <i className="fa-solid fa-user-lock" onClick={() => setOpenModal(true)}></i>
            {openModal &&
                <Modal title='password' setOpenModal={setOpenModal}>

                    {user?.password}
                </Modal>}
        </>
    )
}
