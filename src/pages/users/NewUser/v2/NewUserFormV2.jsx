import React from 'react'
import { useState } from 'react'
import { PlexServersAndPackages } from '../../PlexServersAndPackages/PlexServersAndPackages';
import { PlexOptions } from '../../PlexOptions/PlexOptions';
import useFetchApi from '../../../../hook/useFetchApi';
import SWAlert from '../../../../components/SwAlert/SWAlert';

import { useTakeOffPlexCredits } from '../../../../hook/plex/useTakeOffPlexCredits';
import { useContext } from 'react';
import { Context } from '../../PlexUsersContext';
import useSocketIO from '../../../../hook/useSocketIO';
import { useEffect } from 'react';
import Modal from '../../../../components/modal/Modal';
import { BtnLoading } from '../../../../components/Buttons/BtnLoading/BtnLoading';

export const NewUserFormV2 = ({ setOpenModal }) => {

    const [modalInFo, setModalInfo] = useState(false)
    //Constex
    const { users, setUsers } = useContext(Context);
    const [notifyMessage, setNotifyMessage] = useState([]);

    //State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        credits: 1,
        servers: [],
        connections: 1,
        whatsapp: null,
        comments: "",
        deleteDays: "",
        removeLibsDays: ""
    });

    const [inviteUser, loading] = useFetchApi({
        url: `/api/plex/v2/users/invite`,
        method: 'POST',
    })
    //Hooks
    const [takeOffCredits] = useTakeOffPlexCredits();
    const [io, isConnected] = useSocketIO();

    useEffect(() => {
        if (io) {
            io.on("notify", (message) => {

                SWAlert.alert({ title: message.message })

            })
        }
    }, [io])



    //Functions
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setNotifyMessage([]);
        setModalInfo(true)
        inviteUser({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: "Agregado"
                })
                setUsers([data, ...users]);
                takeOffCredits(data.totalCredits);
                setOpenModal(false)
            })
            .catch(error => {
                // SWAlert.error({
                //     title: error.message
                // })
            })


    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form__group">

                <label htmlFor="name">Nombre:</label>
                <input required minLength={5} onChange={onChange} type="text" name="name" id="" />
            </div>

            <div className="form__group">
                <label htmlFor="email">Email:</label>
                <input required onChange={onChange} type="email" name="email" id="" />
            </div>

            <PlexServersAndPackages formData={formData} setFormData={setFormData} />
            <PlexOptions setFormData={setFormData} formData={formData} onChange={onChange} />


            <div className="d-flex gap-3">
                {loading ? <BtnLoading /> : <button className='btn btn-primary'>Invitar</button>}
                <button onClick={() => setOpenModal(false)} type='buttton' className='btn btn-secondary'>Cancel</button>
            </div>

            {notifyMessage.map(alert => {
                return <div key={alert.message} className={`alert alert-${alert.type}`}>{alert.message}</div>
            })}





        </form>
    )
}
