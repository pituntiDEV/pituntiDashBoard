import React from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import { useGetSharedServers } from '../../../hook/useGetSharedServers';
import { useEffect } from 'react';
import { useState } from 'react';
import "./PlexServersAndPackages.scss";
import { ServerIcon } from '../../../components/icons/ServerIcon';
import { useRef } from 'react';
import { DropDown } from '../../../components/DropDown/DropDown';

export const PlexServersAndPackages = ({ formData, setFormData }) => {

    //State
    const [servers, setServers] = useState([]);
    const [sharedServers, setSharedServers] = useState([]);
    // Get my servers an shared servers
    const [getPlexServers] = useFetchApi({
        url: `/api/server/get/all`,
        method: "GET",
    });

    const [getSharedServers] = useGetSharedServers();
    //Effects
    useEffect(() => {
        const firstServer = formData.servers.length > 0 ? formData.servers[0]?.server : null;
        if (firstServer) {
            const isTheSameAdmin = formData.servers.every(server => server.server.admin._id || server.server.admin == firstServer.admin);




            isTheSameAdmin == true ? setFormData({ ...formData, isTheSameAdmin: true, admin: firstServer.admin._id || firstServer.admin }) : setFormData({ ...formData, isTheSameAdmin: false, admin: null });

        } else {
            setFormData({ ...formData, isTheSameAdmin: false, admin: null });
        }


    }, [formData.servers])
    //Get All Servers
    useEffect(() => {
        //Get My PlexServers
        getPlexServers()
            .then(data => {
                setServers(data);
            })

        // get Shared servers
        getSharedServers()
            .then(data => {
                setSharedServers(data);
            })
    }, []);

    const selectPackages = (selectedPack, selectedServer) => {

        const updatedSelectedServers = [...formData.servers];
        const server = updatedSelectedServers.find(server => server.server._id === selectedServer._id);
        if (!server) {
            updatedSelectedServers.push({
                server: selectedServer,
                packages: [selectedPack]
            })
        }

        if (server) {
            const existingPackage = server.packages.find(pack => pack._id === selectedPack._id);

            if (!existingPackage) {
                server.packages.push(selectedPack);
            } else {
                server.packages = server.packages.filter(pack => pack._id !== selectedPack._id);
            }
        }
        const filterServers = updatedSelectedServers.filter((server) => server.packages.length > 0);
        setFormData({ ...formData, servers: filterServers });

    };

    return (
        <div className='PlexServersAndPackages'>
            <div className="servers__container">
                <h3>Servidores:
                </h3>
                <span>{!formData.isTheSameAdmin && <small className='text text-danger'>*Selecciona servidores del mismo proveedor</small>}</span>
                <div className="serversAndPackages">

                    {
                        servers.map(server => {
                            const { packages } = server;
                            return (
                                <div key={server._id}>
                                    <DropDown icon={<ServerIcon />} title={`${server.data.name}`}>
                                        <ul className='packages'>
                                            {
                                                packages.map(pk => {
                                                    return (
                                                        <li className='pk' key={pk._id}>
                                                            <input onChange={() => selectPackages(pk, server)} type="checkbox" name={pk._id} /> <span>{pk.name} <span className='separator'></span> </span>

                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </DropDown>

                                </div>
                            )
                        })
                    }
                    {
                        sharedServers.map(data => {
                            const { server, packages } = data;
                            return (
                                <div key={server._id}>
                                    <DropDown icon={<ServerIcon />} title={`${server.data.name} (Compartido)`}>
                                        <ul className='packages'>
                                            {
                                                packages.map(pk => {
                                                    return (
                                                        <li className='pk' key={pk._id}>
                                                            <input onChange={() => selectPackages(pk, server)} type="checkbox" name={pk._id} /> {pk.name}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </DropDown>
                                    <hr />
                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </div>
    )
}
