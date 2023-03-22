import React, { useState } from 'react'
import Modal from '../../../../components/modal/Modal';
import { Migrate, MigrateDevices } from '../Migrate/MigrateDevices';
import { ActivateForm } from './ActivateForm/ActivateForm';
import "./Shared.scss";
import { ShareForm } from './ShareForm/ShareForm';
export const Shared = ({setDevicesState}) => {
  const [openModal,setOpenModal] = useState(false);
  const [openModalToShare,setOpenModalToShare] = useState(false)
  return (
    <div className='shared__by__code'>
       <MigrateDevices />
        <button onClick={()=>setOpenModal(true)}><i className="fa-solid fa-power-off"></i> Activar</button>
        <a href="/byCode/resellers"><button><i className="fa-solid fa-share-nodes"></i> Resellers</button></a>
        

       {openModal &&
        <Modal setOpenModal={setOpenModal} title="Activate">
          <ActivateForm setDevicesState={setDevicesState} setOpenModal={setOpenModal}/>
        </Modal>}

        
    </div>
  )
}
