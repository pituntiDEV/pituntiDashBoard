import React from 'react'
import { Notification } from '../notification/Notification';
import "./Header.scss"
const menuToggle = () => {
  const menu = document.querySelector('aside');
  menu.classList.toggle('active');

}
export const Header = () => {
  return (
    <div className="Header">
      <div className='brand'>
        <div onClick={menuToggle} className="btn-menu">
          <i className="fa-solid fa-bars"></i>
        </div>
          <p className="name">
              Pitunti DashBoard
          </p>
      </div>

      <div className='notifications'>
        <Notification />
      </div>
    </div>
  )
}
