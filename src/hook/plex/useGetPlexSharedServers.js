import { useState } from "react"
import useFetchApi from "../useFetchApi"
import { useEffect } from "react"
export const useGetPlexSharedServers = () => {
    const [servers, setServers] = useState([])
    const [getServers, loading] = useFetchApi({
        url: `/api/server/get/shared`,
        method: 'GET',
    })

    useEffect(() => {
        getServers().then(data => setServers(data))
    }, [])
    return [servers, setServers, loading]
}
