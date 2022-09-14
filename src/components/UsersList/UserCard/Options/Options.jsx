import React from 'react'
import { useState } from 'react';
import { BookIcon } from '../../../icons/BookIcon';
import { CoinsIcon } from '../../../icons/CoinsIcon';
import { EditSquareIcon } from '../../../icons/EditSquareIcon';
import { InfoIcon } from '../../../icons/InfoIcon';
import { RepeatIcon } from '../../../icons/RepeatIcon';
import { TrashIcon } from '../../../icons/TrashIcon';
import Modal from '../../../modal/Modal';
import { EditUser } from '../../EditUser/EditUser';
import "./Options.scss";


export const Options = ({user}) => {
    const [openModal,setOpenModal] = useState(false);
  return (
    <div className='user__options'>
        {openModal &&  <Modal title="Edit User" setOpenModal={setOpenModal}>
           <EditUser user={user}/>
        </Modal>}
        <div onClick={()=>{setOpenModal(!openModal)}} className='option'>
            <EditSquareIcon/>
        </div>
        <div className='option'>
            <CoinsIcon/>
        </div>
        <div className='option'>
            <RepeatIcon/>
        </div>
        <div className='option'>
            <InfoIcon/>
        </div>
        <div className='option'>
            <BookIcon/>
        </div>
        <div className='option'>
            <TrashIcon/>
        </div>

    </div>
  )
}
