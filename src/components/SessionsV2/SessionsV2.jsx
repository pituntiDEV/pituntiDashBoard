import React, { useEffect } from 'react'
import { useGetPlexSessionsV2 } from './hooks/useGetPlexSessionsV2'
import useFetchApi from '../../hook/useFetchApi';
import { useGetPlexUsers } from './hooks/useGetPlexUsers';

export const SessionsV2 = () => {
    const [plexSessions, users, loadingPlexSessions] = useGetPlexSessionsV2();
    return (
        <div className='session-v2'>
            {users.length > 0 &&
                plexSessions.map(sessionsData => {
                    return (<>
                        {sessionsData.server.name}
                    </>)
                })
            }
        </div>
    )
}
