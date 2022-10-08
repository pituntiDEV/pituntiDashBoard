import React, { useEffect } from 'react'
import { useState } from 'react';
import { Lineal } from '../../components/Chart/Lineal';
import useGetAccountServers from '../../hook/useGetAccountServers'
import { Servers } from './Servers';
import "./DashBoard.scss";
export const DashBoard = () => {
    //State
    const [servers,setServers] = useState([]);
  
    //Custom Hooks
    const [getServers] = useGetAccountServers();



    useEffect(()=>{
        getServers().then(data=>{
            setServers(data.data.servers)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
  

    
  return (
    <div className='container'>
       {servers.map(server=>{
        return <Servers   key={server._id} server={server}/>
       })}
        {/* <Lineal/> */}
    </div>
  )
}
