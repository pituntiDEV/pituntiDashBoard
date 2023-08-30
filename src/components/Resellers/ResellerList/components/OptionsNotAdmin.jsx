import React, { useState } from 'react'
import { TrashIcon } from '../../../icons/TrashIcon';
import Modal from '../../../modal/Modal';
import { RemoveReseller } from './RemoveReseller';
import { CoinPlusIcon } from '../../../icons/InputWithIcon/CoinPlusIcon';
import { AddCoins } from './AddCoins';
import "./OptionsNotAdmin.scss";


export const OptionsNotAdmin = ({ user, setNewResellerState, creditAvailable }) => {

    const [openModalToAddCoins, setOpenModalToAddCoins] = useState(false);
    const [openModalToRemove, setOpenModalToRemove] = useState(false);

    return (
        <div className='OptionsNotAdmin'>

            <span className='sub_credits credits' onClick={() => setOpenModalToAddCoins(true)}>
                <span className='total_credits'>{creditAvailable}</span>

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
                    <RemoveReseller setNewResellerState={setNewResellerState} setOpenModal={setOpenModalToRemove} user={user} />
                </Modal>
            }
        </div>
    )
}
