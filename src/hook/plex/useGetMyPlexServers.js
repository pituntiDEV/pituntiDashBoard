import { useState } from "react"
import useFetchApi from "../useFetchApi"
import { useEffect } from "react"

export const useGetMyPlexServers = () => {
    const [servers, setServers] = useState([])
    const [getServers, loading] = useFetchApi({
        url: "/api/server/get/all",
        method: "GET"
    })

    useEffect(() => {
        getServers().then(data => setServers(data))
    }, [])

    return [servers, setServers, loading]
}
