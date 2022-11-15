import React from 'react'
import { useState } from 'react';
import { useUserFilter } from '../../../../hook/useUserFilter';
import { BookIcon } from '../../../icons/BookIcon';
import { CoinsIcon } from '../../../icons/CoinsIcon';
import { EditSquareIcon } from '../../../icons/EditSquareIcon';
import { InfoIcon } from '../../../icons/InfoIcon';
import { CoinPlusIcon } from '../../../icons/InputWithIcon/CoinPlusIcon';
import { RepeatIcon } from '../../../icons/RepeatIcon';
import { TrashIcon } from '../../../icons/TrashIcon';
import Modal from '../../../modal/Modal';
import { AddCreditToUser } from '../../AddCreditToUser/AddCreditToUser';
import { DeleteUserForm } from '../../DeleteUserForm/DeleteUserForm';
import { EditUser } from '../../EditUser/EditUser';
import "./Options.scss";


export const Options = ({ user,setNewUserState }) => {
   
    const [openModalToEdit, setOpenModalToEdit] = useState(false);
    const [openModalToAddCredits, setOpenModalToAddCredits] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    return (
        <div className='user__options'>

            <div onClick={() => { setOpenModalToEdit(!openModalToEdit) }} className='option'>
                <EditSquareIcon />
            </div>
            <div className='option' onClick={() => setOpenModalToAddCredits(true)}>
                <CoinPlusIcon className="credits" />
            </div>
            <div className='option'>
                <RepeatIcon />
            </div>
            <div className='option'>
                <InfoIcon />
            </div>
            <div className='option'>
                <div className='libs'>
                        <span>{user.packages.length ==0 ?0:user.data[0]?.numLibraries|| user.data?.numLibraries}</span>
                    <BookIcon />
                </div>
            </div>
            <div className='option' onClick={() => setOpenDeleteModal(true)}>
                <TrashIcon />
            </div>



            {/* MODALS */}
            {openModalToEdit &&
                <Modal title="Edit User" setOpenModal={setOpenModalToEdit}>
                    <EditUser setNewUserState={setNewUserState} user={user} setOpenModal={setOpenModalToEdit} />
                </Modal>
            }

            {openModalToAddCredits &&
                <Modal title="Edit User" setOpenModal={setOpenModalToAddCredits}>
                    <AddCreditToUser setNewUserState={setNewUserState} user={user} setOpenModal={setOpenModalToAddCredits} />
                </Modal>
            }

            {openDeleteModal &&
                <Modal title="Delete User" setOpenModal={setOpenDeleteModal}>
                    <DeleteUserForm setNewUserState={setNewUserState} user={user} setOpenModal={setOpenDeleteModal} />
                </Modal>
            }


        </div>
    )
}
