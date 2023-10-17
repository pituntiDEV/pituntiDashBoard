import React, { useState } from 'react'
import { CreateEmbyUser } from '../../../users/components/Header/createEmbyUser/CreateEmbyUser'
import Modal from '../../../../../components/modal/Modal'
import { CreateDemoForm } from './CreateDemoForm'

export const CreateDemo = () => {
    const [openModal, setOpenModal] = useState(false)
    return (

        <>

            <button className='btn btn-info' onClick={() => setOpenModal(true)}>Create Demo</button>
            {
                openModal &&
                <Modal title='Create Demo' setOpenModal={setOpenModal}>
                    <CreateDemoForm setOpenModal={setOpenModal} />
                </Modal>
            }
        </>

    )
}
