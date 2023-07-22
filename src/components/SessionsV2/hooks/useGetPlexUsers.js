import { useEffect, useState } from "react";
import useFetchApi from "../../../hook/useFetchApi";

export const useGetPlexUsers = () => {
    const [users, setUsers] = useState([])
    const [getAllUsers, loading] = useFetchApi({ url: "/api/plex/v2/users/", method: "GET" });
    //Effect
    useEffect(() => {
        //Get all users 
        getAllUsers()
            .then(data => setUsers(data))
            .catch(error => console.log(error));
    }, [])

    return [users, setUsers, loading]
}
