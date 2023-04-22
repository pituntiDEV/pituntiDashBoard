import { useState } from "react"
import useFetchApi from "../../../hook/useFetchApi"
import { useEffect } from "react";

export const useGetAccountsSharedWithMe = () => {
    const [accounts, setAccounts] = useState([]);
    const [getAccounts, loading] = useFetchApi({
        url: `/api/resellers/shared/accounts`,
        method: 'GET',
    })

    useEffect(() => {
        getAccounts()
            .then(data => {
                setAccounts(data);
            })
    }, [])

    return [accounts, loading]
}
