import React, { useState } from 'react'
import "./PublicDemos.scss";
import Modal from '../../../components/modal/Modal';
import { NewPublicDesmosForm } from './components/NewPublicDesmosForm';
import { Context, PublicDemosContext } from './PublicDemosContext';
import SWAlert from '../../../components/SwAlert/SWAlert';
export const PublicDemos = () => {
    const [openModal, setOpenModal] = useState(false);
    const copyUrl = (text) => {
        const url = `${process.env.REACT_APP_LOCAL_URL}/public/demos/${text}`
        navigator.clipboard.writeText(url);
        SWAlert.alert({ title: "url copiada" })
    }
    return (
        <PublicDemosContext>
            <Context.Consumer>
                {
                    ({ publicDemos }) => (
                        <div className="PublicDemos container">
                            <div className='header'>
                                <div className="total">Total:{publicDemos.length}</div>
                                <div className="actions">
                                    <button onClick={() => setOpenModal(true)} className='btn btn-primary'>Crear demos Publicos</button>
                                </div>
                            </div>
                            <hr />


                            <div className="public_demos_list">
                                {
                                    publicDemos.map(demo => {
                                        return (
                                            <div className='demo' key={demo._id}>
                                                <div className="header">
                                                    {demo.name}
                                                </div>
                                                <div className="body text-info">
                                                    {demo.expireAt}
                                                </div>
                                                <div className="actions">
                                                    <i onClick={() => copyUrl(demo._id)} className="fa-solid fa-earth-americas"></i>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {openModal &&
                                <Modal title="New Public Demo" setOpenModal={setOpenModal}>
                                    <NewPublicDesmosForm setOpenModal={setOpenModal} />
                                </Modal>}

                        </div>

                    )
                }
            </Context.Consumer>


        </PublicDemosContext>
    )
}
