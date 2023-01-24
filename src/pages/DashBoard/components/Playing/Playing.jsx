import React, { useEffect } from 'react'
import { useState } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';
import useGetAccountServers from '../../../../hook/useGetAccountServers';
import { Servers } from './Servers';

export const Playing = () => {
    const [myServers,setMyServers] = useState([]);
    const [sessionsFromMyServers,setSessionsFromMyServers] = useState([]);
    //Custom Hooks
    const [getServers] = useGetAccountServers();
    const [getSessionsFromMyServers,loading] = useFetchApi({
        url:`/api/plex/sessions/byserver`,
    });
    useEffect(()=>{
        getServers().then(servers=>{
            setMyServers(servers);
        })
        .catch(error=>console.log(error))
    },[])

    useEffect(()=>{
      myServers.map(server=>{
        getSessionsFromMyServers({body:JSON.stringify({serverID:server._id})})
        .then(data=>{
            const existe =sessionsFromMyServers.find(s=>s.server._id == data.server._id)
            if(!existe){
                setSessionsFromMyServers([...sessionsFromMyServers,data]);
            }
        })
      })
      
    },[myServers])

  
  return (
    <div>Playing

        {sessionsFromMyServers.map(playing=>{
           return <Servers key={playing.server._id} playing={playing}/>
        })}
    </div>
  )
}
