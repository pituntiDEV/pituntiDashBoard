import React, { useState } from 'react'
import "./NewResellerBar.scss";
import Modal from '../../modal/Modal';
import { SharedAccount } from '../components/SharedCredits/SharedAccount';
export const NewResellerBar = (props) => {
  const { totalresellers, setNewResellerState } = props;
  const [openModalToShareCredits, setOpenModalToShareCredits] = useState(false)
  return (
    <div className='new__reseller__bar'>
      <div className='new__reseller__counter'>
        Total: {totalresellers} {totalresellers > 1 ? "Resellers" : "Reseller"}
      </div>
      <div className='new__reseller__btn d-flex gap-3'>
        <button onClick={() => { setOpenModalToShareCredits(true) }}>Compartir cuenta</button>
        <button  {...props}>Agregar nuevo RESELLER</button>
      </div>

      {openModalToShareCredits &&
        <Modal title="Compartir cuenta" setOpenModal={setOpenModalToShareCredits}>
          <SharedAccount setNewResellerState={setNewResellerState} setOpenModal={setOpenModalToShareCredits} />
        </Modal>}
    </div>
  )
}
