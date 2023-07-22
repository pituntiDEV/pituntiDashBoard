import { useEffect, useState } from "react";
import useFetchApi from "../../../hook/useFetchApi"
import { useGetPlexUsers } from "./useGetPlexUsers";

export const useGetPlexSessionsV2 = () => {
    const [plexSessions, setPlexSessions] = useState([]);
    const [users] = useGetPlexUsers();
    const [getSessions, loadingGetSessions] = useFetchApi({
        url: "/api/plex/sessions/all/v2",
        method: "GET",
    });

    useEffect(() => {
        getSessions()
            .then(sessions => setPlexSessions(sessions))
        const interval = setInterval(() => {
            getSessions()
                .then(sessions => setPlexSessions(sessions))
        }, 150000);

        return () => {
            clearInterval(interval)
        }
    }, [])
    return [plexSessions, users, loadingGetSessions]
}
