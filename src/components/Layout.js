import "./Layout.scss";

import React from 'react'
import { Aside } from "./Aside/Aside";
import { Header } from "./Header/Header";

export const Layout = ({children}) => {
  return (
    <div className="Layout">
       <header>
         <Header/>
        </header>
       <aside><Aside/></aside>
         <main>{children}</main>
         <footer></footer>

    </div>
  )
}
