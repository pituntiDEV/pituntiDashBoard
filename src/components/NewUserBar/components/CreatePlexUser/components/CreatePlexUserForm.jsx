import React, { useState } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi'
import { BtnPrimary } from '../../../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../Buttons/BtnSucess/BtnSecondary'
import { WhatsappIcon } from '../../../../icons/WhatsappIcon'
import SWAlert from '../../../../SwAlert/SWAlert'
import { ShowLibs } from './ShowLibs';
import "./createNewUserForm.scss";

const lettersMin = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const lettersMay = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const CreatePlexUserForm = ({ setOpenModal, setNewUserState }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        credits: 1,
        servers: [],
        connections: 1,
        whatsapp: null
    })

    const [myServers, setMyServers] = useState([])

    // request to add user
    const [createUser, loading] = useFetchApi({
        url: `/api/plex/user/create`,
        method: 'POST',
    })

    const onCHangeInputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validatePassword = (password) => {
        var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Verificar si la contraseña cumple con los requisitos
        if (regex.test(password)) {
            return true
        } else {
           return false
        }
    }
    const submit = (e) => {
        e.preventDefault();
        const isValidPassword=validatePassword(formData.password);
        if(!isValidPassword){
           SWAlert.error({
            title: 'Invalid Password',
            text:"Agrega una contraseña valida de minimo 8 caracteres incluyendo letras y numeros"
           })
            return
        }
        createUser({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Agregado"
                })
                setOpenModal(false);
                setNewUserState(s => !s);
            })
            .catch((error) => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })

    }

    const generarEmail = () => {


        let email = ''
        for (let i = 0; i < 2; i++) {

            email += lettersMin[Math.floor(Math.random() * 26)];
            email += lettersMin[Math.floor(Math.random() * 26)];
            email += lettersMay[Math.floor(Math.random() * 26)];
            email += lettersMay[Math.floor(Math.random() * 26)];
            email += numbers[Math.floor(Math.random() * 10)];
        }
        email += "@"
        setFormData({ ...formData, email: email })
    }

    const generarPassword = () => {


        let password = ''
        for (let i = 0; i < 2; i++) {

            password += lettersMin[Math.floor(Math.random() * 26)];
            password += lettersMin[Math.floor(Math.random() * 26)];
            password += lettersMay[Math.floor(Math.random() * 26)];
            password += lettersMay[Math.floor(Math.random() * 26)];
            password += numbers[Math.floor(Math.random() * 10)];
        }
        setFormData({ ...formData, password: password })
    }
    return (
        <form onSubmit={submit} className="create__user__form">
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
                <label htmlFor="whatsapp"><WhatsappIcon /> Whatsapp:</label>
                <input type="tel" onChange={onCHangeInputHandler} value={formData.whatsapp} name="whatsapp" id="whatsapp" />
            </div>

            <div className="form__group">
                <label htmlFor="password">Password:{formData.password}</label>
                <input type="password" onChange={onCHangeInputHandler} minLength={8} value={formData.password} required name="password" id="password" />

                <button className='btn btn-warning' type='button' onClick={generarPassword}>Generar Password</button>
            </div>

            <div className="deleteForm">
                <h2>Opciones</h2>
                <div className="options">
                    <div className="delete option">
                        <label htmlFor="">Eliminar usuarios despues de vencido en (dias)</label>
                        <input type="number" onChange={onCHangeInputHandler} name="deleteDays" placeholder='Dejar en blaco para no eliminar' />
                    </div>
                    <div className="deleteLibs option">
                        <label htmlFor="">Quitar librerias despues de vencido (dias)</label>
                        <input type="number" onChange={onCHangeInputHandler} name="removeLibsDays" placeholder='Dejar en blaco para no quitar librerias' />
                    </div>
                </div>
            </div>

            <div className="deleteForm">
                <div className="options">
                    <div className="option">
                        <label htmlFor="connections">Conexiones:</label>
                        <input type="number" min={1} onChange={onCHangeInputHandler} value={formData.connections} required name="connections" id="connections" />
                    </div>
                    <div className="option">
                        <label htmlFor="credits">Mes:</label>
                        <input type="number" min={1} onChange={onCHangeInputHandler} value={formData.credits} required name="credits" id="credits" />
                    </div>
                </div>
            </div>






            <ShowLibs myServers={myServers} setMyServers={setMyServers} onChange={onCHangeInputHandler} setFormData={setFormData} formData={formData} />

            <div className='d-flex gap-4'>
                <BtnPrimary title="Crear usuario" />
                <BtnSecondary onClick={() => setOpenModal(false)} title="Cancelar" />
            </div>
        </form>
    )
}
