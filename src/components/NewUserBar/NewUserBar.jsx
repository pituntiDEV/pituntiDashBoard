import React, { useEffect, useState } from 'react'
import useFetchApi from '../../hook/useFetchApi';
import Modal from '../modal/Modal';
import { StepCounter } from '../StepCounter/StepCounter';
import { CreatePlexUser } from './components/CreatePlexUser/CreatePlexUser';
import { NewUserForm } from '../PlexUsers/NewUserForm/NewUserForm';
import "./NewUserBar.scss";
import { NewUserFormV2 } from '../../pages/users/NewUser/v2/NewUserFormV2';
import { useContext } from 'react';
import { Context } from '../../pages/users/PlexUsersContext';
import { appContext } from '../../context/AppContext';
export const NewUserBar = ({ }) => {
  const { users } = useContext(Context);
  const { lang } = useContext(appContext);


  //State
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="new-user-bar">
      <div className="num-users">
        <p> <i className="fa-solid fa-users"></i> Total</p>
        <span>{users.length}</span>
        <p>{lang.pages.users.title}</p>
      </div>


      <div className='newUserBtn'>


        <CreatePlexUser lang={lang} />
        <div>
          <button className='btn-add' onClick={() => {
            setOpenModal(true);
          }}>
            <i className="fa-solid fa-user-plus"></i>
            {lang.pages.users.buttons.btnAddUser}
          </button>
        </div>
      </div>

      {openModal &&
        <Modal title='Invitar usuario' setOpenModal={setOpenModal}>
          {/* <NewUserForm setOpenModal={setOpenModal} setNewUserState={setNewUserState} /> */}
          <NewUserFormV2 setOpenModal={setOpenModal} />
        </Modal>}
    </div>
  )
}
