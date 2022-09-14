import React, { useState } from 'react'
import Modal from '../../components/modal/Modal';
import { NewResellerBar } from '../../components/Resellers/NewResellerBar/NewResellerBar';
import { NewResellerForm } from '../../components/Resellers/NewResellerForm/NewResellerForm';
import { ResellersList } from '../../components/Resellers/ResellerList/ResellersList';

import "./Resellers.scss";
export const Resellers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [totalResellers, setTotalResellers] = useState("--");
  return (
    <div className='resellers container'>
      <NewResellerBar totalresellers={totalResellers} onClick={() => setOpenModal(true)} />
      
      <div className='resellers-new__btn m-2'>
      
      </div>

      <ResellersList setTotalResellers={setTotalResellers} />


     {/* Edit Data */}
      {openModal &&
          <Modal setOpenModal={setOpenModal} title='Nuevo Reseller'>
            <NewResellerForm setOpenModal={setOpenModal} />
          </Modal>
        }
    </div>
  )
}
