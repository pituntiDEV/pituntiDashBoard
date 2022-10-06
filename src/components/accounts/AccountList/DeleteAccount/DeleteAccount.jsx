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
        <p className='text-danger'>
            Estas seguro de eliminar esta cuenta?
        </p>
         <div className="btns">
         <BtnPrimary className="bg-danger" onClick={deleteAccounts} title="Si,Eliminar"/>
         <BtnSecondary title="Cancelar"/>
         </div>
    </div>
  )
}
