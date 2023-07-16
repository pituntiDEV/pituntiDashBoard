import React from 'react'
import { useContext } from 'react'
import { Context } from '../../../EmbyUsersContext'
import { useState } from 'react';
import form from "./formInputs"
import { ServersAndPackagesSelector } from '../../../../components/ServersAndPackagesSelector/ServersAndPackagesSelector';
import SWAlert from '../../../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../../../hook/useFetchApi';
export const CreateEmbyUserForm = ({ setOpenModal }) => {
    //Context
    const { users, setUsers } = useContext(Context);

    //State
    const [formData, setFormData] = useState({
        name: "",
        credits: null,
        account: null,
        packages: []
    })

    //Custom hooks
    const [addUser, loading] = useFetchApi({
        url: `/api/emby/users/local`,
        method: "POST"
    })
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

            {
                form.inputsAdmins.map(form => {
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

            <ServersAndPackagesSelector setFormData={setFormData} formData={formData} />
            <div className="d-flex gap-3">
                <button>Agregar</button>
            </div>
        </form>
    )
}
