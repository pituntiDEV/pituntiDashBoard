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
import { Packages } from './Packages';
import { WhatsappIcon } from '../../icons/WhatsappIcon';
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

    const serversAccount = state.servers.reduce((acc,s)=>{
        if(!acc.includes(s.account)){
          acc.push(s.account)
        }
        return acc;
    },[])





    //Effects
    useEffect(() => {
        getMyServers().then((servers) => {
            setMyServers(servers);
        })

        getSharedServers()
            .then(data => {
              
                setsharedServers(data);

            })

    }, [])

  


    //ONCHANGE

    const onChangeServer = (server) => {
        const existe = state.servers.find(s => s._id === server._id)
        if(!existe){
           setState({...state,servers:[...state.servers,server]})
        }else{
           const servers = state.servers.filter(s=>s._id != server._id);
           setState({...state,servers})
        }

 

        
    };
    const onChangeInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const packagesOnChange = (pack) => {
        // console.log(pack)
        // let packages = state.packages;
        // const existe = packages.includes(packID);
        // if (!existe) {
        //     packages = [...packages, packID];
        // } else {
        //     packages = packages.filter(p => p != packID);
        // }
        // setState({ ...state, packages })

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

                    <div className='form__group'>
                        <small htmlFor="email" className='text-muted'><WhatsappIcon/> Whatsapp:</small>
                            <input type="tel" onChange={onChangeInput} value={state.whatsapp} placeholder="Whatsapp" name="whatsapp" />
                      
                    </div>


                    <div className='form-group'>
                        <label htmlFor="email">Comentarios:</label>
                        <InputWithIcon>
                            <i className="fa-regular fa-comment"></i>
                            <input type="text"   onChange={onChangeInput} value={state.comments} placeholder="Opcional" name="comments" />
                        </InputWithIcon>
                    </div>

                   

                  
                </div>

                {/* <div className='form-group'>
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
                </div> */}

                <div className='form-group my-4'>
                        <h3 className='fw-bold' htmlFor="email">Server:</h3>
                           <div className="servers">
                                {
                                    myServers.map(server => {
                                        const existe = state.servers.find(s=>s._id == server._id);
                                           
                                        return (
                                            <div key={server._id} onClick={()=>onChangeServer(server)} className={`server ${existe && "active"}`} value={JSON.stringify({ id: server._id, owner: true, ownerID: server.admin._id })}><ServerIcon/> {server.data.name}
                                            
                                            </div>
                                        )
                                    })
                                }

                                {
                                    sharedServers.map(( {server} ) => {
                                        const existe = state.servers.find(s=>s._id == server._id);
                                        
                                        return (
                                            <div 
                                            onClick={()=>onChangeServer(server)} className={`server ${existe && "active"}`} key={server?._id} value={JSON.stringify({ id: server?._id, owner: false, ownerID: server?.admin })}>🔃{server?.data.name}</div>
                                        )
                                    })
                                }
                            
                           </div>
                    </div>

                    <div className="packages">
                        {state.servers.map(server=>{
                            return (
                                <Packages key={server._id} state={state} setState={setState} server={server}/>
                            )
                        })}
                    </div>

            </div>
            {
                serversAccount.length > 1 && 
                <div className="alert alert-danger">
                    No se puede Agregar servers de siferente cuentas
                </div>
            }
            <div className="buttons">
                {
                     state.packages.length>0 && serversAccount.length < 2 &&
                    <button className='btn btn-primary'>Next</button>
                }
            </div>
        </>
    )
}
