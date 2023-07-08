import React from 'react';
import { createContext } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
export const Context = createContext();

export const EmbyUsersContext = ({ children }) => {
    const [getUsers, loading] = useFetchApi({
        url: `/api/emby/users`,
        method: 'GET',
    });

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}
