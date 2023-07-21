import React from 'react'
import { useContext } from 'react';
import { appContext } from '../../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';

export const useGetAllServers = () => {
    const { plex } = useContext(appContext);
    const { servers, sharedServers } = plex;
    const [allServers, setAllServers] = useState([]);
    useEffect(() => {
        const myserverData = servers.map(s => ({
            _id: s._id,
            name: s.data.name,
            admin: s.admin._id,
            shared: false,
        }))

        const sharedServersData = sharedServers.map(s => ({
            _id: s.server._id,
            name: s.server.data.name,
            admin: s.server.admin,
            shared: true,

        }))

        setAllServers([...myserverData, ...sharedServersData])

    }, [servers, sharedServers])


    return [allServers]
}
