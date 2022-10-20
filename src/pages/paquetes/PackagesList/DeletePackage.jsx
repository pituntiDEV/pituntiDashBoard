import React from 'react'
import { BtnPrimary } from '../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../components/Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../components/SwAlert/SWAlert'
import useFetchApi from '../../../hook/useFetchApi'

export const DeletePackage = ({ pack,setPaqueteState,setOpenModal }) => {
    const [deletePackage,loadingDeletePAckage] =  useFetchApi({
        url:`/api/package/${pack._id}`,
        method: 'DELETE',
    })

    const deletePack=()=>{
        deletePackage()
        .then(data=>{
            SWAlert.alert({
                title:data.message || 'Delete Package',
            })
            setPaqueteState(s=>!s);
            setOpenModal(false);
        })
        .catch(error=>{
           SWAlert.error({
            title:error.message || 'Error deleting package',
           })
        })
    }
  return (
    <div>
        <p className='text-danger'>Estas seguro de eliminar este paquete de: <span className='text-dark fw-bold'>{pack.name}</span></p>
        <div className="btns">
            <BtnPrimary onClick={deletePack} className="bg-danger" title="Si, Eliminar"/>
            <BtnSecondary title="Cancelar"/>
        </div>
    </div>
  )
}
