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
  const [resellers, setResellers] = useGetResellers();

  return (
    <div className='resellers container'>
      <NewResellerBar setResellers={setResellers} resellers={resellers} onClick={() => setOpenModal(true)} />

      <div className='resellers-new__btn m-2'>

      </div>

      <ResellersList setResellers={setResellers} resellers={resellers} />


      {/* Edit Data */}
      {openModal &&
        <Modal setOpenModal={setOpenModal} title='Nuevo Reseller'>
          <NewResellerForm resellers={resellers} setResellers={setResellers} setOpenModal={setOpenModal} />
        </Modal>
      }
    </div>
  )
}
