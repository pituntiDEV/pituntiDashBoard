import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useGetSellersByUsers } from '../../../hook/useGetSellersByUsers';
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';
import { ServerIcon } from '../../icons/ServerIcon';

import "./UsersFilter.scss";
export const UsersFilter = (props) => {

    const [getSellers, sellers] = useGetSellersByUsers(props.users);
    const [servers, setServers] = useState([]);
    useEffect(() => {
        getSellers()
        const reducedServers = props.users.reduce((acc, user) => {
            user.servers.forEach(server => {
                const serverID = server._id;
                if (!acc.find(s => s._id === serverID)) {
                    acc.push(server)
                }
            })
            return acc
        }, [])
        setServers(reducedServers)
    }, [props])

    return (
        <div className='filter'>

            <div className='inputs'>
                <div className='inputFilter'>
                    <small>Estado:</small>
                    <InputWithIcon>
                        <i className="fa-solid fa-battery-half"></i>
                        <select {...props} name="state" id="" defaultValue={''}>
                            <option value="" disabled>Estado</option>
                            <option value="all">Todos</option>
                            <option value="active">Activos</option>
                            <option value="expired">Vencidos</option>
                        </select>
                    </InputWithIcon>
                </div>

                <div className='inputFilter'>
                    <small>Vendedor:</small>
                    <InputWithIcon>
                        <i className="fa-solid fa-cash-register"></i>
                        {/* <select onChange={hanledChange}  name="" id="" defaultValue={''}> */}
                        <select {...props} name="seller" id="" defaultValue={''}>
                            <option value="" >All Sellers</option>
                            {sellers.map(seller => {
                                return (
                                    <option key={seller} value={seller}>{seller}</option>
                                )
                            })}

                        </select>

                    </InputWithIcon>

                </div>
                <div className='inputFilter'>
                    <small>Server:</small>
                    <InputWithIcon>
                        <ServerIcon />
                        {/* <select onChange={hanledChange}  name="" id="" defaultValue={''}> */}
                        <select {...props} defaultValue={""} name="server" id="server">
                            <option value="" disabled>Filtrar por server</option>
                            <option value="">Todos</option>
                            {
                                servers.map(server => {
                                    return (
                                        <option value={server._id} key={server._id}>
                                            {server?.data?.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    </InputWithIcon>
                </div>
                <div className='inputFilter'>
                    <small>Próximo a expirar[Dias]:</small>
                    <InputWithIcon>
                        <i className="fa-regular fa-clock"></i>
                        {/* <select onChange={hanledChange}  name="" id="" defaultValue={''}> */}
                        <input type="number" {...props} name="byExpireDay" min={0} />

                    </InputWithIcon>
                </div>


            </div>
        </div>
    )
}
