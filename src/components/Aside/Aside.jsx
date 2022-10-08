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

        <ul className="menu-list">
            <li className="menu-item">
                <i className="fa-solid fa-gauge-high"></i> 
                <a href="/">Home</a>
            </li>
            <li className="menu-item">
                <i className="fa-solid fa-users"></i>
                <a href="/users">Users</a>     
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
            
        </ul>
        
    </div>
  )
}
