import React, { useState } from 'react'
import { CoinPlusIcon } from '../../../../../../../components/icons/InputWithIcon/CoinPlusIcon'
import Modal from '../../../../../../../components/modal/Modal'
import { AddCreditsForm } from './AddCreditsForm'

export const AddCredits = (props) => {
    const { reseller, resellers, setResellers } = props;
    const [openModal, setOpenModal] = useState(false)
    return (

        <>

            <div onClick={() => setOpenModal(true)} >
                <span className='creditsNum'>{reseller.credits.length}</span><CoinPlusIcon />

            </div>

            {openModal &&
                <Modal title='Agregar creditos' setOpenModal={setOpenModal}>
                    <AddCreditsForm {...props} setOpenModal={setOpenModal} />
                </Modal>
            }
        </>
    )
}
