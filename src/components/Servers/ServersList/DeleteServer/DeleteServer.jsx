import React from 'react'
import useFetchApi from '../../../../hook/useFetchApi'
import { BtnPrimary } from '../../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../SwAlert/SWAlert'

export const DeleteServer = ({server,setOpenModal,setServerState}) => {
    const [deleteServer,loadingDeleteServer] = useFetchApi({
        url:`/api/server/${server._id}`,
        method: 'DELETE',
    })

    const deleteServe=()=>{
        deleteServer()
        .then(data=>{
            SWAlert.alert({
                title:data.message || "Server Eliminado"
            })
            setOpenModal(false);
            setServerState(s=>!s);
        })
        .catch(error=>{
            SWAlert.error({
                title:error.message || "Algo salio mal"
            })
        })

       
    }
  return (
    <div>
        <p className=' fw-bold'>
            <h2 className='text-danger'>!!Avertencia</h2>
            <p>Se eliminaran todos los</p>
            <ul className='text-info'>
                <li>El Servidor</li>
                <li>Paquetes</li>
                <li>Usuarios</li>
            </ul>
            <p>de la base de datos relacionados a este SERVER</p>
           <p className='text-danger'>
           Estas seguro que quiere eliminar el server: <div className='text-dark'>{server.data.name}</div>
           </p>
        </p>

        <div className="btns">
            <BtnPrimary onClick={deleteServe} className="bg-danger" title="Si,Eliminar"/>
            <BtnSecondary onClick={()=>{
                setOpenModal(false);
            }} title="Cancelar"/>
        </div>
    </div>
  )
}
