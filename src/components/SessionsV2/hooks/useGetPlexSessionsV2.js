import { useEffect, useState } from "react";
import useFetchApi from "../../../hook/useFetchApi"
import { useGetPlexUsers } from "./useGetPlexUsers";

export const useGetPlexSessionsV2 = () => {
    const [plexSessions, setPlexSessions] = useState([]);
    const [users] = useGetPlexUsers();
    const [loadingFirstTime, setLoadingFirtsTime] = useState(false)
    const [getSessions, loadingGetSessions] = useFetchApi({
        url: "/api/plex/sessions/all/v2",
        method: "GET",
    });

    useEffect(() => {
        setLoadingFirtsTime(true)
        getSessions()
            .then(sessions => {

                for (const sessionData of sessions) {
                    let totalKB = 0;
                    sessionData.sessions.map(session => {
                        totalKB += session?.Session?.bandwidth || 0

                    })
                    sessionData.server.totalKB = totalKB;
                }
                setLoadingFirtsTime(false)
                setPlexSessions(sessions)
            })
        const interval = setInterval(() => {
            getSessions()
                .then(sessions => {
                    for (const sessionData of sessions) {
                        let totalKB = 0;
                        sessionData.sessions.map(session => {
                            totalKB += session?.Session?.bandwidth || 0

                        })
                        sessionData.server.totalKB = totalKB;
                    }
                    setPlexSessions(sessions)
                })
        }, 15000);

        return () => {
            clearInterval(interval)
        }
    }, [])
    return [plexSessions, users, loadingGetSessions, loadingFirstTime]
}
