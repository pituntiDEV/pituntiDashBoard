import React, { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import { Spinner } from '../../../../components/Spinner/Spinner';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import useGetAccountServers from '../../../../hook/useGetAccountServers';
import { useEffect } from 'react';
import "./NewChatBotForm.scss";
export const NewChatBotForm = ({ setOpenModal, bots, setBots }) => {

    //States
    const [formData, setFormData] = useState({
        name: null,
        chatId: null,
        token: null,
        notifications: false,
        servers: []
    })

    const [servers, setServers] = useState([])

    //Custom Hooks
    const [getServers, loadingServers] = useGetAccountServers();
    const [addBot, loading] = useFetchApi({
        url: `/api/telegram/createBot`,
        method: "POST"
    })

    //Effects
    useEffect(() => {
        getServers()
            .then(data => {
                setServers(data)
            })
    }, [])

    //Functions
    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onChangeServers = (server) => {
        const existe = formData.servers.find(s => s === server._id);
        if (!existe) {
            const servers = [...formData.servers, server._id];
            setFormData({ ...formData, servers });
        } else {
            const servers = formData.servers.filter(s => s !== server._id);
            setFormData({ ...formData, servers })
        }
    }
    const submit = (e) => {
        e.preventDefault();
        addBot({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Success"
                })
                setOpenModal(false);
                setBots([data.data, ...bots])
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Error"
                })
            })

    }
    return (
        <form className='NewChatBotForm' onSubmit={submit}>

            <div className="form__group">
                <label htmlFor="">Nombre:</label>
                <input onChange={onChangeHandler} minLength="3" required type="text" name="name" id="name" />
            </div>
            <div className="form__group">
                <label htmlFor="">Token:</label>
                <input onChange={onChangeHandler} minLength="10" required type="text" name="token" id="token" />
            </div>

            <div className="form__group">
                <label htmlFor="">ChatID:</label>
                <input onChange={onChangeHandler} minLength="3" required type="text" name="chatId" id="chatId" />
            </div>

            <div className="form__groups">
                <span className='fw-bold'>Servers:</span>
                <div className="servers_container">
                    {
                        servers.map(server => {
                            return (
                                <div onClick={() => onChangeServers(server)} className={`server ${formData.servers.includes(server._id) && "selected"}`} key={server._id}>
                                    {server.data.name}
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div className="form__groups">
                <input onChange={(e) => {
                    setFormData({ ...formData, notifications: e.target.checked })
                }} type="checkbox" name="chatId" id="chatId" />
                <small className='text-muted' htmlFor=""> Usar este Bot Para Notificaciones:</small>
            </div>



            {
                formData.notifications &&
                <>
                    <small className='fw-bold'>Notificarme</small>
                    <ul>
                        <li>
                            <input onChange={(e) => {
                                setFormData({ ...formData, recents: e.target.checked })
                            }} checked={formData.recents} type="checkbox" name="" id="" /> <span className='text-muted'>Agregado recientemente</span>
                        </li>

                        <li>
                            <input onChange={(e) => {
                                setFormData({ ...formData, serverOffline: e.target.checked })
                            }} checked={formData.serverOffline} type="checkbox" name="" id="" /> <span className='text-muted'>Servers caidos</span>
                        </li>
                    </ul>
                </>
            }
            {loading ? <Spinner /> :
                <div className="d-flex gap-3">
                    <BtnPrimary title="Crear" />
                    <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />
                </div>

            }
        </form>
    )
}
