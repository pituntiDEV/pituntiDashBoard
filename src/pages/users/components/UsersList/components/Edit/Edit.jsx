import React from 'react'
import { useState } from 'react'
import Modal from '../../../../../../components/modal/Modal'
import { EditForm } from './EditForm'

export const Edit = ({ user }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <i onClick={() => setOpenModal(true)} className="fa-solid fa-pen-to-square"></i>
            {openModal &&
                <Modal title="Editar usuario" setOpenModal={setOpenModal}>
                    <EditForm user={user} />
                </Modal>}

        </>
    )
}
