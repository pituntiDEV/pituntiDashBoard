import React, { useState } from 'react'
import { TrashIcon } from '../../../components/icons/TrashIcon'
import Modal from '../../../components/modal/Modal'
import { DeleteReseller } from '../../../components/Resellers/ResellerList/EditResellerForm/DeleteReseller/DeleteReseller'

export const DeletePlexReseller = ({ setResellersState, reseller }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <TrashIcon onClick={() => setOpenModal(true)} />

            {
                openModal &&

                <Modal setOpenModal={setOpenModal} title="Delete">
                    <DeleteReseller setResellersState={setResellersState} setOpenModal={setOpenModal} reseller={reseller} />
                </Modal>
            }

        </>
    )
}
