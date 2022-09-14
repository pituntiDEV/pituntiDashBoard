import React from 'react'
import style from "./Aside.module.scss"
export const Aside2 = () => {
    return (
        <nav className={style.nav}>
            <ul>
                <li>
                    <a href="#">
                        <i className="fas fa-home"></i>

                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-utensils"></i>

                        <span>
                            <div className="menu">
                                <div className="menu-header">
                                    <div>
                                        <div className={style.menu}>
                                            <div className={style.arrow}></div>
                                            <div className={style.menu_header}>
                                                <p>
                                                    <i className="fa-solid fa-lines-leaning"></i>   Food Menu
                                                </p>
                                            </div>
                                            <div className={style.menu_body}>
                                                <p> <i className="fa-solid fa-utensils"></i> Village</p>
                                                <p>  <i className="fa-solid fa-utensils"></i> South</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-cog"></i>
                        <span>
                            <div className={style.menu}>
                                <div className={style.arrow}></div>
                                <div className={style.menu_header}>
                                    <div>
                                        <i className="fa-solid fa-lines-leaning"></i>   Config
                                    </div>
                                </div>
                                <div className={style.menu_body}>
                                    <p>Server</p>
                                </div>

                            </div>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </li>




            </ul>
        </nav>
    )
}
