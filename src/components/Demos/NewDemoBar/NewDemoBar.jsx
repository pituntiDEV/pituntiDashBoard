import React, { useState } from 'react'
import Modal from '../../modal/Modal';
import { NewDemoForm } from '../NewDemoForm/NewDemoForm';
import "./NewDemoBar.scss";
export const NewDemoBar = ({setDemoState,demos}) => {
    const [openModal,setOpenModal] = useState(false);
    return (
        <div className="new_demo_bar container">
            <div className="bar">
                <span>Total: {demos.length}</span>
                <button onClick={()=>setOpenModal(true)}>New Demo</button>
            </div>

            {
                openModal &&
                <Modal title="New Demo" setOpenModal={setOpenModal}>
                    <NewDemoForm setDemoState={setDemoState} setOpenModal={setOpenModal}/>
                </Modal>
            }

        </div>
    )
}
