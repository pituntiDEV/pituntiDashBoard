import React, { createContext, useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import { useEffect } from 'react';
export const Context = createContext();

export const ResellersContext = ({ children }) => {

    const [resellers, setResellers] = useState([]);
    const [getResellers, loading] = useFetchApi({
        url: `/api/emby/resellers`,
        method: "GET"
    })

    useEffect(() => {
        getResellers().then(data => {
            setResellers(data);
        })
    }, [])
    const data = {
        resellers,
        setResellers
    }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}
