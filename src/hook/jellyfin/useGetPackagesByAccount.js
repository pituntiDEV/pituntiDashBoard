import { useEffect, useState } from "react"
import useFetchApi from "../useFetchApi";

export const useGetPackagesByAccount = (accountID) => {
    const [packages, setPackages] = useState([]);

    const [getPackages, loading] = useFetchApi({
        url: `/api/jellyfin/packages/${accountID}`,
        method: 'GET',
    })

    useEffect(() => {
        if (accountID) {
            getPackages()
                .then(data => {
                    setPackages(data)
                })
        }
    }, [accountID])

    return [packages, setPackages, loading]
}
