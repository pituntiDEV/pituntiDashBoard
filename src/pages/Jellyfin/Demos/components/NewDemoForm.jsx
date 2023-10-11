import React, { useContext } from 'react'
import { useState } from 'react';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import { Context } from '../DemosContext';
import { ServersAndPackagesSelector } from '../../components/ServersAndPackagesSelector/ServersAndPackagesSelector';



export const NewDemoForm = ({ setOpenModal }) => {
    const { demos, setDemos } = useContext(Context);
    const [isSharing, setIsSharing] = useState(undefined);
    //States
    const [formData, setFormData] = useState({
        packages: [],
        account: null,
        name: "",
        email: "",
        password: "",
        duration: null
    });

    //Custom Hooks
    const [addDemo, loadingAddDemo] = useFetchApi({
        url: `/api/jellyfin/demos`,
        method: "POST",
    })


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };


    //Functions
    const submit = (e) => {
        e.preventDefault();
        if (formData.packages.length == 0) {
            SWAlert.error({
                title: "Selecciona un paquete"
            });
            return
        }

        addDemo({ body: JSON.stringify(formData) })
            .then(data => {
                const newDemosState = [data.data, ...demos];
                setDemos(newDemosState);

                SWAlert.alert({
                    title: data.message
                })
                setOpenModal(false);
            })
            .catch(error => SWAlert.error({ title: error.message }));


    }
    return (
        <form onSubmit={submit} className='new__emby__demo__form'>

            <div className="form__group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" onChange={onChange} required name="name" id="" />
            </div>

            <div className="form__group">
                <label htmlFor="email">Email:</label>
                <input type="email" onChange={onChange} required name="email" id="" />
            </div>
            <div className="form__group">
                <label htmlFor="email">Password:</label>
                <input type="text" onChange={onChange} required name="password" id="" />
            </div>

            {!isSharing &&
                <div className="form__group">
                    <label htmlFor="duration">Duración (HORAS):</label>
                    <input type="number" onChange={onChange} min={1} required name="duration" id="" />
                </div>}


            <ServersAndPackagesSelector setFormData={setFormData} formData={formData} />


            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Agregar</button>
                <button type="button" className='btn btn-secondary'>Cancelar</button>
            </div>

        </form>
    )
}
