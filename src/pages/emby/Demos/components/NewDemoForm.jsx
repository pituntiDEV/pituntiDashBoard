import React, { useContext } from 'react'
import { Form } from '../../../../components/Form/Form'
import { useState } from 'react';
import { useGetEmbyAccounts } from '../../../../hook/emby/useGetEmbyAccounts';
import { useGetPackagesByAccount } from '../../../../hook/emby/useGetPackagesByAccount';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import { Context } from '../DemosContext';
import { useGetEmbySharedServers } from '../../../../hook/emby/useGetEmbySharedServers';
import { ServersAndPackagesSelector } from '../../components/ServersAndPackagesSelector/ServersAndPackagesSelector';



export const NewDemoForm = ({ setOpenModal }) => {
    const { demos, setDemos } = useContext(Context);
    const [isSharing, setIsSharing] = useState(undefined);
    //States
    const [sharedPackages, setSharedPackages] = useState([])
    const [formData, setFormData] = useState({
        packages: [],
        account: null,
        name: "",
        email: "",
        duration: null
    });

    //Custom Hooks
    const [sharedServers, loadingSharedServers] = useGetEmbySharedServers();
    const [accounts] = useGetEmbyAccounts();
    const [packages, setPackages, loading] = useGetPackagesByAccount(formData.account);
    const [addDemo, loadingAddDemo] = useFetchApi({
        url: `/api/emby/demos`,
        method: "POST",
    })

    //Funtions
    const onChangePackages = (pack) => {
        const existe = formData.packages.find(pk => pk._id === pack._id);
        if (!existe) {
            const packagesUpdated = [...formData.packages, pack];
            setFormData({ ...formData, packages: packagesUpdated })
        } else {
            const packagesUpdated = formData.packages.filter(pk => pk._id !== pack._id);
            setFormData({ ...formData, packages: packagesUpdated })
        }
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const onChangeSelect = (e) => {

        const opcionSeleccionada = e.target.options[e.target.selectedIndex];
        const isShared = opcionSeleccionada.getAttribute("data-shared");
        if (isShared) {
            const selectedServer = sharedServers.find(s => s.server._id == e.target.value);
            if (!selectedServer) return;
            setSharedPackages(selectedServer.packages);
            setIsSharing(true);
        }
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
