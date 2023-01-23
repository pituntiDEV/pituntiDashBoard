import { useState } from "react"
import { useEffect } from "react"
import useFetchApi from "./useFetchApi"

export const useGetPlexAccounts = () => {
    const [accounts,setAccounts] = useState([]);
    const [getAccounts,loading] =useFetchApi({
        url:`/api/admin/get/accounts`,
        method: 'GET',
    })
    
    useEffect(()=>{
        getAccounts().then(data=>{
        setAccounts(data)
    })
  },[])

  return [accounts,loading]
}
