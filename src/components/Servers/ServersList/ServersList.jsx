import React, { useState } from 'react'
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi'
import { ServerIcon } from '../../icons/ServerIcon';
import "./ServersList.scss";
export const ServersList = ({setTotalServers,newServerState}) => {
  //States
  const [servers,setServers] = useState([]);


  //Custom hooks
  const [getServers,loadingGetServers] =useFetchApi({
    url:`/api/server/get/all`,
    method: 'GET',
  });

  useEffect(()=>{
    getServers().then(({data})=>{
      setServers(data.servers);
      setTotalServers(data.servers?.length);
    })
  },[newServerState])
  return (
    <div className='server-list'>
     <h2> Servers:</h2>
        <div className="servers">
          {servers.map(server=>{
            return (
            <div key={server._id} className="server">
                <span className="circle">{server.data.name[0]}</span>
                <span> <ServerIcon/> {server.data.name}</span>
            </div>)
          })}
        </div>
    </div>
  )
}
