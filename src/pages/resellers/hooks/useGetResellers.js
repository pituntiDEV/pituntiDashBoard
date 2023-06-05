import { useEffect } from "react";
import { useState } from "react"
import useFetchApi from "../../../hook/useFetchApi";

export const useGetResellers = () => {
    const [resellers, setResellers] = useState([]);
    const [getResellers, loading] = useFetchApi({
        url: "/api/resellers/",
        method: "GET",
    })
    useEffect(() => {
        getResellers().then(data => {
            setResellers(data)
        })
    }, [])

    return [resellers, setResellers]

}
