import React from 'react'
import { useContext } from 'react'
import { Context } from '../../../EmbyUsersContext'
import { useState } from 'react';
import form from "./formInputs"
import { ServersAndPackagesSelector } from '../../../../components/ServersAndPackagesSelector/ServersAndPackagesSelector';
import SWAlert from '../../../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../../../hook/useFetchApi';
import { CreditsAndConnections } from '../../../../components/CreditsAndConnections/CreditsAndConnections';
import { appContext } from '../../../../../../context/AppContext';
import { useTakeOffEmbyCredits } from '../../../../../../hook/emby/useTakeOffEmbyCredits';
export const CreateEmbyUserForm = ({ setOpenModal }) => {
    //Context
    const { users, setUsers } = useContext(Context);
    const { emby } = useContext(appContext)

    //State
    const [formData, setFormData] = useState({
        name: "",
        credits: null,
        account: null,
        packages: [],
        tv: false
    })

    //Custom hooks
    const [addUser, loading] = useFetchApi({
        url: `/api/emby/users/local`,
        method: "POST"
    })

    const [takeOffCredits] = useTakeOffEmbyCredits();
    //Functions
    const onChangeInputsHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        try {
            e.preventDefault();
            if (formData.packages.length < 1) throw new Error("Selecciona minimo un paquete");
            const data = await addUser({ body: JSON.stringify(formData) });
            setUsers([...users, data]);
            SWAlert.alert({
                title: "Success"
            })

            takeOffCredits({ connections: formData.connections, admin: formData.adminID, credits: formData.credits }); //take off credit
            setOpenModal(false);
        } catch (error) {
            SWAlert.error({
                title: error.message
            })
        }
    }

    return (
        <form onSubmit={submit}>
            {
                form.inputs.map(form => {
                    return (
                        <div key={form.name} className='form__group'>
                            <label htmlFor={form.name}>{form.label}:</label>
                            <input min={form.min} onChange={onChangeInputsHandler} required={form.required} name={form.name} id={form.name} type={form.type || "text"} />
                        </div>
                    )
                })
            }

            <ServersAndPackagesSelector setFormData={setFormData} formData={formData} />

            <div className="form__group">
                <label htmlFor="tv"><input type="checkbox" onChange={(e) => {
                    setFormData({ ...formData, tv: e.target.checked })
                }} name="tv" id="tv" /> TV?</label>
            </div>
            {
                formData.admin && form.inputsAdmins.map(form => {
                    return (
                        <div key={form.name} className='form__group'>
                            <label htmlFor={form.name}>{form.label} ({form.name}):</label>
                            <input min={form.min} onChange={onChangeInputsHandler} required={form.required} name={form.name} id={form.name} type={form.type || "text"} />
                            {form.small &&
                                <small className='text-mute'>{form.small}</small>}
                        </div>
                    )
                })
            }

            <CreditsAndConnections setFormData={setFormData} formData={formData} />


            <div className="d-flex gap-3">
                <button>Agregar</button>
            </div>
        </form>
    )
}
