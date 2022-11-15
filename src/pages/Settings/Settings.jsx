import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Profile } from './components/Profile/Profile'
import "./SettingsLayout.scss"
export const Settings = () => {
  const components={
    "profile":<Profile/>
  }
  const [pageName,setPageName] = useState("profile")
  return (
    <div className='settings'>
      <div className='menu' >
        <h2 className='text-center text-white fw-bold'>Config</h2>
        <ul>
          <li onClick={()=>{setPageName("profile")}} className={`${pageName=="profile" && "active"}`}>Perfil</li>
          <li onClick={()=>{setPageName("general")}} className={`${pageName=="general" && "active"}`}>General</li>
          {/* <li onClick={()=>{setPageName("plex")}}  className={`${pageName=="plex" && "active"}`}>PLEX</li> */}
          <Link to={"/"}><li>Home</li></Link>
        </ul>
      </div>
      <main className='container'>
        {
          components[pageName]
        }
      </main>
      {/* <footer>footer</footer> */}
    </div>
  )
}
