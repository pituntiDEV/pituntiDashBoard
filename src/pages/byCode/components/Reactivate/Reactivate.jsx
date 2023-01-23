import React from 'react'
import { useState } from 'react';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import "./Reactivate.scss";
export const Reactivate = ({deviceToReactivate,setOpenModal}) => {
    //State
    const [code,setCode] = useState("");

    // Customs Hooks
    const [reactivate,loading] = useFetchApi({
        url:`/api/byCode/reactivate`,
        method: 'POST',
    })
    const submit=(e)=>{
        e.preventDefault();
        reactivate({body:JSON.stringify({code,account_id:deviceToReactivate.account})})
        .then(data=>{
            SWAlert.alert({
                title:data.message
            })
            setOpenModal(false)
        })
        .catch(err=>{
          SWAlert.error({
            title:err.message
          })
        })

    }
  return (
    <form onSubmit={submit} className='Reactivate'>
        <div className="form__group">
            <input onChange={(e)=>{       
                  setCode(e.target.value);
            }} maxLength="4" required type="text mw-50" placeholder='Code' value={code} />
        </div>

       
            <div className="button">
            <button>Reactivar</button>
            </div>
       
    </form>
  )
}
