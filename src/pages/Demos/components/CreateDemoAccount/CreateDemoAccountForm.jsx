import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import { CancelIcon } from '../../../../components/icons/CancelIcon';
import { CheckIcon } from '../../../../components/icons/CheckIcon';
import { PackOpenIcon } from '../../../../components/icons/PackOpenIcon';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import "./Style.scss"

export const CreateDemoAccountForm = ({ setOpenModal,setDemoState }) => {
    //State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        server: {
            server: null,
            packages: [],
        },
        expireAt: 1,
        deleteAt: 0,
        format: "hour",
        formatToDelete: "hour",
        owner: false,
        password: ""


    });
    const [myServers, setMyServers] = useState([]);
    const [sharedServers, setsharedServers] = useState([]);//Servers
    const [packages, setPackages] = useState([]); //Packages
    //Custom Hooks
    const [getMyServers, loading] = useFetchApi({
        url: "/api/server/get/all",
        method: "GET",
    })
    const [getSharedServers, loadingShared] = useFetchApi({
        url: "/api/server/get/shared",
        method: "GET",
    })

    const [getPackages, loadingPackages] = useFetchApi({
        url: "/api/package/plex/server/" + formData.server.server,
        method: "GET",
    })

    const [createDemoAccount, loadingAddDemo] = useFetchApi({
        url: "/api/demos/create",
        method: "POST",
    })



    //Effects
    useEffect(() => {
        if (formData.server.server) {
            getPackages().then(data => {
                setPackages(data);
            })
        }

    }, [formData.server.server]);

    useEffect(() => {
        getMyServers().then((servers) => {
            setMyServers(servers);
        })

        getSharedServers()
            .then(data => {
                setsharedServers(data);
            })
        return () => {
            setMyServers([]);
            setsharedServers([])
        }
    }, [])

    //Funtions

    const onChangeInputs = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const onChangeServer = (e) => {
        const { _id, owner } = JSON.parse(e.target.value);
        setFormData({
            ...formData, server: {
                server: _id,
                packages: []
            },
            owner
        })

    }

    const selectPackage = (_id) => {
        const server = formData.server;
        const existe = server.packages.includes(_id)

        if (existe) {
            server.packages = server.packages.filter(p => p != _id);
            setFormData({ ...formData, server })

        } else {
            server.packages = [...server.packages, _id]
            setFormData({ ...formData, server })
        }

    }

    const submit = (e) => {
        e.preventDefault();
        createDemoAccount({body:JSON.stringify(formData)})
        .then(data=>{
            SWAlert.alert({
                title:data.message,
            })
            setDemoState(s=>!s);
            setOpenModal(false)
        })
        .catch(error=>{
            SWAlert.error({
                title:error.message
            })
        })

    }
    return (
        <form className='create__demo__account' onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="name" className='fw-bold'>Nombre:</label>
                <input required onChange={onChangeInputs} type="text" name="name" className='form__control' id="name" />
            </div>
            <div className="form__group">
                <label htmlFor="email" className='fw-bold'>Email:</label>
                <input required onChange={onChangeInputs} type="email" name="email" className='form__control' id="email" />
            </div>

            <div className="form__group">
                <label htmlFor="password" className='fw-bold'>Password:</label>
                <input required onChange={onChangeInputs} type="password" name="password" className='form__control' id="password" />
            </div>

            <div className="form__group">
                <label htmlFor="server" className='fw-bold'>Server:</label>
                <select required onChange={onChangeServer} name="" id="server" defaultValue={""}>
                    <option value="" disabled>Select Server</option>
                    {myServers.map(server => {
                        return <option key={server._id} value={JSON.stringify({
                            owner: true,
                            _id: server._id
                        })}>{server.data.name}</option>
                    })}
                    {sharedServers.map(({ server }) => {
                        return <option key={server._id} value={JSON.stringify({
                            owner: false,
                            _id: server._id
                        })}>[shared]{server.data?.name}</option>
                    })}

                </select>
            </div>

            <div className="form-group packages_container">
                {packages.length > 0 && <h3>Packages:</h3>}
                <div className='packages_list'>
                    {packages.map(pack => {
                        const active = formData.server.packages.includes(pack._id);
                        return (
                            <div key={pack._id} onClick={() => selectPackage(pack._id)} className={`pack ${active && "active"}`}>
                                {active ? <CheckIcon /> : <CancelIcon />}
                                <span> <PackOpenIcon /> {pack.name}</span>
                            </div>
                        )
                    })}
                </div>

            </div>

            {formData.owner && <> 
            <div className='options'>
                <details>
                    <summary>Options</summary>
                    <div className='options_container'>
                        <div className="option">
                            <label htmlFor="">Expire At:</label>
                            <div className="data">

                                <input min="1" value={formData.expireAt} onChange={onChangeInputs} name="expireAt" type="number" />

                                <select onChange={onChangeInputs} name="format" >
                                    <option value="hour">Hours</option>
                                    <option value="day">Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="option">
                            <label htmlFor="">Eliminar despues de vencido en:</label>
                            <div className="data">
                                <input onChange={onChangeInputs} value={formData.deleteAt} min="0" name="deleteAt" type="number" />
                                <select onChange={onChangeInputs} name="formatToDelete">
                                    <option value="hour">Hours</option>
                                    <option value="day">Days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
            </>
            }

            {!loadingAddDemo && <div className="btns d-flex gap-3">
                <BtnPrimary title="Create" />
                <BtnSecondary onClick={() => setOpenModal(false)} type="button" title="Cancel" />
            </div>}

        </form>

    )
}
