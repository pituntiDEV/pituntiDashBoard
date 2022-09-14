import React from 'react'
import "./Notofications.scss";
export const Notification = () => {
    return (
        <div className="notification-container">
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-message"></i>
            <div className="profile">
                <button className="initial-letter">
                    M
                </button>
                <div className="options">
                    <div className="square"></div>
                    <div className="header">
                        <div className="initial-letter">
                            M
                        </div>
                        <p className="">pi121992@gmail.com</p>
                    </div>
                    <ul>
                        <li>Profile</li>
                        <li>Setting</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
