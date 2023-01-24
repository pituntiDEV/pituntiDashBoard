import React from 'react'
import "./Notofications.scss";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { appContext } from '../../context/AppContext';
import useFetchApi from '../../hook/useFetchApi';
import { useEffect } from 'react';
import { useState } from 'react';
import { CoinsIcon } from '../icons/CoinsIcon';
import SWAlert from '../SwAlert/SWAlert';
import Modal from '../modal/Modal';
const Logout = () => {
    localStorage.removeItem("access-token");
    window.location.href = "/login"
}
export const Notification = () => {
    //Context
    const appContextValue = useContext(appContext);
    //State
    const [totalCredits, setAllCredits] = useState({});
    const [openModalWebHook,setOpenModalWebHook] =useState(false);
    const [notifications,setNotifications] = useState([]);
    //Context
    const { state: { account_data } } = useContext(appContext);
    

    //Custom hooks
    const [getMyTotalCredits] = useFetchApi({
        url: `/api/credits/shared-available`,
        method: 'GET',
    })

    const [getNotifications,loadingGetNotifications] = useFetchApi({
        url:"/api/notifications",
        method: 'GET',
    })

    useEffect(()=>{
        getNotifications().then(data=>{
            setNotifications(data);
        })
    },[])
    

    useEffect(() => {
        getMyTotalCredits().then(data => {
            setAllCredits(data);
        })
    }, [appContextValue.state.onChangeCredits])

    return (
        <div className="notification-container">

            {totalCredits.length > 0 && <span className='credits'>
                <div className="total_credits">
                    {totalCredits.length}
                </div>
                <CoinsIcon />
            </span>}

            <Link to="/no-register-users">
                <span className='user_not_allow'>
                    <i className="fa-solid fa-users-slash"> </i>
                    <span>Usuarios no registrados</span>

                </span>
            </Link>

            {/* WebHooks LINK */}
            <div className="web_hooks">
                <i onClick={async()=>{
                    setOpenModalWebHook(true); //
                }} className="fa-solid fa-blog"></i>
                
            </div>

            {/* Notifications */}
            <div className="notifications">
                <div className="icon">
                    <div className="punto"></div>
                    <i className="fa-solid fa-bell"></i>

                </div>
                

                <div className="notifications-list">
                    {notifications.map(notification=>{
                        return (<div key={notification._id} className='notification'>
                            <i className="fa-solid fa-bell"></i> {notification.action}
                        </div>)
                    })}
                </div>
            </div>

            {/* Messages */}
            <i className="fa-solid fa-message"></i>
            <div className="profile">
               {!account_data?.config?.thumb ?<button className="initial-letter">
                    {account_data?.name && account_data?.name[0] || ""}
                    
                </button>
                :
                <div className="photo_profile">
                    <img src={`${process.env.REACT_APP_API_URL}/api/img/profiles/${account_data.config.thumb}`}/>
                </div>
                }
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
                        {/* <li>Profile</li> */}
                        <li><a href="/setting">Setting</a></li>
                        <li>
                            {account_data.plan !="free"?`⭐Plan ${account_data.plan} usuarios`:`🆓Plan Free`}</li>
                       <li>
                       {
                            account_data.plan !="free" && <div>⏳Exp: <small className='text-danger'>{account_data.expireAt}</small></div>
                        }
                       </li>
                        
                        <li onClick={Logout}>Logout</li>
                    </ul>
                </div>
            </div>

        {openModalWebHook &&   
        <Modal title="WEB-HOOK" setOpenModal={setOpenModalWebHook}>
           <h3 className='fw-bold'> {`${process.env.REACT_APP_API_URL}/api/webhooks/${localStorage.getItem("_id")}`}</h3>
            </Modal>}
        </div>
    )
}
