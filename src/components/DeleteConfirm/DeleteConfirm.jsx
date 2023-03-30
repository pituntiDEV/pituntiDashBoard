import React from 'react'
import { BtnPrimary } from '../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../SwAlert/SWAlert'

export const DeleteConfirm = ({children,setOpenModal,exec,state}={}) => {
  return (
    <div>
       {children}
        <div className="btns d-flex gap-3">
            <BtnPrimary onClick={()=>{
                exec().then((data)=>{
                    SWAlert.alert({
                        title:data.message || "Agregado"
                    })
                    setOpenModal(false);
                    state(s=>!s);
                })
                .catch(error=>{
                    SWAlert.error({title:error.message || "Algo salio mal"})
                })
            }} className="bg-danger" title="Si,Eliminar"/>
            <BtnSecondary onClick={()=>setOpenModal(false)} title="Cancelar"/>
        </div>
    </div>
  )
}
