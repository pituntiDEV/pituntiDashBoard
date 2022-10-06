import React, { useState } from 'react'
import { useEffect } from 'react'
import useFetchApi from '../../../hook/useFetchApi'
import { AddCreditsToDemoByAdmin } from './AddCreditsToDemoByAdmin';
import { AddCreditsToDemoByReseller } from './AddCreditsToDemoByReseller';
import "./AddCreditToDemo.scss";
export const AddCreditToDemo = ({user,setOpenModal,setDemoState}) => {
    const [myId,setMyId] = useState(null);
    const [getMyId,loadingGetMyID] = useFetchApi({
        url:"/api/auth/myID",
        method:"GET",
    })

    useEffect(()=>{
      getMyId().then(id=>setMyId(id))
    },[])
    
  return (
    <div className='add_credits_to_demo'>
        {user.admin == myId ? 
        <AddCreditsToDemoByAdmin setDemoState={setDemoState} setOpenModal={setOpenModal} user={user}/>:
        <AddCreditsToDemoByReseller setDemoState={setDemoState} setOpenModal={setOpenModal}  user={user}/>}
    </div>
  )
}
