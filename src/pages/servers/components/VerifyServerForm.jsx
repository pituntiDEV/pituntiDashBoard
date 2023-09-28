import React from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import { useState } from 'react';
import { NetworkWireCheckIcon } from '../../../components/icons/NetworkWireCheckIcon';
import { Spinner } from '../../../components/Spinner/Spinner';
import Modal from '../../../components/modal/Modal';

export const VerifyServerForm = ({ server }) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState({
        error: false,
        message: ""
    });
    const [verify, loading] = useFetchApi({
        url: `/api/server/verify/${server._id}`,
        method: "GET"
    })

    const verifyServerFunction = () => {
        verify().then(data => {
            if (data == 200) {
                setError({
                    error: false,
                    message: "Server OK"
                })
            }
        })
            .catch(error => {
                console.log(error);
                if (error.message.includes("reason: connect")) {
                    setError({
                        error: true,
                        message: "No se pudo conectar con el server"
                    })
                } else {
                    setError(
                        {
                            error: true,
                            message: error.message || "Algo salio mal"
                        }
                    )
                }

            })
    }
    return (
        <>
            <NetworkWireCheckIcon onClick={() => setOpenModal(true)} />
            {
                openModal &&
                <Modal title='Check servers' setOpenModal={setOpenModal}>
                    {error.message &&
                        <div className={`alert alert-${error.error ? "danger" : "success"}`}>
                            {error.message}
                        </div>}
                    {
                        loading && <Spinner />
                    }

                    <button className='btn btn-primary' onClick={verifyServerFunction}>
                        Verificar estado del server
                    </button>
                </Modal>
            }

        </>
    )
}
