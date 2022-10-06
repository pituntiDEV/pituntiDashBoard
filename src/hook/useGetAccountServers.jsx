import { useState } from "react";
import useFetchApi from "./useFetchApi"
import config from "../config";
const useGetAccountServers =() => {
    const [accountServers, setAccountServers] = useState([])
    const [getServers, loading] = useFetchApi({
        url: config.apiUrls.plex.getPlexServers,
        method: "GET"
    })
    const getAccountServers = async () => {
        try {
            const data = await getServers();
            setAccountServers(data.data.servers);
            return data
        } catch (error) {
            console.log(error)
        }
    }
    return [getAccountServers,accountServers, loading]
}

export default useGetAccountServers
