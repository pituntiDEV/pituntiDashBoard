import React, { useState } from 'react'
import Modal from '../../components/modal/Modal';
import { NewChatBotForm } from './components/NewChatBotForm/NewChatBotForm';
import "./Telegram.scss";
export const Telegram = () => {
    const [openModalToNewChatBot,setOpenModalToNewChatBot] = useState(false);
    return (
        <div className='Telegram'>
            <div className="telegram__header__container">
                <div className="telegram__header">
                    <div className="logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png" alt="" />
                    </div>
                </div>
                    <div className="options">
                        <button onClick={()=>setOpenModalToNewChatBot(true)} className='btn btn-danger text-white'>
                            Nuevo CHAT BOT
                        </button>
                    </div>
            </div>

            {openModalToNewChatBot &&
            <Modal title="Nuevo Chat Bot" setOpenModal={setOpenModalToNewChatBot}>
                <NewChatBotForm setOpenModal={setOpenModalToNewChatBot}/>
            </Modal>}

        </div>
    )
}
