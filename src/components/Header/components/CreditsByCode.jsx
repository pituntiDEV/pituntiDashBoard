import React, { useEffect, useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi'
import { CoinsIcon } from '../../icons/CoinsIcon';
import "./style.scss"
export const CreditsByCode = () => {
    const [credits,setCredits] = useState(0);
    const [getCreditsByCode,loading] = useFetchApi({
        url:`/api/credits/byCode/`,
        method: 'GET',
    })

    useEffect(()=>{
        getCreditsByCode()
            .then(data=>{
                setCredits(data.length);
            })
    },[])

 if(credits < 1){
    return;
 }
  return (
    <div className='credits_by_code'>
         <span>Code</span>
         <CoinsIcon/>
         <small>{credits}</small>
    </div>
  )
}
