import React,{useEffect} from 'react'
import { useState } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';
import useGetAccountServers from '../../../../hook/useGetAccountServers';
import { HouseWifiIcon } from '../../../icons/HouseWifiIcon';
import { ServerIcon } from '../../../icons/ServerIcon';
import { PackagesList } from '../PackagesList/PackagesList';
import "./ServerList.scss";
export const ServerList = ({state,setState}) => {

 const [servers,setServers] = useState([])

    //Custom Hooks
     //Customs Hooks
  const [getServers, loading] = useFetchApi({
    url: `/api/server/get/all`,
    method: 'GET',
  });

    useEffect(()=>{
        getServers()
          .then(servers=>{
            setServers(servers);
          })
    },[])

    //Functions
    const selectServer=(serverID)=>{
      let stateServers = state.servers;
      const existe = stateServers.find(s=>s.server._id==serverID._id);
      if(!existe) {
        stateServers=[...stateServers,{server:serverID,packages:[]}];
        setState({...state,servers:stateServers})
      }else{
        stateServers= stateServers.filter(s=>s.server._id !=serverID._id);
        setState({...state,servers:stateServers})
      }
    }
  return (
    <div className="server__list">
        <h3>Servers:</h3>
        <div className="server__list-item">
            {servers.map(server=>{
              const selected =  state.servers.find(s=>s.server._id == server._id);
                return(
                    <div onClick={()=>selectServer(server)} key={server._id} className={`server ${selected && "active"}`}>
                     
                     <p> <ServerIcon/> {server.data?.name}</p>
                      <p><HouseWifiIcon/> {server.data.publicAddress}</p>
                    </div>
                    )
            })}
        </div>
        { state.servers.map(server=>{
          return (
            <PackagesList state={state} setState={setState} key={server._id} server={server}/>
          )
        }) }
    </div>
  )
}
