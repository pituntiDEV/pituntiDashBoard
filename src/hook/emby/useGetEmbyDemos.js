import { useEffect } from "react";
import { useState } from "react"
import useFetchApi from "../useFetchApi";

export const useGetEmbyDemos = () => {
    const [demos, setDemos] = useState([]);
    const [getDemos, loading] = useFetchApi({
        url: `/api/emby/demos`,
        method: 'GET',
    })

    useEffect(() => {
        getDemos()
            .then(data => setDemos(data))
    }, [])


    return [demos, setDemos, loading]

}
