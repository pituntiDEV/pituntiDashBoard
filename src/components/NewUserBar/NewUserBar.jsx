import React, { useEffect, useState } from 'react'
import useFetchApi from '../../hook/useFetchApi';
import Modal from '../modal/Modal';
import { NewUserForm } from '../PlexUsers/NewUserForm/NewUserForm';
import { StepCounter } from '../StepCounter/StepCounter';
import { CreatePlexUser } from './components/CreatePlexUser/CreatePlexUser';
import "./NewUserBar.scss";
export const NewUserBar = ({users,setNewUserState}) => {
  //State
  const [openModal,setOpenModal] = useState(false);
  return (
    <div className="new-user-bar">
    <div className="num-users">
        <p> <i className="fa-solid fa-users"></i> Total</p>
        <span>{users.length}</span> 
        <p>Usuarios</p>
    </div>


     <div className='newUserBtn'>

      
    <CreatePlexUser setNewUserState={setNewUserState}/>
    <div>
        <button className='btn-add' onClick={() => {
            setOpenModal(true);
        }}>
            <i className="fa-solid fa-user-plus"></i>
            Agregar nuevo usuario
        </button>
    </div>
     </div>

    {openModal && 
    <Modal title='New User' setOpenModal={setOpenModal}>
      <NewUserForm setOpenModal={setOpenModal} setNewUserState={setNewUserState}/>
    </Modal>}
</div>
  )
}
