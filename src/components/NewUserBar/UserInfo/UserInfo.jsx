import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';
import { PackOpenIcon } from '../../icons/PackOpenIcon';
import { ServerIcon } from '../../icons/ServerIcon';
import "./UserInfo.scss";
export const UserInfo = (props) => {
    const {state,setState,setStep} = props;

    //State
    const [myServers, setMyServers] = useState([]);
    const [sharedServers, setsharedServers] = useState([]);//Servers
    const [packages , setPackages] = useState([]); //Packages

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
        url:"/api/package/plex/server/"+state.server.id,
        method:"GET",
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

    useEffect(()=>{
        if(state.server.id){
            getPackages().then(data=>{
                setPackages(data);
            })
        }
    },[state.server])


    //ONCHANGE

    const onChangeServer=(e)=>{
            const server = JSON.parse(e.target.value)
            setState({...state,server})
    };
    const onChangeInput=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }

    const packagesOnChange =(e)=>{
        const packID = e.target.value;
        setState({...state,package:packID})

    }
  
    return (
        <>
        <div className='user__info__data'>

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
                                    <option key={server._id} value={JSON.stringify({id:server._id,owner:true,ownerID:server.admin._id})}>{server.data.name}</option>
                                )
                            })
                        }

                        {
                            sharedServers.map(({server}) => {
                                return (
                                    <option key={server._id} value={JSON.stringify({id:server._id,owner:false,ownerID:server.admin})}>🔃{server.data.name}</option>
                                )
                            })
                        }
                    </select>
                </InputWithIcon>
            </div>

            <div className='form-group'>
                <label htmlFor="email">Package:</label>
                <InputWithIcon>
                    <PackOpenIcon />
                    <select onChange={packagesOnChange} required defaultValue={state.package}>
                        <option disabled value="">Package</option>
                        {
                            packages.map(pack=>{
                                return (<option key={pack._id} value={pack._id}>📦{pack.name}</option>)
                            })
                        }
                    </select>
                </InputWithIcon>
            </div>
             
        </div>
        <div className="buttons">
            <button className='btn btn-primary'>Next</button>
        </div>
        </>
    )
}
