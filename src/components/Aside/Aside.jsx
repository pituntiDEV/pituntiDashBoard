import React from 'react'
import { Link } from 'react-router-dom';
import "./Aside.scss"
import { DropDown } from '../DropDown/DropDown';
const menuToggle = () => {
    const menu = document.querySelector('aside');

    menu.classList.toggle('active');
}

const dropdownToggle = (e) => {
    const AllActives = document.querySelectorAll(".show-dropdown");
    const dropdown = e.currentTarget;
    if (dropdown.classList.contains('show-dropdown')) {
        dropdown.classList.remove("show-dropdown");
        return;
    }

    AllActives.forEach(el => {
        el.classList.remove("show-dropdown");
    })

    dropdown.classList.add("show-dropdown")

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


                {/* PLEX */}
                <li onClick={dropdownToggle} className="menu-drop">
                    <div className="title">
                        <div className="icon">
                            <img src="/assets/img/plex_logo.webp" alt="" />
                        </div>
                        <span>Plex</span>
                    </div>
                    <ul>
                        <li className="menu-item">
                            <i className="fa-solid fa-users"></i>
                            <a href="/users">Plex Users</a>
                        </li>

                        <li className="menu-item">
                            <i className="fa-solid fa-code"></i>
                            <a href="/byCode">Act.Por codigo</a>
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
                            <i className="fa-solid fa-earth-americas"></i>
                            <a href="/public/demos">Public Demos</a>
                            <span className='new-info'>new</span>
                        </li>
                    </ul>
                </li>
                {/* Emby */}
                <li className="menu-drop" onClick={dropdownToggle}>
                    <div className="title">
                        <div className="icon">
                            <img src="/assets/img/embyLogo.png" alt="" />
                        </div>
                        <span>Emby (BETA)</span>
                    </div>
                    <ul>
                        <li className="menu-item">
                            <i className="fa-solid fa-users"></i>
                            <a href="/users/emby">Emby Users</a>
                        </li>

                        <li className="menu-item">
                            <i className="fa-solid fa-cube"></i>
                            <a href="/packages/emby">Paquetes Emby</a>
                        </li>

                        <li className="menu-item">
                            <i className="fa-solid fa-ticket"></i>
                            <a href="/demos/emby">Demos</a>
                        </li>

                        <li className="menu-item">
                            <i className="fa-solid fa-cash-register"></i>
                            <a href="/resellers/emby">Resellers (BETA)</a>
                        </li>
                    </ul>
                </li>

                {/* Jellyfin */}
                <li className="menu-drop" onClick={dropdownToggle}>
                    <div className="title">
                        <div className="icon">
                            <img src="/assets/img/jellyfinLogo.png" alt="" />
                        </div>
                        <span>Jellyfin (BETA)</span>
                    </div>
                    <ul>
                        <li className="menu-item">
                            <i className="fa-solid fa-users"></i>
                            <a href="/users/jellyfin">Jellyfin Users</a>
                        </li>

                        <li className="menu-item">
                            <i className="fa-solid fa-cube"></i>
                            <a href="/packages/jellyfin">Paquetes Jellyfin</a>
                        </li>

                        <li className="menu-item">
                            <i className="fa-solid fa-ticket"></i>
                            <a href="/demos/jellyfin">Demos</a>
                        </li>

                        <li className="menu-item">
                            <i className="fa-solid fa-cash-register"></i>
                            <a href="/resellers/jellyfin">Resellers (BETA)</a>
                        </li>
                    </ul>
                </li>

                <li className="menu-item">
                    <i className="fa-solid fa-file-invoice"></i>
                    <a href="/accounts">Accounts</a>
                </li>


                <li className="menu-item">
                    <i className="fa-brands fa-google-drive"></i>
                    <a href="/gdrive">Google Drive</a>
                </li>


                <li className="menu-drop" onClick={dropdownToggle}>
                    <div className="title">
                        <div className="icon">
                            <i className="fa-solid fa-screwdriver-wrench"></i>
                        </div>
                        <span>Config</span>
                    </div>
                    <ul>
                        <li className="menu-item">
                            <i className="fa-brands fa-telegram"></i>
                            <a href="/telegram">Telegram</a>
                        </li>
                    </ul>

                </li>

            </ul>

        </div>
    )
}
