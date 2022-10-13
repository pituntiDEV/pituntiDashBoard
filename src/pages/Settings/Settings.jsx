import React from 'react'
import { Header } from '../../components/Header/Header'
import "./SettingsLayout.scss"
export const Settings = () => {
  return (
    <div className='settings'>
      <header className='settings-header'><Header/></header>
      <aside >
        <ul>
          <li>General</li>
          <li>Servers</li>
        </ul>
      </aside>
      <main>main</main>
      <footer>footer</footer>
    </div>
  )
}
