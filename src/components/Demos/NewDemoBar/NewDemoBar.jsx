import React, { useState } from 'react'
import { CreateDemoAccount } from '../../../pages/Demos/components/CreateDemoAccount/CreateDemoAccount';
import Modal from '../../modal/Modal';
import { NewDemoForm } from '../NewDemoForm/NewDemoForm';
import "./NewDemoBar.scss";
export const NewDemoBar = ({setDemoState,demos}) => {
    const [openModal,setOpenModal] = useState(false);
    return (
        <div className="new_demo_bar container">
            <div className="bar">
                <span>Total: {demos.length}</span>
               <div className="d-flex gap-3">
                <CreateDemoAccount setDemoState={setDemoState}/>
                <button onClick={()=>setOpenModal(true)}>Add Demo</button>
               </div>
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
