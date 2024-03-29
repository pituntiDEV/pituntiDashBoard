import React, { useState } from 'react'
import Modal from '../../components/modal/Modal';
import { NewResellerBar } from '../../components/Resellers/NewResellerBar/NewResellerBar';
import { NewResellerForm } from '../../components/Resellers/NewResellerForm/NewResellerForm';
import { ResellersList } from '../../components/Resellers/ResellerList/ResellersList';

import "./Resellers.scss";
import { useGetResellers } from './hooks/useGetResellers';
export const Resellers = () => {
  //State
  const [openModal, setOpenModal] = useState(false);
  const [resellersState, setResellersState] = useState(true);
  const [resellers, setResellers] = useGetResellers([resellersState]);

  return (
    <div className='resellers container'>
      <NewResellerBar setResellersState={setResellersState} setResellers={setResellers} resellers={resellers} onClick={() => setOpenModal(true)} />


      <ResellersList setResellersState={setResellersState} setResellers={setResellers} resellers={resellers} />


      {/* Edit Data */}
      {openModal &&
        <Modal setOpenModal={setOpenModal} title='Nuevo Reseller'>
          <NewResellerForm setResellersState={setResellersState} resellers={resellers} setResellers={setResellers} setOpenModal={setOpenModal} />
        </Modal>
      }
    </div>
  )
}
