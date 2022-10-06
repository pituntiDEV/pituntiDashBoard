import React from 'react'
import "./Notofications.scss";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { appContext } from '../../context/AppContext';
import useFetchApi from '../../hook/useFetchApi';
import { useEffect } from 'react';
import { useState } from 'react';
import { CoinsIcon } from '../icons/CoinsIcon';
const Logout=()=>{
    localStorage.removeItem("access-token");
    window.location.href="/login"
}
export const Notification = () => {
    //State
    const [myAccountReseller,setMyAccountReseller] = useState({});
    const [creditsAvailable,setCreditsAvailable] = useState([]);
    //Context
    const {state:{account_data}  } = useContext(appContext);

    //Custom hooks
    const [getMyAccountReseller] = useFetchApi({
        url:`/api/resellers/get-my-account`,
        method: 'GET',
    })

    useEffect(()=>{
        getMyAccountReseller().then(data=>{
           setMyAccountReseller(data);
           const creditAvailables  = data.credits.filter(c=>c.new==true);
           setCreditsAvailable(creditAvailables);
        })
    },[])
    
    return (
        <div className="notification-container">
            
            {myAccountReseller?.credits?.length && <span className='credits'>
            <div className="total_credits">
            {myAccountReseller?.credits?.length && creditsAvailable?.length}
            </div>
                <CoinsIcon/>
            </span>}

            <Link to="/no-register-users">
            <span className='user_not_allow'>
                <i className="fa-solid fa-users-slash"> </i>
                <span>Usuarios no registrados</span>
                
            </span>
            </Link>


            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-message"></i>
            <div className="profile">
                <button className="initial-letter">
                {account_data?.name && account_data?.name[0] || ""}
                </button>
                <div className="options">
                    <div className="square"></div>
                    <div className="header">
                        <div className="initial-letter">
                        {account_data?.name && account_data?.name[0] || ""}
                        </div>
                            <small>{account_data.name}</small>
                        <p className="">{account_data.email}</p>
                    </div>
                    <ul>
                        <li>Profile</li>
                        {myAccountReseller?.credits?.length && <li>Credits : {creditsAvailable?.length}</li>}
                        <li>Setting</li>
                        <li onClick={Logout}>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
