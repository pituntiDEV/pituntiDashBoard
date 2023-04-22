import { useEffect, useState } from "react";
import useFetchApi from "../../../hook/useFetchApi";

export const useSearchReseller = (email) => {
    const [resellers, setResellers] = useState([]);
    const [getResellers, loading] = useFetchApi({
        url: `/api/resellers/search/5`
    })

    useEffect(() => {
        getResellers({ body: JSON.stringify(email) })
            .then(resellers => {
                setResellers(resellers)
            })
    }, [email])

    return [resellers, loading]
}
