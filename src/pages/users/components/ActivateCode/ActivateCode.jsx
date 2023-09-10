import React from 'react'
import { useState } from 'react'
import Modal from '../../../../components/modal/Modal'
import { ActivateCodeForm } from './ActivateCodeForm';

export const ActivateCode = ({ user, demo }) => {

    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <span onClick={() => setOpenModal(true)}>📺</span>
            {openModal &&
                <Modal setOpenModal={setOpenModal} title="Active by CODE">
                    <ActivateCodeForm demo={demo} setOpenModal={setOpenModal} user={user} />
                </Modal>}
        </>
    )
}
