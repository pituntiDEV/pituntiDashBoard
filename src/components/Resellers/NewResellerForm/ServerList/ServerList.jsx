import React,{useEffect} from 'react'
import useGetAccountServers from '../../../../hook/useGetAccountServers';
import { HouseWifiIcon } from '../../../icons/HouseWifiIcon';
import { ServerIcon } from '../../../icons/ServerIcon';
import { PackagesList } from '../PackagesList/PackagesList';
import "./ServerList.scss";
export const ServerList = ({state,setState}) => {



    //Custom Hooks
    const [getServers,servers,loading]=useGetAccountServers()

    useEffect(()=>{
        getServers()
    },[])

    //Functions
    const selectServer=(server)=>{
      let servers= state.servers;
      const serverID= server._id;
      const existe = servers.find(server=>server.server._id === serverID);
      if(!existe){
        servers = [...servers,{
          server,
          packages:[]
        }];
        setState({...state,servers});
      }else{
        const newArray= servers.filter(server=>server.server._id !== serverID)
        setState({...state,servers:newArray})
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
