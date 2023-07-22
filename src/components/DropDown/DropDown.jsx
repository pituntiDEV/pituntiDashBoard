import React, { useEffect, useRef } from 'react'
import "./DropDown.scss";
export const DropDown = ({ children, icon, title = "Title", className = "bg-primary" } = {}) => {
    const dropdownContent = useRef(null);
    const arrow = useRef(null);

    const toggle = () => {
        dropdownContent.current.classList.toggle("show");
        arrow.current.classList.toggle("open");
    }
    return (
        <div className='dropdown__element'>

            <button type='button' className={`dropdown__button ${className}`} onClick={toggle}><i ref={arrow} className="fas fa-chevron-down"></i > {icon} <span>{title}</span></button>
            <div ref={dropdownContent} className='dropdown__content'>
                {children}
            </div>
        </div>
    )
}
