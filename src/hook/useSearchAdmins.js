import { useEffect, useState } from "react"
import useFetchApi from "./useFetchApi"

export const useSearchAdmins = (query = "", limit = 5) => {
    const [users, setUsers] = useState([])
    const [search, loading] = useFetchApi({
        url: `/api/resellers/search/${limit}`,
        method: "POST"
    });

    useEffect(() => {
        if (query.length > 3) {
            search({ body: JSON.stringify({ email: query }) })
                .then(data => {
                    setUsers(data)
                })
        } else {
            setUsers([])
        }

    }, [query])

    return [users, loading]

}
