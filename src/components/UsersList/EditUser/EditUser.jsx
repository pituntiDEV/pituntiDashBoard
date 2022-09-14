import React from 'react'
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

export const EditUser = ({ user }) => {
    //State
    const [packages, setPackages] = useState([]);
    const [state, setState] = useState({
        name: user.name,
        package: user.package._id
    });

    //Custom Hooks
    const [getPackages, loadingPackages] = useFetchApi({
        url: "/api/package/plex/server/" + user.package.server,
        method: "GET",
    })


    const [sendRequest] = useFetchApi({
        url: `${config.apiUrls.plex.updateUser}${user._id}`,
        method: 'PUT',
    })


    //Effects
    useEffect(() => {
        getPackages().then(data => {
            setPackages(data)
        })
    }, [])

    //Functions

    const handleChangePackage = (pack) => {

        setState({ ...state, package: pack });
    }

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const submit = (e) => {
        e.preventDefault();
        sendRequest({
            body: JSON.stringify(state)
        }).then(data => {
            console.log(data)
        })


    }
    return (
        <form onSubmit={submit} className='EditUser'>
            <InputWithIcon>
                <ServerIcon className="m-1" />
                <span>{" Server:" + user.data.name} </span>
            </InputWithIcon>

            <h1>{user.email}</h1>
            <div className='form-group'>
                <label htmlFor="">Name:</label>
                <InputWithIcon>
                    <UserTieIcon />
                    <input name="name" onChange={handleInputChange} type="text" className="form-control" value={state.name} id="" />
                </InputWithIcon>
            </div>
            <div className='form-group'>
                <label>Paquetes:</label>
                <div className='packages-list'>
                    {
                        packages.map(pack => {
                            return <>
                                <div className={`package ${pack._id === state.package && "selected"}`}>

                                    <div className="package-info">
                                        {pack._id === user.package._id
                                            ? <><CheckIcon /> <PackOpenIcon /></>
                                            : <PackCloseIcon />}

                                    </div>
                                    <span> {pack.name}</span>
                                </div>
                            </>
                        })
                    }

                </div>
            </div>



            <button className="btn btn-primary" >
                <EditSquareIcon /> Edit
            </button>
            <button type="button" className="btn btn-secondary"><CancelIcon /> Cancel</button>
        </form>
    )
}
