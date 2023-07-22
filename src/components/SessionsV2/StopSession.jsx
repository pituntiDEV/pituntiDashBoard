import React from 'react'
import { CloseIcon } from '../icons/CloseIcon'
import { useState } from 'react'
import Modal from '../modal/Modal';
import "./StopSession.scss";
import SWAlert from '../SwAlert/SWAlert';
import useFetchApi from '../../hook/useFetchApi';
export const StopSession = ({ server, session }) => {
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState("");

    const sessionID = session?.Session?.id;
    const serverID = server?._id;
    const [stopSessionApi, loading] = useFetchApi({
        url: `/api/plex/sessions/${sessionID}?server=${serverID}&message=${message}`,
        method: "DELETE"
    })


    const stop = () => {
        stopSessionApi({ message, server: serverID, session: sessionID })
        setOpenModal(false);
        SWAlert.alert({
            title: "Deteniendo espere 15 segundos"
        })
    }
    return (
        <>
            <div onClick={() => setOpenModal(true)} className="btn-close-session">
                <CloseIcon />
            </div>

            {
                openModal &&
                <Modal setOpenModal={setOpenModal} title="Cerrar sesion">
                    <div className="stop_message_session_message">
                        <textarea onChange={(e) => setMessage(e.target.value)} value={message} className='text' />
                    </div>

                    <button onClick={() => stop()} className='btn btn-danger'>Si,Detener</button>

                </Modal>
            }
        </>
    )
}
