import React from 'react'
import { useState } from 'react'
import Modal from '../../components/modal/Modal'
import { NewUser } from './components/NewUser/NewUser'
import { UsersList } from './components/UsersList'

export const Layout = () => {
    const [openModalToNewUser,setOpenModalToNewUser] = useState(false);
  return (
    <div className='super_user_layout'>
         <header>
            <ul>
                <li>Go Home</li>
                <li onClick={()=>setOpenModalToNewUser(true)}>New User</li>
            </ul>
         </header>

         <main>
           <UsersList/>
         </main>
         
         {openModalToNewUser && 
         <Modal title="New User" setOpenModal={setOpenModalToNewUser }>
            <NewUser/>
         </Modal>}
    </div>
  )
}
