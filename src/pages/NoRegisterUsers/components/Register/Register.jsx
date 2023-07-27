import React from 'react'
import Modal from '../../../../components/modal/Modal'
import { useState } from 'react'
import { RegisterForm } from './RegisterForm';

export const Register = ({ user }) => {
    const [openModal, setOpenModal] = useState(false);


    return (
        <div>
            <div className='user'>
                <div className="email">{user.invited.email || user.invited.username}
                </div>

                <button onClick={() => setOpenModal(true)}>Regiter</button>
            </div>

            {openModal &&
                <Modal title="Register" setOpenModal={setOpenModal}>
                    <RegisterForm setOpenModal={setOpenModal} user={user} />
                </Modal>
            }
        </div>
    )
}
