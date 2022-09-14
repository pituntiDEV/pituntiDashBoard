import { useEffect, useState } from "react";
import useFetchApi from "./useFetchApi"

export const useGetAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [req,loading]= useFetchApi({
        url: "/api/admin/get/accounts",
        method: "GET" 
    })
    const getAccounts=() => {
        req().then((data) => {
            setAccounts(data);
        });
    }

    return [getAccounts,accounts, loading ];
}
