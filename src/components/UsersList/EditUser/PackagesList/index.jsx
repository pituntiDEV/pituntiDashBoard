import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useGetPackagesByServer } from '../../../../hook/useGetPackagesByServer'
export const PackagesList = ({ server,state,setState,user }) => {
    const [packages, setPackages] = useState([]);
    const [getPackages, loading] = useGetPackagesByServer(server._id);
    const isAdmin = localStorage.getItem("_id") == user.admin._id;
    useEffect(() => {
        getPackages().then((data) => {
            setPackages(data);
        })

    }, [server])

    const selectPackage= (pack)=>{
        const existe = state.packages.find(p=>p._id == pack._id);
        if(!existe){
            setState({...state,packages:[...state.packages, pack]});
        }else{
            const packages = state.packages.filter(p=>p._id != pack._id);
            setState({...state,packages})
        }
    }
    return (
        <div className="packages">
            <details>
                <summary>
                    {server?.data?.name} Paquetes
                </summary>
                {
                    packages.map(pack => {
                        const checked = state.packages.find(p=>p._id == pack._id);
                        return (
                            <div key={pack._id}   className={`pack px-5 ${!isAdmin && pack.priceByPackage && "d-none"}`}>
                                <input value={pack._id}  onChange={()=>selectPackage(pack)} type="checkbox" checked={checked}  /> {pack.name}
                                {/* {pack.priceByPackage} {isAdmin && "Admin"} */}
                            </div>

                        )
                    })
                }
            </details>
        </div>
    )
}
