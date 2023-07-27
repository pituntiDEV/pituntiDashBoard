import React from 'react'
import { createContext } from 'react'
import { useGetAccounts } from '../../hook/useGetAccounts';
import { useEffect } from 'react';
import { useState } from 'react';
export const Context = createContext()
export const NoRegisterContext = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [accountID, setAccountID] = useState("");
    const [users, setUsers] = useState([]);
    const [plexUsers, setPlexUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [getAccounts, , loadingGetAccouns] = useGetAccounts();
    useEffect(() => { getAccounts().then(acc => setAccounts(acc)) }, [])
    const value = {
        accounts,
        setAccounts,
        users,
        setUsers,
        loading, setLoading,
        plexUsers, setPlexUsers,
        accountID, setAccountID
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
