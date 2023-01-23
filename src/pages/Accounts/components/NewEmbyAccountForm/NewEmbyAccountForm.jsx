import React from 'react'
import { useState } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';
import "./NewEmbyAccountForm.scss";
export const NewEmbyAccountForm = () => {

    //State
    const [formData,setFormData] =useState({
        ip:"",
        port:"8096",
        claveAPI:"",
        name:""
    })

    //Custom Hooks
    const [addAccount,loading] = useFetchApi({
        url:`/api/emby/account`,
        method: "POST",
    })

    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const submit=(e)=>{
        e.preventDefault();
        addAccount({body:JSON.stringify(formData)})
            .then(data=>{
                console.log(data);
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
            <input onChange={onChange} pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$" type="text" name="ip" value={formData.ip} required placeholder='Ejem:53.123.34.54' id="ip" />
        </div>

        <div className="form__group">
            <label htmlFor="port">Puerto emby</label>
            <input onChange={onChange} type="number" required name="port" placeholder='Ingresa puerto del servidor de emby' value={formData.port}  id="port" />
        </div>

        <div className="form__group">
            <label htmlFor="claveAPI">Clave API</label>
            <input onChange={onChange} type="text" value={formData.claveAPI} required name="claveAPI" placeholder='Ingresa Clave API' id="claveAPI" />
        </div>

        <button className="btn btn-primary">Agregar</button>
    </form>
  )
}
