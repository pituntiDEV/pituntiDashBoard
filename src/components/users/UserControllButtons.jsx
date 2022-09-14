import React, { useContext } from 'react'
import { appContext } from '../../context/AppContext'
import { CoinsIcon } from '../icons/CoinsIcon';
import "./User.scss";

export const UserControllButtons = ({showCoverHandler,user,setUser}) => {
    const {setOpenEditModal}=useContext(appContext)
    return (
        <div className="icons">

           <p className="credits">
                <CoinsIcon/>
                {user.credits.length}
           </p>

            <i className="fa-solid fa-pen-to-square" onClick={()=>{
                setUser(user);
                setOpenEditModal(true)
            }}></i>
            <i onClick={() => showCoverHandler(user, "resend")} className="fa-solid fa-repeat"></i>
            <i onClick={() => showCoverHandler(user, "info")} className="fa-solid fa-circle-info"></i>
            <div className="libs-num">
                <span className="num">{user.data?.numLibraries}</span>
                <i className="fa-solid fa-book"></i>
            </div>
            <i className="fa-solid fa-trash-can"></i>
        </div>
    )
}
