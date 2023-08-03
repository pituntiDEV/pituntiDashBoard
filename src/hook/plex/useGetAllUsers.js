import { useEffect, useState } from "react";
import useFetchApi from "../useFetchApi";

export const useGetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [getAllUsers, loading] = useFetchApi({ url: "/api/plex/v2/users/", method: "GET" });
    useEffect(() => {
        getAllUsers().then(data => setUsers(data))
    }, []);
    return [users, setUsers, loading]

}
