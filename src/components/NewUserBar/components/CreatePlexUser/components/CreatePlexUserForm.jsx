import React, { useContext, useState } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi'
import { BtnPrimary } from '../../../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../Buttons/BtnSucess/BtnSecondary'
import { WhatsappIcon } from '../../../../icons/WhatsappIcon'
import SWAlert from '../../../../SwAlert/SWAlert'
import "./createNewUserForm.scss";
import { appContext } from '../../../../../context/AppContext'
import { PlexServersAndPackages } from '../../../../../pages/users/PlexServersAndPackages/PlexServersAndPackages'
import { EmailGenerator } from '../../../../EmailGenerator/EmailGenerator'
import { PasswordGenerator } from '../../../../PasswordGenerator/PasswordGenerator'
import { PlexOptions } from '../../../../../pages/users/PlexOptions/PlexOptions'
import { DropDown } from '../../../../DropDown/DropDown'
import { useTakeOffPlexCredits } from '../../../../../hook/plex/useTakeOffPlexCredits'
import { Context } from '../../../../../pages/users/PlexUsersContext'


export const CreatePlexUserForm = ({ setOpenModal }) => {

    //Context
    const appContextValue = useContext(appContext);
    const { users, setUsers } = useContext(Context);
    // Hooks
    const [takeOffCredits] = useTakeOffPlexCredits();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        credits: 1,
        servers: [],
        connections: 1,
        whatsapp: null,
        comments: ""
    })



    // request to add user
    const [createUser, loading] = useFetchApi({
        url: `/api/plex/v2/users/create`,
        method: 'POST',
    })

    const onCHangeInputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validatePassword = (password) => {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])(?=.{10,}).*$/;

        // Verificar si la contraseña cumple con los requisitos
        if (regex.test(password)) {
            return true
        } else {
            return false
        }
    }
    const submit = (e) => {
        e.preventDefault();
        const isValidPassword = validatePassword(formData.password);
        if (!isValidPassword) {
            SWAlert.error({
                title: 'Invalid Password',
                text: "Agrega una contraseña valida de minimo 10 caracteres incluyendo letras minusculas y mayusculas , numeros & carateres especial: @#$%^&+="
            })
            return
        }
        createUser({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Agregado"
                })
                setOpenModal(false);
                takeOffCredits(data.totalCredits);
                setUsers([data, ...users])
                appContextValue.setState({ ...appContextValue.state, onChangeCredits: !appContextValue.state.onChangeCredits });
            })
            .catch((error) => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })

    }

    return (
        <form onSubmit={submit} className="create__user__form">

            <div className="form__group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" onChange={onCHangeInputHandler} value={formData.name} required name="name" id="name" />
            </div>

            <div className="form__group">
                <EmailGenerator setFormData={setFormData} formData={formData} />
            </div>

            <div className="form__group">
                <PasswordGenerator setFormData={setFormData} formData={formData} />
            </div>

            <PlexServersAndPackages formData={formData} setFormData={setFormData} />

            <PlexOptions setFormData={setFormData} formData={formData} onChange={onCHangeInputHandler} />



            <div className='d-flex gap-4'>
                <BtnPrimary title="Crear usuario" />
                <BtnSecondary onClick={() => setOpenModal(false)} title="Cancelar" />
            </div>
        </form>
    )
}
