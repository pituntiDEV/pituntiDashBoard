import React from 'react'
import { useState } from 'react';
import { useUserFilter } from '../../../../hook/useUserFilter';
import { BookIcon } from '../../../icons/BookIcon';
import { CoinsIcon } from '../../../icons/CoinsIcon';
import { EditSquareIcon } from '../../../icons/EditSquareIcon';
import { InfoIcon } from '../../../icons/InfoIcon';
import { CoinPlusIcon } from '../../../icons/InputWithIcon/CoinPlusIcon';
import { RepeatIcon } from '../../../icons/RepeatIcon';
import { ServerIcon } from '../../../icons/ServerIcon';
import { TrashIcon } from '../../../icons/TrashIcon';
import Modal from '../../../modal/Modal';
import { AddCreditToUser } from '../../AddCreditToUser/AddCreditToUser';
import { AuthData } from '../../AuthData';
import { ChangeServerForm } from '../../ChangeServer/ChangeServerForm';
import { DeleteUserForm } from '../../DeleteUserForm/DeleteUserForm';
import { EditPlexUser } from '../../EditUser/EditPlexUser';
import { EditUser } from '../../EditUser/EditUser';
import "./Options.scss";


export const Options = ({ user, setNewUserState, setUsers, users }) => {

    const [openModalToEdit, setOpenModalToEdit] = useState(false);
    const [openModalToAddCredits, setOpenModalToAddCredits] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openModalToChangeServer, setOpenModalToChangeServer] = useState(false)
    const [openAuthModal, setOpenAuthModal] = useState(false);
    return (
        <div className='user__options'>

            <div onClick={() => { setOpenModalToEdit(!openModalToEdit) }} className='option'>
                <EditSquareIcon />
            </div>
            <div className='option' onClick={() => setOpenModalToAddCredits(true)}>
                <CoinPlusIcon className="credits" />
            </div>
            <div className='option'>
                <ServerIcon onClick={()=>setOpenModalToChangeServer(true)}/>
            </div>
            {/* <div className='option'>
                <InfoIcon />
            </div> */}
            {user.auth &&
                <div className="option" onClick={() => setOpenAuthModal(true)}>
                    <i className="fa-solid fa-user-lock"></i>
                </div>}
            <div className='option'>
                <div className='libs'>
                    <span>{user.packages.length == 0 ? 0 : user.data[0]?.numLibraries || user.data?.numLibraries}</span>
                    <BookIcon />
                </div>
            </div>
            <div className='option' onClick={() => setOpenDeleteModal(true)}>
                <TrashIcon />
            </div>



            {/* MODALS */}
            {openModalToEdit &&
                <Modal title="Editar usuario PLEX" setOpenModal={setOpenModalToEdit}>
                    <EditPlexUser users={users} setUsers={setUsers} user={user} setOpenModal={setOpenModalToEdit} />
                </Modal>
            }

            {openModalToAddCredits &&
                <Modal title="Edit User" setOpenModal={setOpenModalToAddCredits}>
                    <AddCreditToUser setNewUserState={setNewUserState} user={user} setOpenModal={setOpenModalToAddCredits} />
                </Modal>
            }

            {openDeleteModal &&
                <Modal title="Delete User" setOpenModal={setOpenDeleteModal}>
                    <DeleteUserForm users={users} setUsers={setUsers} setNewUserState={setNewUserState} user={user} setOpenModal={setOpenDeleteModal} />
                </Modal>
            }

            {openAuthModal &&
                <Modal title="Auth" setOpenModal={setOpenAuthModal}>
                    <AuthData user={user} setOpenModal={setOpenAuthModal} />
                </Modal>
            }

            {openModalToChangeServer &&
                <Modal title="Cambiar Server" setUsers={setUsers} setOpenModal={setOpenModalToChangeServer}>
                    <ChangeServerForm user={user}  users={users} setUsers={setUsers} setOpenModal={setOpenModalToChangeServer} />
                </Modal>
            }


        </div>
    )
}
