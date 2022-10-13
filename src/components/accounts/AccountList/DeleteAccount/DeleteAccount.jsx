import React from 'react'
import useFetchApi from '../../../../hook/useFetchApi'
import { BtnPrimary } from '../../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../SwAlert/SWAlert'

export const DeleteAccount = ({accountID,setOpenModal,setDeleteAccount}) => {

    //Custom Hooks
    const [deleteAccount] = useFetchApi({
        url:`/api/admin/accounts/${accountID}`,
        method: 'DELETE',
      })

    //Functions
    const deleteAccounts=()=>{
      deleteAccount().then(data=>{
        setOpenModal(false);
        setDeleteAccount(a=>!a);
        SWAlert.alert({
            title:"Account deleted",
        })
        console.log(data)
      })
    }
  return (
    <div>
        
        <h2 className='text-danger'>!!Avertencia</h2>
        <h3 className='text-dark'>Se eliminaran todos los: 
        <ul className='text-info'>
          <li>Servidores</li>
          <li>Paquetes</li>
          <li>Usuarios</li>
        </ul>
         de la base de datos relacionados a esta cuenta</h3>

         <p className='text-danger'>
            Estas seguro de eliminar esta cuenta?
        </p>
         <div className="btns">
         <BtnPrimary className="bg-danger" onClick={deleteAccounts} title="Si,Eliminar TODO"/>
         <BtnSecondary onClick={()=>setOpenModal(false)} title="Cancelar"/>
         </div>
    </div>
  )
}
