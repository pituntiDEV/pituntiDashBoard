import React, { useEffect, useState } from 'react'
import { CoinPlusIcon } from '../../../components/icons/InputWithIcon/CoinPlusIcon'
import Modal from '../../../components/modal/Modal'
import useFetchApi from '../../../hook/useFetchApi';
import { ReduceCreditsForm } from './ReduceCreditsForm';

export const ReduceCredits = ({ creditAvailable, setResellersState, reseller }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <CoinPlusIcon onClick={() => setOpenModal(true)} simbol="-" className="text-danger" />

            {openModal &&
                <Modal setOpenModal={setOpenModal} title='Quitar créditos'>
                    <ReduceCreditsForm setResellersState={setResellersState} reseller={reseller} setOpenModal={setOpenModal} />
                </Modal>}

        </>
    )
}
