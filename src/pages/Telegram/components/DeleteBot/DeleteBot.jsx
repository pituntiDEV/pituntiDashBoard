import React, { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import Modal from '../../../../components/modal/Modal';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';

export const DeleteBot = ({bot,bots,setBots}) => {
    const [openModal,setOpenModal]=useState(false);
    const [removeBot,loading]=useFetchApi({
        url:`/api/telegram/bot/${bot._id}`,
        method:"DELETE"
    })

    const deleteBot = ()=>{
        removeBot()
            .then((data)=>{
                SWAlert.alert({
                    title:data.message || "Eliminado"
                })
                const newBots = bots.filter(b=>b._id!=bot._id);
                setBots(newBots)
                setOpenModal(false)
                
            })
            .catch((error)=>{
                SWAlert.error({
                    title:error.message
                })
            })
    }
  return (
    <div>
        <TrashIcon  onClick={()=>setOpenModal(true)}/>
        {
            openModal && 
            <Modal title={`Elimnar ${bot.name}`} setOpenModal={setOpenModal}>
                 <div className="dialog">
                    <div className="alert alert-warning">
                        <h3 className='text-center fw-bold'>Seguro quires eliminar  {bot.name}?</h3>
                    </div>
                    <div className="d-flex gap-3 ">
                        <BtnPrimary onClick={deleteBot} type="button" title="Si,Eliminar"/>
                        <BtnSecondary onClick={()=>setOpenModal(false)} type="button" title="Cancelar"/>
                    </div>
                 </div>
            </Modal>
            }
        
    </div>
  )
}
