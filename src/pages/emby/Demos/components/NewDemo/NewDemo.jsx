import React from 'react'
import { useState } from 'react'

import Modal from '../../../../../components/modal/Modal';
import { NewDemoForm } from '../NewDemoForm';

export const NewDemo = (props) => {
    //States
    const [openModal, setOpenModal] = useState(false);


    return (
        <>
            <button onClick={() => setOpenModal(true)}>New Demo EmbyConnect</button>
            {openModal &&
                <Modal title="New Demo EmbyConnect" setOpenModal={setOpenModal}>
                    <NewDemoForm {...props} setOpenModal={setOpenModal} />

                </Modal>}

        </>
    )
}