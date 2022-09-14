import React from 'react'
import { CancelIcon } from '../../../icons/CancelIcon';
import { UserTieIcon } from '../../../icons/UserTieIcon';
import "./Buttons.scss";
export const Buttons = ({setOpenModal}) => {
  return (
    <div className="buttons">
        <div className="button">
            <button className='btn-add'><UserTieIcon/> Add</button>
        </div>
        <div className="button" onClick={()=>setOpenModal(false)}>
            <button type='button' className='btn-cancel'><CancelIcon/> Cancel</button>
        </div>
    </div>
  )
}
