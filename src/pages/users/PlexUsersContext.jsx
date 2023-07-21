import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import useFetchApi from '../../hook/useFetchApi';
import config from '../../config';
import { useEffect } from 'react';
export const Context = createContext();

export const PlexUsersContext = ({ children }) => {
    const [users, setUsers] = useState([]);
    //Custom Hooks
    const [getAllUsers, loading] = useFetchApi({ url: "/api/plex/v2/users/", method: "GET" });
    //Effect
    useEffect(() => {
        //Get all users 
        getAllUsers()
            .then(data => setUsers(data))
            .catch(error => console.log(error));
    }, [])

    //Values
    const value = {
        users,
        setUsers,
        loading
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
