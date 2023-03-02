import React from 'react'
import { Link } from 'react-router-dom';
import "./Aside.scss"
const menuToggle = ()=>{
    const menu = document.querySelector('aside');

    menu.classList.toggle('active');
}
export const Aside = () => {
  return (
    <div className="menu ">
        <div onClick={menuToggle} className="btn-menu">
        <i className="fa-solid fa-xmark"></i>
        </div>
       <div className="logo">
        {/* <img src="./assets/img/tecnodev3d_logo.png" /> */}
       </div>
        <ul className="menu-list">
            <li className="menu-item">
                <i className="fa-solid fa-gauge-high"></i> 
                <a href="/">Home</a>
            </li>
            <li className="menu-item">
                <i className="fa-solid fa-users"></i>
                <a href="/users">Plex Users</a>     
            </li>
            <li className="menu-item">
                <i className="fa-solid fa-users"></i>
                <a href="/users/emby">Emby Users</a>     
            </li>
            <li className="menu-item">
            <i className="fa-solid fa-code"></i>
                <a href="/byCode">Act.Por codigo</a>     
            </li>
            <li className="menu-item">
                <i className="fa-solid fa-file-invoice"></i>
                <a href="/accounts">Accounts</a>     
            </li>
            <li className="menu-item">
                <i className="fa-solid fa-server"></i>
                <a href="/servers">Servers</a>     
            </li>
            <li className="menu-item">
                <i className="fa-solid fa-cube"></i>
                <a href="/paquetes">Mis Paquetes</a>     
            </li>
            <li className="menu-item">
                <i className="fa-solid fa-cash-register"></i>
                <a href="/Resellers">Resellers</a>     
            </li>

            <li className="menu-item">
            <i className="fa-solid fa-ticket"></i>
                <a href="/demos">Demos</a>     
            </li>
            <li className="menu-item">
            <i className="fa-brands fa-google-drive"></i>
            <a href="/gdrive">Google Drive</a>     
            </li>
            
        </ul>
        
    </div>
  )
}
