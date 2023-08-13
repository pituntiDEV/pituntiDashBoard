import React, { useState } from 'react'
import { useGetPackagesByServer } from '../../../../hook/useGetPackagesByServer'
import { useEffect } from 'react'
import { useContext } from 'react'
import { appContext } from '../../../../context/AppContext'
import "./NewPublicDesmosForm.scss"
import useFetchApi from '../../../../hook/useFetchApi'
import { Context } from '../PublicDemosContext'
import SWAlert from '../../../../components/SwAlert/SWAlert'

export const NewPublicDesmosForm = ({ setOpenModal }) => {
    const { setPublicDemos, publicDemos } = useContext(Context);


    //State
    const [packagesDB, setPackagesDB] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        maxDemos: 1,
        maxDemosByUser: 1,
        publicDemoDuration: 1,
        publicDemoDurationFormat: "minutes",
        demoDuration: 1,
        demoDurationFormat: "minutes",
        server: null,
        packages: [],
        message: ""

    })


    //Hook
    const [getPackagesByServer] = useGetPackagesByServer(formData.server);
    const [createPublicDemos, loading] = useFetchApi({
        url: `/api/plex/public/demos`,
        method: "POST"
    })

    //Constext
    const { plex } = useContext(appContext);
    const { servers } = plex;

    //Effects
    useEffect(() => {
        if (!formData.server) return;
        getPackagesByServer()
            .then(data => setPackagesDB(data))
    }, [formData.server])

    //Function
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const submit = (e) => {
        e.preventDefault();
        if (formData.packages.length == 0) {
            SWAlert.error({ title: "Selecciona mínimo un paquete" });
            return;
        };
        createPublicDemos({ body: JSON.stringify(formData) })
            .then(data => {
                setPublicDemos([...publicDemos, data]);
                setOpenModal(false);
                SWAlert.alert({ title: "Created" })
            })

    }

    const onChangePackages = (pack) => {

        const existe = formData.packages.findIndex(p => p == pack._id);
        if (existe > -1) {
            const packagesUpdated = formData.packages.filter(p => p != pack._id);
            setFormData({ ...formData, packages: packagesUpdated })
        } else {
            const packagesUpdated = [...formData.packages];
            packagesUpdated.push(pack._id);
            setFormData({ ...formData, packages: packagesUpdated })
        }

    }
    return (
        <form className='NewPublicDesmosForm' onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="name">Nombre</label>
                <input type="text" required minLength={3} name="name" onChange={onChange} id="" />
            </div>

            <div className="form__group">
                <label htmlFor="name">Mensaje</label>
                <input type="text" required minLength={5} name="message" onChange={onChange} id="" />
                <small className='text-muted'>Mensaje que vera el usuario al usar tu demo publico</small>
            </div>
            <div className="form__group">
                <label htmlFor="name">Máximo demos</label>
                <input type="number" min={1} required name="maxDemos" onChange={onChange} id="" />
                <small className='text-muted'>Total de demos a ofrecer </small>
            </div>
            <hr />

            <div className="form__group">
                <label htmlFor="maxDemosByUser">Máximo demos por usuario</label>
                <input type="number" min={1} required name="maxDemosByUser" onChange={onChange} id="" />
                <small className='text-muted'>Total de demos que puede solicitar un usuario se verificara por IP </small>
            </div>
            <hr />

            <div className="form__group">
                <label htmlFor="name">Duración de este Demo Publico</label>
                <input type="number" min={1} onChange={onChange} required name="publicDemoDuration" id="" />
                <select onChange={onChange} name="publicDemoDurationFormat" id="" defaultValue={"minutes"}>
                    <option value="minutes">Minuto</option>
                    <option value="hours">Hora</option>
                </select>
                <small className='text-muted'>Tiempo en que este demo publico se mantendrá activo.</small>
            </div>
            <hr />
            <div className="form__group">
                <label htmlFor="name">Duración del demo</label>
                <input type="number" min={1} onChange={onChange} required name="demoDuration" id="" />
                <select onChange={onChange} name="demoDurationFormat" id="" defaultValue={"minutes"}>
                    <option value="minutes">Minuto</option>
                    <option value="hours">Hora</option>
                </select>
                <small className='text-muted'>Tiempo que durara el demo entregado</small>
            </div>

            <div className="form__group">
                <label htmlFor="server">Servidor</label>
                <select required defaultValue={""} name='server' onChange={onChange}>
                    <option value="" disabled>Seleccione un server</option>
                    {
                        servers.map(server => {
                            return <option key={server._id} value={server._id}>{server.data.name}</option>
                        })
                    }
                </select>
                <small className='text-muted'>Numero que máximo de demos que puede tomar un usuario</small>
            </div>

            <div className="packages_container">
                <h3>Paquetes:</h3>
                <div className="packages">
                    {packagesDB.map(pk => {
                        const existe = formData.packages.find(p => p == pk._id);
                        return (
                            <div onClick={() => onChangePackages(pk)} className={`pack ${existe && "selected"}`} key={pk._id}>{pk.name}</div>
                        )
                    })}
                </div>

            </div>


            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Agregar</button>
                <button onClick={() => setOpenModal(false)} type='button' className='btn btn-secondary'>Cancelar</button>
            </div>

        </form>
    )
}
