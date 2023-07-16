import React, { useEffect, useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import "./styles.scss";
import { useContext } from 'react';
import { Context } from '../EmbyUsersContext';
import { ServersAndPackagesSelector } from '../../components/ServersAndPackagesSelector/ServersAndPackagesSelector';
import { CreditsAndConnections } from '../../components/CreditsAndConnections/CreditsAndConnections';

export const NewEmbyUserForm = ({ setOpenModal }) => {
    const { users, setUsers } = useContext(Context);


    // State
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        credits: 1,
        connections: 1,
        packages: [],
        account: null,
        tv: false
    });


    // Custom Hooks
    const [addUser, loading] = useFetchApi({
        url: `/api/emby/users`,
        method: "POST"
    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const submit = (e) => {

        e.preventDefault();



        if (formData.packages.length == 0) {
            SWAlert.error({
                title: "Selecciona minimo un paquete"
            })

            return
        }

        addUser({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: "Agregado con exito"
                })

                setOpenModal(false);
                setUsers([...users, data])
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal "
                })
            })
    }
    return (
        <form className='Add_Emby_User' onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="name">Name:</label>
                <input onChange={onChange} type="text" minLength={3} required name="name" id="name" />
            </div>
            <div className="form__group">
                <label htmlFor="email">email:</label>
                <input type="email" onChange={onChange} required name="userName" id="email" />
            </div>
            <ServersAndPackagesSelector setFormData={setFormData} formData={formData} />

            <CreditsAndConnections formData={formData} setFormData={setFormData} />



            <div className="form__group">
                <div className="option">
                    <div className="title">
                        Permisos de acceso
                    </div>
                    <div className="value">
                        <input type="checkbox" checked={formData.tv} onChange={(e) => setFormData({ ...formData, tv: e.target.checked })} name="EnableLiveTvAccess" id="" /> TV en Vivo
                    </div>



                </div>
            </div>





            {formData.admin &&
                <>
                    <div className="form__group">
                        <label htmlFor="daysToDeleteAfterExpired">Eliminar despues de vencido(DIAS):</label>
                        <input type="number" placeholder='Dejar en blanco para no activar' onChange={onChange} min={1} value={formData.daysToDeleteAfterExpired} name="daysToDeleteAfterExpired" id="daysToDeleteAfterExpired" />
                    </div>

                    <div className="form__group">
                        <label htmlFor="daysToRemoveLibsAfterToExpired">Quitar LIBS despues de vencido(DIAS):</label>
                        <input type="number" placeholder='Dejar en blanco para no activar' onChange={onChange} min={1} value={formData.daysToRemoveLibsAfterToExpired} name="daysToRemoveLibsAfterToExpired" id="daysToRemoveLibsAfterToExpired" />
                    </div>

                </>
            }


            <div className="buttonss">
                <BtnPrimary title="Agregar" />
            </div>
        </form>
    )
}
