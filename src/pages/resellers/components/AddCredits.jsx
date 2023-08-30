import React, { useState } from 'react'
import { CoinPlusIcon } from '../../../components/icons/InputWithIcon/CoinPlusIcon'
import Modal from '../../../components/modal/Modal';
import { CreditsEdit } from '../../../components/Resellers/ResellerList/EditResellerForm/CreditsEdit/CreditsEdit';

export const AddCredits = ({ creditAvailable, setResellersState, reseller }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div className="credits" onClick={() => setOpenModal(true)}>

                <span className='total_credits'>{creditAvailable?.length}</span>
                <CoinPlusIcon />

            </div>


            {
                openModal &&

                <Modal title='Add credits' setOpenModal={setOpenModal}>
                    <CreditsEdit setResellersState={setResellersState} setOpenModal={setOpenModal} reseller={reseller} />
                </Modal>
            }


        </>
    )
}
