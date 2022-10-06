import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
import { CancelIcon } from '../../icons/CancelIcon';
import { CheckIcon } from '../../icons/CheckIcon';
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';
import { PackCloseIcon } from '../../icons/PackCloseIcon';
import { PackOpenIcon } from '../../icons/PackOpenIcon';
import { ServerIcon } from '../../icons/ServerIcon';
import  {useForm} from "react-hook-form";
import "./UserInfo.scss";
export const UserInfo = (props) => {
    const { state, setState} = props;


    //State
    const [myServers, setMyServers] = useState([]);
    const [sharedServers, setsharedServers] = useState([]);//Servers
    const [packages, setPackages] = useState([]); //Packages

    //Custom Hooks
    const [getMyServers, loading] = useFetchApi({
        url: "/api/server/get/all",
        method: "GET",
    })
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [getSharedServers, loadingShared] = useFetchApi({
        url: "/api/server/get/shared",
        method: "GET",
    })

    const [getPackages, loadingPackages] = useFetchApi({
        url: "/api/package/plex/server/" + state.server.id,
        method: "GET",
    })


    //Effects
    useEffect(() => {
        getMyServers().then(({ data }) => {
            setMyServers(data.servers);
        })

        getSharedServers()
            .then(data => {
                setsharedServers(data);
            })
    }, [])

    useEffect(() => {
        if (state.server.id) {
            getPackages().then(data => {
                setPackages(data);
            })
        }
    }, [state.server])


    //ONCHANGE

    const onChangeServer = (e) => {
        const server = JSON.parse(e.target.value)
        setState({ ...state, server,packages:[] })

    };
    const onChangeInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const packagesOnChange = (packID) => {
        let packages = state.packages;
        const existe = packages.includes(packID);
        if (!existe) {
            packages = [...packages, packID];
        } else {
            packages = packages.filter(p => p != packID);
        }
        setState({ ...state, packages })

    }

    return (
        <>
            <div className='user__info__data'>

                <div className="form-container">

                    <div className='form-group'>
                        <label htmlFor="name">Name:</label>
                        <InputWithIcon>
                            <i className="fa-solid fa-user"></i>
                            <input type="text" onChange={onChangeInput} value={state.name} required placeholder="Name" name="name" />
                        </InputWithIcon>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email:</label>
                        <InputWithIcon>
                            {/* <i className="fa-solid fa-at"></i> */}
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" required onChange={onChangeInput} value={state.email} placeholder="Email" name="email" />
                        </InputWithIcon>
                    </div>


                    <div className='form-group'>
                        <label htmlFor="email">Description:</label>
                        <InputWithIcon>
                            <i className="fa-regular fa-comment"></i>
                            <input type="text" required onChange={onChangeInput} value={state.description} placeholder="Description" name="description" />
                        </InputWithIcon>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="email">Server:</label>
                        <InputWithIcon>
                            <ServerIcon />
                            <select onChange={onChangeServer} required defaultValue={state.server.id}>
                                <option disabled value={""}>Server</option>
                                {
                                    myServers.map(server => {
                                        return (
                                            <option key={server._id} value={JSON.stringify({ id: server._id, owner: true, ownerID: server.admin._id })}>{server.data.name}</option>
                                        )
                                    })
                                }

                                {
                                    sharedServers.map(({ server }) => {
                                        return (
                                            <option key={server._id} value={JSON.stringify({ id: server._id, owner: false, ownerID: server.admin })}>🔃{server.data.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </InputWithIcon>
                    </div>

                  
                </div>

                <div className='form-group'>
                    <label htmlFor="Packages">Packages:{packages.length && state.server.id ? packages.length:<span className="text-danger p-1">Seleccione paquetes </span>}</label>
                    <div className="packages">
                        {packages.map(pack => {
                            const active = state.packages.includes(pack._id);
                            return (
                                <div key={pack._id} onClick={()=>packagesOnChange(pack._id)} className={`package ${active && "active"}`}>
                                   <span>
                                    {
                                        active ?
                                        <CheckIcon className="pr-1"/>
                                        :
                                        <CancelIcon className="pr-1"/>
                                    }
                                    <PackCloseIcon className="pr-1"/> {pack.name}
                                    </span>
                                   
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <div className="buttons">
                {
                    packages.length >0 && state.packages.length>0 &&
                    <button className='btn btn-primary'>Next</button>
                }
            </div>
        </>
    )
}
