import React from 'react'
import "./ToggleSwhich.scss";
export const ToggleSwhich = (props) => {
  return (
    <div className='toggle__swhich__wrap'>
        <input {...props} type="checkbox" id="toggle" />
        <label htmlFor="toggle" className='switch'></label>
    </div>
  )
}
