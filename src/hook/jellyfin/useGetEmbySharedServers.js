import { useEffect, useState } from "react"
import useFetchApi from "../useFetchApi"

export const useGetEmbySharedServers = () => {
    const [servers, setServers] = useState([]);
    const [getServers, loading] = useFetchApi({
        url: `/api/jellyfin/sharedServers`,
        method: "GET"
    })

    useEffect(() => {
        getServers()
            .then(data => {
                setServers(data)
            })
    }, []);

    return [servers, loading]

}
