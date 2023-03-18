import React, { useState } from 'react'
import { BtnPrimary } from '../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../components/Buttons/BtnSucess/BtnSecondary';
import Modal from '../../../components/modal/Modal';
import SWAlert from '../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../hook/useFetchApi'

export const SendNotifications = ({bot}) => {
    const [openModal,setOpenModal] = useState(false)
    const [SendNotifications,loading] = useFetchApi({
        url:`/api/telegram/actions`,
        method: 'POST',
    });
    const [formData,setFormData] = useState({
        recents:false,
        bot

    })
    const submit=(e)=>{
        e.preventDefault();
       
     
        if(!formData.recents){
            SWAlert.error({
                title:"Selecciona una opcion",
                text:"Selecciona una de las opciones disponibles"
            })
            return;
        }

       SendNotifications({body:JSON.stringify(formData)})
        .then(data=>{
          SWAlert.success({
            title:"Enviando",
            text:"Se entan enviando los datos "
          })
        }).catch(error=>{
            SWAlert.error({
                title:"Algo salio mal",
                text:error.message || ""
            })
        })
        
    }
  return (
    <div>
        <i onClick={()=>setOpenModal(true)} className="fa-regular fa-bell"></i>
      {openModal &&  
      <Modal setOpenModal={setOpenModal} title="Envio de notificaciones TELEGRAM">
           <form onSubmit={submit}>
          
            <div className="form_group">
           
                <input type="checkbox" onChange={(e)=>{
                    setFormData({...formData,recents:e.target.checked})
                }} name="" id="" /> Enviar agregado recientente
            </div>
          
             <div className="d-flex gap-3">
                <BtnPrimary title="Enviar"/>
                <BtnSecondary onClick={()=>setOpenModal(false)} title="Cancelar"/>
             </div>
           </form>
        </Modal>}
    </div>
  )
}
