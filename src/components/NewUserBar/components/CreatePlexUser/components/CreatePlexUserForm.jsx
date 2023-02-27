import React, { useState } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi'
import { BtnPrimary } from '../../../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../../SwAlert/SWAlert'
import { ShowLibs } from './ShowLibs'
const lettersMin = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const lettersMay = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const CreatePlexUserForm = ({ setOpenModal,setNewUserState }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        credits: 1,
        servers: [],
        connections: 1
    })

    // request to add user
    const [createUser, loading] = useFetchApi({
        url: `/api/plex/user/create`,
        method: 'POST',
    })

    const onCHangeInputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const submit = (e) => {
        e.preventDefault();
        createUser({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Agregado"
                })
                setOpenModal(false);
                setNewUserState(s=>!s);
            })
            .catch((error) => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })

    }

    const generarEmail = () => {


        let email = ''
       for(let i = 0; i < 2; i++) {
          
          email+=lettersMin[Math.floor(Math.random() * 26)];
          email+=lettersMin[Math.floor(Math.random() * 26)];
          email+=lettersMay[Math.floor(Math.random() * 26)];
          email+=lettersMay[Math.floor(Math.random() * 26)];
          email+=numbers[Math.floor(Math.random() * 10)];
        }
        email+="@"
        setFormData({...formData, email: email})
    }

    const generarPassword = () => {


        let password = ''
       for(let i = 0; i < 2; i++) {
          
          password+=lettersMin[Math.floor(Math.random() * 26)];
          password+=lettersMin[Math.floor(Math.random() * 26)];
          password+=lettersMay[Math.floor(Math.random() * 26)];
          password+=lettersMay[Math.floor(Math.random() * 26)];
          password+=numbers[Math.floor(Math.random() * 10)];
        }
        setFormData({...formData, password: password})
    }
    return (
        <form onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" onChange={onCHangeInputHandler} value={formData.name} required name="name" id="name" />
            </div>
            <div className="form__group">
                <label htmlFor="email">Email:</label>
                <input type="email" onChange={onCHangeInputHandler} value={formData.email} required name="email" id="email" />
                <button className='btn btn-warning' type='button' onClick={generarEmail}>Generar email</button>
            </div>

            <div className="form__group">
                <label htmlFor="password">Password:</label>
                <input type="password" onChange={onCHangeInputHandler} value={formData.password} required name="password" id="password" />
                {formData.password}
                <button className='btn btn-warning' type='button' onClick={generarPassword}>Generar Password</button>
            </div>


            <div className="form__group">
                <label htmlFor="connections">Conexiones:</label>
                <input type="number" min={1} onChange={onCHangeInputHandler} value={formData.connections} required name="connections" id="connections" />
            </div>

            <div className="form__group">
                <label htmlFor="credits">Mes:</label>
                <input type="number" min={1} onChange={onCHangeInputHandler} value={formData.credits} required name="credits" id="credits" />
            </div>

            <ShowLibs onChange={onCHangeInputHandler} setFormData={setFormData} formData={formData} />

            <div className='d-flex gap-4'>
                <BtnPrimary title="Crear usuario" />
                <BtnSecondary onClick={() => setOpenModal(false)} title="Cancelar" />
            </div>
        </form>
    )
}
