import React, { useState } from 'react'
import { useEffect } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';
import "./Packages.scss";
export const Packages = ({server,state,setState}) => {
    //States
    const [packages,setPackages] = useState([]);
    //Custom hooks
    const [getPackageByServer] = useFetchApi({
        url:`/api/package/plex/server/${server._id}`,
        method: 'GET',
    })
    useEffect(()=>{
        getPackageByServer().then(data=>{
           setPackages(data);
           setState({...state,packages:[...state.packages,...data]});
        })
    },[])



const onChangePack=(pack)=>{
    console.log(pack)
  const existe = state.packages.find(p=>p._id == pack._id);
  if(!existe){
    setState({...state,packages:[...state.packages,pack]});
  }else{
    const filter = state.packages.filter(p=>p._id != pack._id);
    setState({...state,packages:filter});
  }
}

  return (
    <div className='packages__list'>
        <details>
           
            <summary>{server?.data.name} </summary>
        {
            packages.map(pack=>{
                const selected = state.packages.find(p=>p._id == pack._id);
                return (
                    <div key={pack._id} className='pack ps-5'>
                       <input onChange={()=>onChangePack(pack)} type="checkbox" checked={selected && "true"}  /> {pack.name}
                    </div>
                )
            })
        }
        </details>
        
    </div>
  )
}
