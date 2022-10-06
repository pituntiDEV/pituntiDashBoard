import React, { useState } from 'react'
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
import useGetPlexServers from '../../../hook/useGetPlexServers';
import SWAlert from '../../SwAlert/SWAlert';
import "./NewServerForm.scss";
export const NewServerForm = ({setOpenModal,setNewServerState}) => {
    //States
    const [accounts,setAccounts] = useState([]);
    const [servers,setServers] = useState([]);
    const [account,setAccount] = useState(null);
    const [formData,setFormData] = useState({
        account:"",
        data:{},
        server:""
    });

    //Custom hooks
        //Get Accounts
    const [getAccounts,loadingAccounts] = useFetchApi({
        url:`/api/admin/get/accounts`,
        method: 'GET',
    })
    
    //Get Plex Servers
    const [getPlexServers]=useGetPlexServers()

    //Save Server
    const [saveServer,loadingSaveServer] = useFetchApi({
        url:`/api/server/plex`
    })

    useEffect(()=>{
        getAccounts().then(data=>{
            setAccounts(data);
        })
    },[])

    useEffect(()=>{
        
        account && getPlexServers(account.data.user.authToken).then(data=>{
            setServers(data);
        });
    },[account])

    const onChangeAccount=(e)=>{
        const _id = e.target.value;
        const account = accounts.find(a=>a._id ==_id);
        setAccount(account);
    };

    const onChangeServer=(e)=>{
        const _id = e.target.value;
        setFormData({...formData,server:_id});
    };
    const submit=(e)=>{
        e.preventDefault();
        
        const server = servers.find(server=>server.clientIdentifier==formData.server);
        const dataToSend={
            data:server,
            account:account._id
        }
        saveServer({body:JSON.stringify(dataToSend)})
        .then(data=>{
            SWAlert.success({
                title:data.message || "Server Agregado"
            })

            setNewServerState(a=>!a);
            setOpenModal(false)
            
        }).catch(err=>{
            SWAlert.error({
                title:err.message
            })
        })
    }
  return (
    <form onSubmit={submit} className="new_server_form">
        <div className="form_container">
            
            <div className="form-group">
                <label htmlFor="">Cuenta:</label>
                <select required name="" id="" onChange={onChangeAccount} defaultValue={formData.account}>
                    <option value="" disabled>Selecciona una Cuenta</option>
                    {
                        accounts.map(account=>{
                            return <option key={account._id} value={account._id}>{account.email}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="">Server:</label>
                <select required name="" id="" onChange={onChangeServer} defaultValue={formData.server}>
                    <option value="" disabled>Selecciona el Server</option>
                    {
                        servers.map(server=>{
                            return <option key={server.clientIdentifier} value={server.clientIdentifier}>{server.name}</option>
                        })
                    }
                </select>
            </div>

            <div className="button_add_server mt-4">
                <button className='btn btn-primary'>Add</button>
                <button type="button" className='btn btn-secondary' onClick={()=>setOpenModal(false)}>Cancel</button>
            </div>


        </div>
    </form>
  )
}
