import React from 'react'
import { useState } from 'react';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import { useGetPlexAccounts } from '../../../../hook/useGetPlexAccounts';
import "./EditResellerForm.scss";

export const EditResellerForm = ({setResellersState,user,setOpenModal}) => {
    //State
    const [userAccounts,setUserAccounts] =useState(user.accounts);
    const [accounts,loading]=useGetPlexAccounts();
    const [demoDuration,setDemoDuration] = useState(user.demoDuration);

    //Custom Hooks
    const [edit,loadingToEdit] = useFetchApi({
        url:`/api/byCode/resellers/${user._id}`,
        method:"PUT"
    })

    //Functions

    const changeAccount=(account)=>{
        
        const exist = userAccounts.find(acc=>acc==account._id);
        if(exist){
            const newAccounts = userAccounts.filter(acc=>acc!=account._id);
            setUserAccounts(newAccounts)
        }else{
            const newAccounts = [...userAccounts,account._id]
            setUserAccounts(newAccounts)
        }
    }

    const submit=(e)=>{
        e.preventDefault();
        edit({body:JSON.stringify({
            accounts:userAccounts,
            demoDuration
        })})
        .then(data=>{
            setResellersState(s=>!s);
            SWAlert.alert({
                title:"Editado con exito"
            })
            setOpenModal(false)
        })
        .catch(erro=>{
            SWAlert.error({
                title:"Algo salio mal"
            })
        })
    }
  return (
    <form onSubmit={submit} className='edit__reseller__by__code'>
        <h2>Cuentas compartidas:</h2>
       <div className="accounts__container">
            {
                accounts.map(account=>{
                    const isAdded =userAccounts.includes(account._id);
                    return (
                        <div onClick={()=>{
                            changeAccount(account);
                        }} key={account._id} className={`account p-3 rounded text-white fw-bold ${isAdded?"bg-success":"bg-danger"}`}>
                         {account.email}
                   
                        </div>
                    )
                })
            }
       </div>

       <div className="form__group">
        <label htmlFor="demoTime">Duracion de demo (HRS)</label>
        <input type="number" onChange={(e)=>{
            setDemoDuration(e.target.value)
        }} min="0" value={demoDuration} name="demoTime" id="demoTIme" />
       </div>
       <div className="buttonss mt-5 d-flex gap-4">
            <input className='btn btn-primary' type="submit" value="Editar" />
            <input onClick={()=>{
                setOpenModal(false)
            }} className='btn btn-secondary' type="button" value="Cancelar" />
       </div>
    </form>
  )
}
