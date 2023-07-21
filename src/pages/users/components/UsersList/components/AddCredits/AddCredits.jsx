import React from 'react'
import { useState } from 'react'
import Modal from '../../../../../../components/modal/Modal'
import { AddCreditsForm } from './AddCreditsForm'
import { CoinPlusIcon } from '../../../../../../components/icons/InputWithIcon/CoinPlusIcon'

export const AddCredits = ({ user }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <CoinPlusIcon onClick={() => setOpenModal(true)} />
            {openModal &&
                <Modal title="Agregar creditos" setOpenModal={setOpenModal}>
                    <AddCreditsForm setOpenModal={setOpenModal} user={user} />
                </Modal>}
        </>
    )
}
