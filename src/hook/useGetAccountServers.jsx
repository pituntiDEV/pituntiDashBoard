import { useState } from "react";
import useFetchApi from "./useFetchApi"
import config from "../config";
const useGetAccountServers = () => {
    const [accountServers, setAccountServers] = useState([])
    const [getServers, loading] = useFetchApi({
        url: config.apiUrls.plex.getPlexServers,
        method: "GET"
    })
    const getAccountServers = async () => {
        try {
            const servers = await getServers();
            setAccountServers(servers);
            return servers
        } catch (error) {
            return error
        }
    }
    return [getAccountServers, accountServers, loading]
}

export default useGetAccountServers
