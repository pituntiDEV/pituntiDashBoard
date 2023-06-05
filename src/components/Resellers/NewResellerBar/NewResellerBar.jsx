import React, { useState } from 'react'
import "./NewResellerBar.scss";
import Modal from '../../modal/Modal';
import { SharedAccount } from '../components/SharedCredits/SharedAccount';


export const NewResellerBar = (props) => {
  const { resellers, setResellers, setResellersState } = props;
  const [openModalToShareCredits, setOpenModalToShareCredits] = useState(false)
  return (
    <div className='new__reseller__bar'>
      <div className='new__reseller__counter'>
        Total: {resellers.length} {resellers.length > 1 ? "Resellers" : "Reseller"}
      </div>
      <div className='new__reseller__btn d-flex gap-3'>
        <button onClick={() => { setOpenModalToShareCredits(true) }}>Compartir cuenta(BETA)</button>
        <button  {...props}>Agregar nuevo RESELLER</button>
      </div>

      {openModalToShareCredits &&
        <Modal title="Compartir cuenta" setOpenModal={setOpenModalToShareCredits}>
          <SharedAccount setResellersState={setResellersState} setResellers={setResellers} resellers={resellers} setOpenModal={setOpenModalToShareCredits} />
        </Modal>}
    </div>
  )
}
