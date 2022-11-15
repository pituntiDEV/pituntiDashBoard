import React from 'react'
import { useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi'

export const Packages = ({server,state,setState}) => {
    const [packages,setPackages] = useState([]);
    const [getPackages, loadingPackages] = useFetchApi({
        url: "/api/package/plex/server/" + server._id,
        method: "GET",
    })
    useState(()=>{
        getPackages().then(data=>{
            setPackages(data);
        })
    },[])

    const selectedPack = (pack)=>{
      const existe = state.packages.find(p=>p._id == pack._id);
      if(!existe){
         setState({...state,packages:[...state.packages,pack]})
      }else{
        const packages = state.packages.filter(p=>p._id != pack._id);
        setState({...state,packages})
      }
    
    }
  return (
    <details>
        <summary>{server?.data?.name} Paquetes</summary>
        <div className="packages">
           {
            packages.map(pack=>{
              const selected = state.packages.find(p=>p._id == pack._id);
                return <div onClick={()=>selectedPack(pack)} key={pack._id} className="pack mx-5">
                  <input readOnly type="checkbox" checked={selected} name="" id="" /> {pack.name}
                </div>
            })
           }
        </div>
    </details>
  )
}
