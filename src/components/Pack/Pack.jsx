import React from 'react'
import { useContext } from 'react';
import NewUserContext from '../../context/NewUserContextProvider';
import "./Pack.scss";
export const Pack = ({pack}) => {
    const {state,setPackage}=useContext(NewUserContext)
    return (
        <div onClick={()=>setPackage(pack)} className={`pack ${pack._id == state.package?._id && "active"}`} key={pack._id}>
            <p className='name'>{pack.name} </p>
            <p className='libs-count'><span>{pack?.libs?.length}</span> LIBS</p>
            
           
        </div>
    )
}
