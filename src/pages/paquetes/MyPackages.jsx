import React, { useState } from 'react'
import { useEffect } from 'react';
import useFetchApi from '../../hook/useFetchApi';
import { useGetAccountPackage } from '../../hook/useGetAccountPackage'

export const MyPackages = ({server}) => {

  const [packages,setPackages] = useState([]);
    const [getPackage,loading] = useFetchApi({
      url:"/api/package/plex/server/"+server,
      method:"GET",
    });
    useEffect(() => {
     
    if(server){
      getPackage().then(data=>{
        setPackages(data);
      })
    }
     
        
    }, [server]);

  return (
    <>
    <h2>Mis paquetes:</h2>
    {
        packages.map(pk=>{
            return <div key={pk._id}>{pk.name}</div>
        })
    }
    </>

  )
}
