import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import useFetchApi from '../../../../hook/useFetchApi'
import { CancelIcon } from '../../../icons/CancelIcon';
import { CheckIcon } from '../../../icons/CheckIcon';
import { CircleCheck } from '../../../icons/CircleCheck';
import "./PackagesList.scss";
export const PackagesList = ({ server ,state,setState}) => {
    //State
    const [packages, setPackages] = React.useState([]);

    
    const [getPackages, loading] = useFetchApi({
        url: `/api/package/plex/server/${server.server._id}`,
        method: 'GET',
    })
    useEffect(()=>{
        getPackages().then((data)=>{
          setPackages(data);
        })
    },[])

    //Functions
    const selectedPackages=(pack)=>{ 
        let packages = server.packages;
        const existePack= packages.includes(pack._id);
        if(!existePack){
            server.packages = [...server.packages,pack._id];
        }else{
            server.packages = server.packages.filter(p=>p!=pack._id);
        }
       setState({...state,servers:state.servers})
         console.log(state.servers)
    }
    return (
        <div className="packages__list">
            <details>
                <summary>{server.server.data?.name} Packages</summary>
                <div className="content">
                    {packages.map(pack=>{
                        const selected = state.servers.find(s=>s.server._id == server.server._id).packages.includes(pack._id)
                        
                        return (
                            <div onClick={()=>selectedPackages(pack)} key={pack._id} className={`package ${""&& "active"}`}>
                                {selected ? < CheckIcon/>:<CancelIcon className="text-danger" />} {pack.name} 
                                <small>--({pack.libs.length} Libs)</small>
                            </div>
                        )
                    })}
                </div>
                
            </details>
        </div>
    )
}
