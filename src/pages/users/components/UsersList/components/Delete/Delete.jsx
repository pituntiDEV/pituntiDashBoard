import React from 'react'
import Modal from '../../../../../../components/modal/Modal'
import { DeleteForm } from './DeleteForm'
import { useState } from 'react'

export const Delete = ({ user, langPage }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <i onClick={() => setOpenModal(true)} className="fa-solid fa-trash-can"></i>
            {openModal &&
                <Modal title={langPage.deleteUser} setOpenModal={setOpenModal}>
                    <DeleteForm langPage={langPage} setOpenModal={setOpenModal} user={user} />
                </Modal>}
        </>
    )
}
