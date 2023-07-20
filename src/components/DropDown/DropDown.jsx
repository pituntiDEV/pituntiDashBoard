import React, { useEffect, useRef } from 'react'
import "./DropDown.scss";
export const DropDown = ({ children, icon, title = "Title", className = "btn btn-secondary" } = {}) => {
    const dropdownContent = useRef(null);
    const arrow = useRef(null);


    return (
        <div className='dropdown__element'>

            <button type='button' className={`dropdown__button ${className}`} onClick={() => {
                dropdownContent.current.classList.toggle("show");
                arrow.current.classList.toggle("open")
            }}><i ref={arrow} className="fas fa-chevron-down"></i > {icon} <span>{title}</span></button>
            <div ref={dropdownContent} className='dropdown__content'>
                {children}
            </div>
        </div>
    )
}
