
import { useEffect, useState } from "react";
import useFetchApi from "./useFetchApi"

export const useGetAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [req,loading]= useFetchApi({
        url: "/api/admin/get/accounts",
        method: "GET" 
    })
    const getAccounts=async() => {
        try {
            const data = await req();
            setAccounts(data);
            return data
        } catch (error) {
            return error
        }
    }

    return [getAccounts,accounts, loading ];
}
