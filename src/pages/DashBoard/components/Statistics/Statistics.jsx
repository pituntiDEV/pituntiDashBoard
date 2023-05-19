import React, { useEffect, useState } from 'react'
import { Circle } from '../../../../components/Chart/Circle/Circle'
import { PlexChart } from '../../../../components/Chart/PlexChart/PlexChart';
import useFetchApi from '../../../../hook/useFetchApi'
import { ActiveUsers } from './ActiveUsers'
import "./Style.scss";
export const Statistics = () => {
    const [servers, setServers] = useState([]);
    const [getServersWithUsers, loading] = useFetchApi({
        url: `/api/server/status`,
        method: 'GET',
    })

    useEffect(() => {
        getServersWithUsers()
            .then(data => {
                setServers(data)
            })
    }, [])
    return (
        <div className='statistics'>
            {servers.length > 0 && <h2>Servers Statistics:</h2>}
            <div className="circle__container">
                {
                    servers.map(server => {
                        return (
                            <div className='server__data' key={server._id}>
                                <Circle porcentage={server?.totalUsers} max={server.limit || 100} title={server?.data?.name} />

                            </div>
                        )
                    })
                }

            </div>
            <ActiveUsers />

            {/* <PlexChart/> */}


        </div>
    )
}
