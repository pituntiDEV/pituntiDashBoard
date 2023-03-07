import React, { useState } from 'react'
import { BtnPrimary } from '../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../components/Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../hook/useFetchApi';

export const EditServer = ({server,setOpenModal}) => {
    const [formData,setFormData] = useState({
        limit:server.limit?server.limit:null
    })

    const [editServer,loading] = useFetchApi({
        url:`/api/server/${server._id}`,
        method: "PUT"
    })
    const submit = (e)=>{
        e.preventDefault();
        editServer({body:JSON.stringify(formData)})
            .then(data=>{
                SWAlert.alert({
                    title:"Editado Correctamente",
                })
                server.limit = formData.limit;
                setOpenModal(false)

            })
            .catch(error=>{
                SWAlert.error({
                    title:error.message || "Algo salio mal",
                })
            })
    }
  return (
    <form onSubmit={submit}>
        <div className="form__group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" readOnly id="name" value={server.data.name} />
        </div>
        <div className="form__group">
            <label htmlFor="limit">Limite de usuarios:</label>
            <input type="number" min="0" onChange={(e)=>{
                setFormData({...formData, limit: e.target.value});
            }} name="limit" id="limit" value={formData.limit} />
        </div>
       <div className="d-flex gap-3">
        <BtnPrimary title="Editar" />
        <BtnSecondary type="button" onClick={()=>setOpenModal(false)} title="Cancelar"/>
       </div>

    </form>
  )
}
