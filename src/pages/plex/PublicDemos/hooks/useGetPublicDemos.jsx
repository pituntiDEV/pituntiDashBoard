import { useEffect } from "react"
import useFetchApi from "../../../../hook/useFetchApi"
import { useState } from "react"

export const useGetPublicDemos = () => {
    const [publicDemos, setPublicDemos] = useState([])
    const [getPublicDemos, loading] = useFetchApi({
        url: "/api/plex/public/demos",
        method: "GET"
    })

    useEffect(() => {
        getPublicDemos().then(data => setPublicDemos(data))
    }, [])


    return [publicDemos, setPublicDemos, loading]

}
