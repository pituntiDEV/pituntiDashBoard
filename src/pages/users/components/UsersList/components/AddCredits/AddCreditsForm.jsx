import React, { useContext } from 'react'
import { CreditsAndConnections } from '../../../../CreditsAndConnections/CreditsAndConnections';
import "./AddCreditsForm.scss";
import { useState } from 'react';
import useFetchApi from '../../../../../../hook/useFetchApi';
import { Context } from '../../../../PlexUsersContext';
import SWAlert from '../../../../../../components/SwAlert/SWAlert';
import { useTakeOffPlexCredits } from '../../../../../../hook/plex/useTakeOffPlexCredits';
export const AddCreditsForm = ({ user, setOpenModal }) => {

    const isAdmin = localStorage.getItem("_id") == user.admin._id;
    //Contex
    const { users, setUsers } = useContext(Context);
    //State
    const [formData, setFormData] = useState({
        connections: user.connections,
        credits: 0,
        admin: user.admin._id
    })
    //Hooks
    const [takeOffCredits] = useTakeOffPlexCredits();
    const [addCredits] = useFetchApi({
        url: `/api/plex/v2/users/credits/${user._id}`,
        method: "POST"
    })

    //Functions
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();
        addCredits({ body: JSON.stringify(formData) })
            .then(data => {
                const index = users.findIndex(u => u._id == user._id);
                const usersUpdated = [...users];
                usersUpdated[index] = data;
                setUsers(usersUpdated);
                setOpenModal(false);
                takeOffCredits(data.totalCredits);
                SWAlert.alert({
                    title: "Success"
                })
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal",
                    text: error.info
                })
            })


    }
    return (
        <form onSubmit={submit} className='AddPlexCreditsForm'>
            {isAdmin ? <>
                <div className="options">
                    <div className="option">
                        <label htmlFor="connections">Conexiones:</label>
                        <input type="number" min={1} onChange={onChange} value={formData.connections} required name="connections" id="connections" />
                    </div>
                    <div className="option">
                        <label htmlFor="credits">Mes:</label>
                        <input type="number" min={1} onChange={onChange} value={formData.credits} required name="credits" id="credits" />
                    </div>
                </div>
            </> :
                <CreditsAndConnections setFormData={setFormData} formData={formData} servers={formData.servers} />
            }

            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Agregar</button>
            </div>
        </form>
    )
}
