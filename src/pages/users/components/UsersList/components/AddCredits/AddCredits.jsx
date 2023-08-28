import React from 'react'
import { useState } from 'react'
import Modal from '../../../../../../components/modal/Modal'
import { AddCreditsForm } from './AddCreditsForm'
import { CoinPlusIcon } from '../../../../../../components/icons/InputWithIcon/CoinPlusIcon'

export const AddCredits = ({ user, langPage }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <CoinPlusIcon onClick={() => setOpenModal(true)} />
            {openModal &&
                <Modal title={langPage.addCredits} setOpenModal={setOpenModal}>
                    <AddCreditsForm langPage={langPage} setOpenModal={setOpenModal} user={user} />
                </Modal>}
        </>
    )
}
