import React from 'react'
import Modal from '../modal/Modal'
import { ImgToVideoForm } from './ImgToVideoForm'
import { useState } from 'react'
import "./ImgToVideo.scss";
export const ImgToVideo = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className='img-to-video'>
            <div className="icon">
                <span>new</span>
                <i className="fa-solid fa-clapperboard" onClick={() => setOpenModal(true)}></i>

            </div>
            {openModal &&
                <Modal setOpenModal={setOpenModal} title='Video Creator'>
                    <ImgToVideoForm />
                </Modal>}
        </div>
    )
}
