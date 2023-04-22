import React, { useState } from 'react'
import { TrashIcon } from '../../../icons/TrashIcon';
import Modal from '../../../modal/Modal';
import { RemoveReseller } from './RemoveReseller';
import { CoinPlusIcon } from '../../../icons/InputWithIcon/CoinPlusIcon';
import { AddCoins } from './AddCoins';

export const OptionsNotAdmin = ({ user }) => {

    const [openModalToAddCoins, setOpenModalToAddCoins] = useState(false);
    const [openModalToRemove, setOpenModalToRemove] = useState(false);

    return (
        <>
            <span onClick={() => setOpenModalToAddCoins(true)}>
                <CoinPlusIcon />
            </span>

            <span className='text-danger' onClick={() => setOpenModalToRemove(true)}>
                <TrashIcon />
            </span>


            {/* Modals */}
            {openModalToAddCoins &&
                <Modal title='Eliminar reseller' setOpenModal={setOpenModalToAddCoins}>
                    <AddCoins setOpenModal={setOpenModalToAddCoins} user={user} />
                </Modal>
            }

            {openModalToRemove &&
                <Modal title='Eliminar reseller' setOpenModal={setOpenModalToRemove}>
                    <RemoveReseller />
                </Modal>
            }
        </>
    )
}
