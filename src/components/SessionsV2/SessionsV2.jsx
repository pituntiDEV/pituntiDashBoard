import React, { useEffect } from 'react'
import { useGetPlexSessionsV2 } from './hooks/useGetPlexSessionsV2'
import useFetchApi from '../../hook/useFetchApi';
import { useGetPlexUsers } from './hooks/useGetPlexUsers';
import "./SessionsV2.scss";
import { ServerIcon } from '../icons/ServerIcon';
import utils from "../../utils/date/index";
import { Spinner } from '../Spinner/Spinner';
import { useState } from 'react';
import { CloseIcon } from '../icons/CloseIcon';
import { StopSession } from './StopSession';
export const SessionsV2 = () => {

    function convertKBtoMB(kilobytes) {
        const megabytes = kilobytes / 1024;
        return megabytes.toFixed(1);
    }

    const [plexSessions, users, loadingPlexSessions, loading] = useGetPlexSessionsV2();
    const [noAdminTotalUsers, setNoAdminTotalUsers] = useState(0);


    useEffect(() => {

        const total = plexSessions.map(p => p.sessions).flat().reduce((acc, s) => {
            users.find(user => {
                const userIDS = user.data.map(d => d.invitedId);
                if (userIDS.includes(Number(s.User.id))) {
                    acc++;
                }
            })
            return acc;
        }, 0)

        setNoAdminTotalUsers(total)
    }, [users, plexSessions])




    return (
        <div className='session-v2'>

            {loading && <Spinner />}
            {users.length > 0 &&
                plexSessions.map(sessionsData => {
                    return (
                        <div className='servers-sessions' key={sessionsData.server._id}>
                            <div className="server_title">
                                <ServerIcon /> {sessionsData.server.name}:{sessionsData.server.isAdmin ? sessionsData.sessions.length : noAdminTotalUsers}
                                <small> ({convertKBtoMB(sessionsData.server.totalKB)} MB)</small>
                            </div>
                            <div className='sessions'>
                                {
                                    sessionsData.sessions.map(session => {
                                        const allMediaPart = session?.Media?.map(m => m.Part).flat().map(p => p.Stream).flat().filter(part => {
                                            if (part?.streamType == 1) {
                                                return part
                                            }
                                        })
                                        const partVideo = allMediaPart[0] || null;
                                        const decision = partVideo?.decision;
                                        const displayTitle = partVideo?.displayTitle


                                        const { Player } = session;
                                        const { title, grandparentTitle, parentTitle, year } = session;
                                        const titleFixed = !!title ? title : "";
                                        const grandparentTitleFixed = !!grandparentTitle ? grandparentTitle : "";
                                        const parentTitleFixed = !!parentTitle ? parentTitle : "";
                                        const allTitle = `${titleFixed}${grandparentTitleFixed} ${parentTitleFixed}`

                                        //Find User in DB
                                        const userInDb = users.find(user => user.plexUserID == session.User.id || user?.data.map(d => d.invitedId || d.invited.id)?.includes(session.User.id));

                                        //plexUserID
                                        if (!userInDb && !sessionsData.server.isAdmin) {
                                            return;
                                        }
                                        return (
                                            <div key={session?.Session?.id || new Date()} >

                                                <div className="user-card">
                                                    {session?.User?.id}
                                                    <StopSession server={sessionsData.server} session={session} />
                                                    <div className="header">
                                                        <img src={`https://magicdashboard.net/api/my-account-info/plex-img/byServer?path=${session.thumb}&server=${sessionsData.server._id}`} alt={allTitle} />
                                                        <div className='title'>
                                                            <span>{convertKBtoMB(session?.Session?.bandwidth) || "NAN"}MB {Player.state}  </span>
                                                            <div className="title_and_year">
                                                                {allTitle}
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="ip">
                                                        {Player.address}
                                                        <div className=""> {decision}{displayTitle ? `- ${displayTitle}` : ""}</div>
                                                    </div>
                                                    <div className="year">
                                                        {year}
                                                    </div>
                                                    <hr />
                                                    <div className="body">
                                                        <div className="user-info">
                                                            <div className="email">
                                                                <img src={session.User.thumb} alt="" />
                                                                {userInDb?.email || userInDb?.name || `${session.User.title} No register`}
                                                                {!!userInDb?.email && session.User.id == 1 && " User Master"}
                                                                {!!userInDb?.email && !session.User.id == 1 && " No register"}
                                                            </div>
                                                            <div className="">
                                                                {userInDb?.name}
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
