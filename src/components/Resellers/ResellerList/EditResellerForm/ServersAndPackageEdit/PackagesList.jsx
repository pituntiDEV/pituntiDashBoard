import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi'
import { CancelIcon } from '../../../../icons/CancelIcon'
import { CheckIcon } from '../../../../icons/CheckIcon'
import { PackCloseIcon } from '../../../../icons/PackCloseIcon'
import { ServerIcon } from '../../../../icons/ServerIcon'

export const PackagesList = ({ server,resellerToEdit,setResellerToEdit }) => {

    const [packages, setPackages] = useState([]);
    const [getPackages, loading] = useFetchApi({
        url: "/api/package/plex/server/" + server?._id,
        method: "GET",
    })

    useEffect(() => {
        getPackages().then(data => {
            setPackages(data);
        })
    
    }, [server])

    
   

    const selectPackage=(pack)=>{
        const servers= resellerToEdit.servers
        const serverEdit = servers.find(s=>s.server._id==server._id);
    

        const existe=serverEdit.packages.find(p=>p==pack._id);

      
        if(existe){
            const newPack = serverEdit.packages.filter(p=>p!=pack._id);
            serverEdit.packages = newPack;
        }else{
            const newPack = [...serverEdit.packages,pack._id];
            serverEdit.packages = newPack
        }
     

        setResellerToEdit({...resellerToEdit,servers});

    }




    return (
        <div className="packages__list">

            {packages.length> 0 && <details>
                <summary> <ServerIcon /> {server?.data?.name} Packages:</summary>
                
                    <ul className="packages__container">
                        {packages.map(pack => {
                          const findServer = resellerToEdit.servers.find(s=>s.server?._id== server._id);
                            return (
                                <li className={`package ${findServer.packages.includes(pack._id) && "active"} `} onClick={()=>selectPackage(pack)}>-- 
                                &nbsp;
                                   { findServer.packages.includes(pack._id)? <CheckIcon className=" pr-1"/>:<CancelIcon className="text-danger pr-1"/> }
                                   {pack.name}
                                </li>)
                        })}
                    </ul>
                

            </details>}
        </div>
    )
}
