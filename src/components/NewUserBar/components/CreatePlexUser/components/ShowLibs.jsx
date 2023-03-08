import React, { useEffect, useState } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi';
import useGetAccountServers from '../../../../../hook/useGetAccountServers'
import { useGetSharedServers } from '../../../../../hook/useGetSharedServers';
import { ServerIcon } from '../../../../icons/ServerIcon';
import "./Servers.scss";
export const ShowLibs = ({ formData,setFormData, onChange}) => {
    // States

    const [sharedServers, setSharedServers] = useState([]);
    const [selectedServers, setSelectedServers] = useState([]);
    const [myServers,setMyServers] = useState([]);

    

    // Get my servers an shared servers
    const [getMyServers, loading] = useFetchApi({
        url:`/api/server/get/all`,
        method: "GET",
    });
    const [getSharedServers, loadingSharedServer] = useGetSharedServers();
    
    //Get All Servers
    useEffect(() => {
        getMyServers()
            .then(data => {
               
                const serversData = data.map(server => {
                    return {
                        _id: server._id,
                        name: server.data.name,
                        packages:server.packages,
                        owner: true,

                    }
                })
                console.log(serversData);
                setMyServers(serversData);
            })

        getSharedServers()
            .then(data => {
                const serversData = data.map(({ server, packages }) => {
                    return {
                        _id: server._id,
                        name: server.data.name,
                        packages,
                        owner: false,

                    }
                })
                setSharedServers(serversData);
            })
    }, []);



    const selectPackages = (selectedPack, selectedServer) => {
        const updatedSelectedServers = [...selectedServers];
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
        const filterServers = updatedSelectedServers.filter((server)=>server.packages.length > 0);
        setSelectedServers(filterServers);
        setFormData({...formData,servers:filterServers})

    };


    return (
        <div className='servers'>

        

            {
                 myServers.map(server => {
                    return (
                        <div className='server' key={server._id}>
                            <hr />
                            <div className="name">
                                <ServerIcon /> {server.name} {!server.owner && "(Compartido)"}

                            </div>

                            <div className="packages">
                                {
                                    server.packages.map(pack => {
                                        const findServer  = selectedServers?.find(s=>s.server._id==server._id);
                                        const findPackage = findServer?.packages.find(p=>p._id==pack._id);
                                        
                                        return (
                                            <div onClick={() => selectPackages(pack, server)} className={`pack ${findPackage && "active"}`} key={pack._id}>{pack.name}</div>
                                        )
                                    })
                                }

                            </div>
                            <hr />

                        </div>
                    )
                })
            }
            {
                
                sharedServers.map(server => {
                    return (
                        <div className='server' key={server._id}>
                            <hr />
                            <div className="name">
                                <ServerIcon /> {server.name} {!server.owner && "(Compartido)"}

                            </div>

                            <div className="packages">
                                {
                                    server.packages.map(pack => {
                                        const findServer  = selectedServers?.find(s=>s.server._id==server._id);
                                        const findPackage = findServer?.packages.find(p=>p._id==pack._id);
                                        
                                        return (
                                            <div onClick={() => selectPackages(pack, server)} className={`pack ${findPackage && "active"}`} key={pack._id}>{pack.name}</div>
                                        )
                                    })
                                }

                            </div>
                            <hr />

                        </div>
                    )
                })
            }
        </div>
    )
}
