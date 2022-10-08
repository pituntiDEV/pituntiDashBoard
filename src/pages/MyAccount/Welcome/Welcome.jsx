import React from 'react'
import { SearchIcon } from '../../../components/icons/SearchIcon';
import "./Welcome.scss";
export const Welcome = () => {
  return (
    <div className='welcome'>
        <div className="login">
            <div className="email-form">
                <input type="email"  placeholder='Ingresa tu email'/>
                <SearchIcon/>
            </div>
        </div>
    </div>
  )
}
