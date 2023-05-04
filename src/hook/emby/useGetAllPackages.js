import { useEffect, useState } from "react"
import useFetchApi from "../useFetchApi";

export const useGetAllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [getPackages, loading] = useFetchApi({
        url: `/api/emby/packages`,
        method: 'GET',
    })
    useEffect(() => {
        getPackages()
            .then(data => {
                setPackages(data)
            })
    }, [])

    return [packages, setPackages, loading]
}
