import React, { useContext } from 'react'
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
import { useGetAccountPackage } from '../../../hook/useGetAccountPackage';
import "./EditUser.scss";
import config from '../../../config';
import { useState } from 'react';
import { PackOpenIcon } from '../../../components/icons/PackOpenIcon';
import { PackCloseIcon } from '../../../components/icons/PackCloseIcon';
import { EditSquareIcon } from '../../../components/icons/EditSquareIcon';
import { CancelIcon } from '../../../components/icons/CancelIcon';
import { ServerIcon } from '../../../components/icons/ServerIcon';
import { CheckIcon } from '../../icons/CheckIcon';
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';
import { UserTieIcon } from '../../icons/UserTieIcon';
import { useForm } from "react-hook-form"
import { UsersContext } from '../../../context/usersContext';
import SWAlert from '../../SwAlert/SWAlert';
import {Packages} from "../../../pages/NoRegisterUsers/Register/Packages/Packages"
import { PackagesList } from './PackagesList';

export const EditUser = ({ user, setOpenModal, setNewUserState }) => {
    //Vars
    const isAdmin = localStorage.getItem("_id") == user.admin._id;
    const userExpireDate = user.credits[user.credits.length - 1]?.expireAt || null;

    //State
    const [packages, setPackages] = useState([]);
    const [state, setState] = useState({
        name: user.name,
        packages: user.packages,
        date: isAdmin ? userExpireDate : null,
        servers: user.servers
    });

    const [myServers, setMyServers] = useState([]);



    const [getPackages, loadingPackages] = useFetchApi({
        url: "/api/package/plex/server/" + user.server,
        method: "GET",
    })
    const [getMyServers, loadingGetMyServers] = useFetchApi({
        url: `/api/server/get/all`,
        method: "GET",
    })
    const { register, handleSubmit, unregister, formState: { errors } } = useForm();


    const [updateUser, loading] = useFetchApi({
        url: `${config.apiUrls.plex.updateUser}${user._id}`,
        method: 'PUT',
    })


    //Effects
    useEffect(() => {
        getPackages().then(data => {
            setPackages(data)
        })

        getMyServers().then(data => {
            setMyServers(data?.data?.servers)
        }).catch(error => {
            console.log(error);
        })
    }, [user])

    //Functions

    const handleChangePackage = (pack) => {
        const existe = state.packages.includes(pack._id);
        !existe ? setState({ ...state, packages: [...state.packages, pack._id] }) : setState({ ...state, packages: state.packages.filter(p => p != pack._id) });
    }

    const onChangeServer=(server)=>{
        const existe = state.servers.find(s=>s._id===server._id);
        if(!existe){
           setState({...state,servers:[...state.servers,server]});
        }else{
           
            const servers = state.servers.filter(s=>s._id!=server._id)
           setState({...state,servers});
        }

        console.log(user);
          
    }


    const submit = () => {
       
        updateUser({
            body: JSON.stringify({...user,...state})
        }).then(data => {
            SWAlert.alert({
                title: `Editastes a ${user?.email}` || data.message,
                icon: "success"
            })
            setNewUserState(s => !s);
            setOpenModal(false);
        }).catch(error => {
            SWAlert.error({
                title: error.message || "Algo salio mal"
            })
        })




    }
    return (
        <form onSubmit={handleSubmit(submit)} className='EditUser'>
            <h1>{user.email}</h1>
            {/* <InputWithIcon>
                <ServerIcon />
                <span className='server_name'>{" Server:" + user.data.name} </span>
            </InputWithIcon> */}

            <div className='form-group'>
                <label htmlFor="">Name:</label>
                <InputWithIcon>
                    <UserTieIcon />
                    <input  {...register("name", {
                        required: true,
                    })} className="form-control" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
                </InputWithIcon>
                <small className='text-danger'>{errors.name && "*Nombre requerido"}</small>
            </div>

            {isAdmin && <div className='form-group'>
                <label htmlFor="">Expired:</label>
                <InputWithIcon>
                    <i className="fa-solid fa-calendar-days"></i>
                    <input
                        type="date"
                        value={`${state.date}`}
                        {...register("expireAt", {
                            required: true,
                        })}
                        className="form-control"
                        onChange={(e) => setState({ ...state, date: e.target.value })}
                    />
                </InputWithIcon>
                <small className='text-danger'>{errors.name && "*Nombre requerido"}</small>
            </div>}

            <div className="servers_container">
                <h3 className='fw-bold'>Servers:</h3>
                <div className='servers'>
                    {
                        myServers.map((server) => {
                            const selected = state.servers.find(s=>s._id == server._id);

                            return (
                                <div onClick={()=>{
                                    onChangeServer(server);
                                }} key={server._id} className={`server ${selected && "selected"}`}>
                                   <ServerIcon /> {server.data.name}
                                   
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="packages_container mt-5">
                <h2 className='fw-bold'>Paquetes:</h2>
                <div className="packages">
                    {
                        state.servers.map(server=>{
                            return (
                                <div key={server._id} className="pack">
                                   <PackagesList server={server} state={state} setState={setState}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* <div className='form-group'>
                <label>Paquetes:</label>
                <div className='packages-list'>
                    {
                        packages.map(pack => {
                            const existe = state.packages.map(p => p).includes(pack._id);

                            return (
                                <div onClick={() => handleChangePackage(pack)} key={pack._id} className={`package ${existe && "selected"}`}>

                                    <div className="package-info">
                                        {existe
                                            ? <span><CheckIcon /> <PackOpenIcon /></span>
                                            : <PackCloseIcon />}

                                    </div>
                                    <span> {pack.name}</span>
                                </div>)

                        })
                    }

                </div>
                <small className='text-danger'>{errors.packages && "Seleccione una paquete"}</small>
            </div> */}



            {
                !loading ? <>
                    <button className="btn btn-primary" >
                        <EditSquareIcon /> Edit
                    </button>
                    <button type="button" onClick={() => setOpenModal(false)} className="btn btn-secondary"><CancelIcon /> Cancel</button>
                </> : "Loading ..."
            }
        </form>
    )
}
