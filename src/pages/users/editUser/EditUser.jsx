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

export const EditUser = ({ user }) => {;
    const { addBy } = user;


    //State
    const [packages, setPackages] = useState([]);
 
    const [state,setState] = useState({
        name:user.name,
        package:user.package._id
    });

    //Custom Hooks
    const [getPackage, loading] = useGetAccountPackage();
    const [getResellerPackage] = useFetchApi({
        url: "/api/package/plex/shared/"+user.admin,
        method: 'GET',
    })
    const [sendRequest] = useFetchApi({
        url:`${config.apiUrls.plex.updateUser}${user._id}`,
        method: 'PUT',
    })


    //Effects
    useEffect(() => {
        if (addBy == "admin") {
            getPackage().then(data=>{
                console.log(data);
            })
        } else {
            getResellerPackage().then(data => {
                setPackages(data.data)
            })
        }
    }, [])
    
    //Functions

    const handleChangePackage = (pack)=>{
         
         setState({...state,package:pack});
    }

    const handleInputChange=(e)=>{
       setState({...state,[e.target.name]:e.target.value});
    }
    const submit=(e)=>{
        e.preventDefault();
        sendRequest({
            body:JSON.stringify(state)
        }).then(data=>{
            console.log(data)
        })
        
       
    }
    return (
        <form onSubmit={submit} className='EditUser'>

            <p><small>SERVER: [ <ServerIcon/> {user.data.name} ]</small></p>
            <h1>{user.email}</h1>
            <div className='form-group'>
                <label htmlFor="">Name:</label>
                <input name="name" onChange={handleInputChange} type="text" className="form-control" value={state.name} id="" />
            </div>
            {/* <div className='form-group'>
                <label htmlFor="">Details:</label>
                <input type="text" className="form-control" value={user.details} id="" />
            </div> */}

                <h3>Paquetes:</h3>
            <div className='packages-list'>

            {
                packages.map(pack=>{
                    return<>
                     <div onClick={ ()=>handleChangePackage(pack._id)} className={`pack ${pack._id===state.package && "active"}`}>
                       
                        {pack._id===user.package._id ? <PackOpenIcon/>:<PackCloseIcon/>}
                        {pack.name}
                     </div>
                    </>
                })
            }

            <div className='buttons'>
                <button className="btn btn-primary" ><EditSquareIcon/> Edit</button>
                <button type="button" className="btn btn-secondary"><CancelIcon/> Cancel</button>
            </div>
            </div>
        </form>
    )
}
