import React, { useState } from 'react'
import { EditSquareIcon } from '../../../../../../../components/icons/EditSquareIcon'
import Modal from '../../../../../../../components/modal/Modal';
import { EditReselerForm } from './EditReselerForm';

export const EditReseller = ({ reseller, resellers, setResellers }) => {

    const [openModal, setOpenModal] = useState(false);


    return (
        <div>
            <EditSquareIcon onClick={() => setOpenModal(true)} />

            {openModal &&
                <Modal title="Editar Reseller" setOpenModal={setOpenModal}>
                    <EditReselerForm setOpenModal={setOpenModal} resellers={resellers} setResellers={setResellers} reseller={reseller} />
                </Modal>}
        </div>
    )
}
