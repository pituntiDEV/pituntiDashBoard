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
import { useRef } from 'react';
import { useEffect } from 'react';
import { Ellipsis } from '../../../icons/Ellipsis';
import utils from "../../../../utils/date/index"


export const Options = ({ user, setNewUserState, setUsers, users }) => {
    const [openModalToEdit, setOpenModalToEdit] = useState(false);
    const [openModalToAddCredits, setOpenModalToAddCredits] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openModalToChangeServer, setOpenModalToChangeServer] = useState(false)
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [openModalToShowCredits, setOpenModalToShowCredits] = useState(false)
    return (
        <div className='user__options'>

            <div onClick={() => { setOpenModalToEdit(!openModalToEdit) }} className='option'>
                <EditSquareIcon />
            </div>
            <div className='option' onClick={() => setOpenModalToAddCredits(true)}>
                <CoinPlusIcon className="credits" />
            </div>
            <div className='option'>
                <ServerIcon onClick={() => setOpenModalToChangeServer(true)} />
            </div>
            {/* <div className='option'>
                <InfoIcon />
            </div> */}
            {user.auth &&
                <div className="option" onClick={() => setOpenAuthModal(true)}>
                    <i className="fa-solid fa-user-lock"></i>
                </div>}

            <div className='option' onClick={() => setOpenDeleteModal(true)}>
                <TrashIcon />
            </div>

            <div className='option submenu__container' >
                <Ellipsis />
                <div className="submenu">
                    <ul className='submenu_items'>
                        {user.credits &&
                            <li className='submenu_item'>
                                <button onClick={() => setOpenModalToShowCredits(true)} className='btn btn-danger'>credits:{user?.credits?.length}</button>
                                <hr />
                            </li>}

                        <li className='submenu_item'>
                            <hr />
                            <div className="title">
                                Vendedor:

                            </div>
                            <span className='info'>
                                {user.seller.email}
                            </span>
                            <hr />
                        </li>

                        <li className='submenu_item' >
                            Librerias:

                            # {Array.isArray(user.data) ? user?.data?.reduce((acc, data) => {
                                acc += data.numLibraries;
                                return acc;
                            }, 0) :
                                user.data.numLibraries
                            }

                            <hr />
                        </li>
                        <li className='submenu_item'>
                            Servers:
                            # {user?.data?.length || 0}
                            <hr />
                        </li>

                        {user.comments && <li className='submenu_item'>
                            Comentarios:
                            <span>
                                {user.comments}
                            </span>
                            <hr />
                        </li>}

                    </ul>
                </div>
            </div>





            {/* MODALS */}
            {openModalToEdit &&
                <Modal title="Editar usuario PLEX" setOpenModal={setOpenModalToEdit}>
                    <EditPlexUser users={users} setUsers={setUsers} user={user} setOpenModal={setOpenModalToEdit} />
                </Modal>
            }

            {openModalToShowCredits &&
                <Modal title="Creditos" setOpenModal={setOpenModalToShowCredits}>
                    <h3 className='fw-bold'>Expire en {utils.formatDate(user.expireAt)} </h3>
                    {
                        user?.credits.map((credit) => {
                            return (
                                <div >
                                    <div className="connections">
                                        <p>Conecciones:{credit.conexion}</p>
                                        <p>Usado en :{utils.formatDate(credit.updatedAt)}</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })

                    }
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
                    <ChangeServerForm user={user} users={users} setUsers={setUsers} setOpenModal={setOpenModalToChangeServer} />
                </Modal>
            }


        </div>
    )
}
