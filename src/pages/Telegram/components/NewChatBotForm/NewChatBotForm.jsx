import React, { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';

export const NewChatBotForm = ({setOpenModal}) => {
    const [formData,setFormData] =useState({
        name:null,
        chatId:null,
        token:null,
        recientes:false,
    })
    const onChangeHandler =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const submit = (e)=>{
        e.preventDefault();
       
    }
  return (
    <form onSubmit={submit}>
         <div className="form__group">
            <label htmlFor="">Nombre:</label>
            <input onChange={onChangeHandler} minLength="3" required type="text" name="name" id="name" />
        </div>
        <div className="form__group">
            <label htmlFor="">Token:</label>
            <input  onChange={onChangeHandler} minLength="10" required type="text" name="token" id="token" />
        </div>

        <div className="form__group">
            <label htmlFor="">ChatID:</label>
            <input  onChange={onChangeHandler} minLength="3" required type="text" name="chatId" id="chatId" />
        </div>

        <div className="form__groups">
            <input  onChange={(e)=>{
                setFormData({...formData,recientes:e.target.checked})
            }} type="checkbox" name="chatId" id="chatId" />
            <small className='text-muted' htmlFor=""> Usar este Bot Para enviar los archivos agregados recientemente:</small>
        </div>

        <div className="d-flex gap-3">
        <BtnPrimary title="Crear"/>
        <BtnSecondary type="button" onClick={()=>setOpenModal(false)} title="Cancelar"/>
        </div>
    </form>
  )
}
