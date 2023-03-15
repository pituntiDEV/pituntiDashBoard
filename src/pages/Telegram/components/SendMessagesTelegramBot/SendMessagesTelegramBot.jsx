import React, { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import Modal from '../../../../components/modal/Modal';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';

export const SendMessagesTelegramBot = ({bot}) => {
    const [openModal, setOpenModal] = useState(false);
    const [sendMessage,loading] = useFetchApi({
        url:`/api/telegram/sendMessage`
    })
    const [formData,setFormData] = useState({
        bot:bot._id,
        message:""
    })
    const submit = (e) => {
        e.preventDefault();
        sendMessage({body:JSON.stringify(formData)})
            .then((data=>{
                SWAlert.alert({
                    title:data.message || "Enviado"
                })
                setOpenModal(false)
            }))
            .catch(error=>{
                SWAlert.error({
                    title:error.message || "Algo salio mal",
                    text:error.text
                })
            })

    }
    return (
        <div>
            <i className="fa-regular fa-message" onClick={() => setOpenModal(true)}></i>
            {openModal &&
                <Modal title="Enviar mensaje" setOpenModal={setOpenModal}>
                    <form onSubmit={submit}>
                        <div className="form__group">
                            <label htmlFor="">Mensaje</label>
                            <textarea onChange={(e)=>{
                                setFormData({...formData,message:e.target.value})
                            }} name="" id="" cols="6" rows="5">

                            </textarea>
                        </div>
                        <div className="d-flex gap-3 ">
                            <BtnPrimary title="Enviar" />
                            <BtnSecondary onClick={() => setOpenModal(false)} type="button" title="Cancelar" />
                        </div>
                    </form>
                </Modal>}
        </div>
    )
}
