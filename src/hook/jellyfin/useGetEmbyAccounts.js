import { useEffect, useState } from "react"
import useFetchApi from "../useFetchApi"

export const useGetEmbyAccounts = () => {
    const [accounts, setAccounts] = useState([])
    const [getAccounts, loading] = useFetchApi({
        url: `/api/jellyfin/accounts`,
        method: 'GET',
    })

    useEffect(() => {
        getAccounts()
            .then(data => {
                setAccounts(data)
            })
    }, [])

    return [accounts, loading]
}
