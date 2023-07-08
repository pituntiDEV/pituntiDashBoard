
import React from 'react';
import { createContext } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
import { useEffect } from 'react';
import { useState } from 'react';
export const Context = createContext();

export const EmbyUsersContext = ({ children }) => {
    const [users, setUsers] = useState([])
    const [getUsers, loading] = useFetchApi({
        url: `/api/emby/users`,
        method: 'GET',
    });

    useEffect(() => {
        getUsers().then(setUsers)
    }, []);

    return (
        <Context.Provider value={{ users, setUsers, loading }}>
            {children}
        </Context.Provider>
    )
}
