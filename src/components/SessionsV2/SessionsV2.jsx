import React, { useEffect } from 'react'
import { useGetPlexSessionsV2 } from './hooks/useGetPlexSessionsV2'
import useFetchApi from '../../hook/useFetchApi';
import { useGetPlexUsers } from './hooks/useGetPlexUsers';
import "./SessionsV2.scss";
import { ServerIcon } from '../icons/ServerIcon';
import utils from "../../utils/date/index";
import { Spinner } from '../Spinner/Spinner';
export const SessionsV2 = () => {
    function convertKBtoMB(kilobytes) {
        const megabytes = kilobytes / 1024;
        return megabytes.toFixed(1);
    }
    const [plexSessions, users, loadingPlexSessions, loading] = useGetPlexSessionsV2();

    return (
        <div className='session-v2'>

            {loading && <Spinner />}
            {users.length > 0 &&
                plexSessions.map(sessionsData => {
                    return (
                        <div className='servers-sessions' key={sessionsData.server._id}>
                            <div className="server_title">
                                <ServerIcon /> {sessionsData.server.name}:{sessionsData.sessions.length}
                            </div>
                            <div className='sessions'>
                                {
                                    sessionsData.sessions.map(session => {
                                        const { Player } = session;
                                        const { title, grandparentTitle, parentTitle, year } = session;
                                        const titleFixed = !!title ? title : "";
                                        const grandparentTitleFixed = !!grandparentTitle ? grandparentTitle : "";
                                        const parentTitleFixed = !!parentTitle ? parentTitle : "";
                                        const allTitle = `${titleFixed}${grandparentTitleFixed} ${parentTitleFixed}`
                                        const userInDb = users.find(user => {
                                            const userIDS = user.data.map(d => d.invitedId);
                                            if (userIDS.includes(Number(session.User.id))) {
                                                return true;
                                            }
                                        })
                                        if (!userInDb && !sessionsData.server.isAdmin) {
                                            return;
                                        }
                                        return (
                                            <div key={session?.Session?.id || new Date()} >
                                                {!userInDb && !sessionsData.server.isAdmin && "NO Admin"}
                                                <div className="user-card">

                                                    <div className="header">
                                                        <img src={`https://magicdashboard.net/api/my-account-info/plex-img/byServer?path=${session.thumb}&server=${sessionsData.server._id}`} alt={allTitle} />
                                                        <p className='title'>
                                                            <span>{convertKBtoMB(session.Session.bandwidth)}MB {Player.state}  </span>
                                                            <div className="title_and_year">
                                                                {allTitle}
                                                            </div>

                                                        </p>
                                                    </div>
                                                    <div className="ip">
                                                        {Player.address}
                                                    </div>
                                                    <div className="year">
                                                        {year}
                                                    </div>
                                                    <hr />
                                                    <div className="body">
                                                        <div className="user-info">
                                                            <div className="email">
                                                                <img src={session.User.thumb} alt="" />
                                                                {userInDb?.email || "NO EMAIL"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="footer">
                                                        <div className="date">
                                                            {utils.formatDate(userInDb?.expireAt)}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                            <hr />
                        </div>)
                })
            }
        </div>
    )
}
