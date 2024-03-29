import React from 'react'
import { useState } from 'react';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import "./NewEmbyAccountForm.scss";
export const NewEmbyAccountForm = ({ setOpenModal, type, setNewAccountState }) => {

    //State
    const [formData, setFormData] = useState({
        ip: "",
        port: "8096",
        apiKey: "",
        name: ""
    })

    //Custom Hooks
    const [addAccount, loading] = useFetchApi({
        url: `/api/${type ? "jellyfin" : "emby"}/accounts`,
        method: "POST",
    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();
        addAccount({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Success"
                })
                setOpenModal(false)
                setNewAccountState(s => !s);
            })
            .catch(error => {
                console.log(error);

            })

    }
    return (
        <form onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="ip">Nombre del servidor</label>
                <input onChange={onChange} type="text" name="name" value={formData.name} required placeholder='Escriba el nombre del servidor' id="name" />
            </div>
            <div className="form__group">
                <label htmlFor="ip">Direccion ip</label>
                {/* pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$" */}
                <input onChange={onChange} type="text" name="ip" value={formData.ip} required placeholder='Ejem:http://53.123.34.54' id="ip" />
            </div>

            <div className="form__group">
                <label htmlFor="port">Puerto </label>
                <input onChange={onChange} type="number" name="port" placeholder='Ingresa puerto del servidor de emby' value={formData.port} id="port" />
            </div>

            <div className="form__group">
                <label htmlFor="claveAPI">Clave API</label>
                <input onChange={onChange} type="text" value={formData.claveAPI} required name="apiKey" placeholder='Ingresa Clave API' id="claveAPI" />
            </div>


            <button className="btn btn-primary">Agregar</button>
        </form>
    )
}
