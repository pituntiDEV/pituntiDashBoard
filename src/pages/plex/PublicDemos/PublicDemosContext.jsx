import React from 'react'
import { useGetPublicDemos } from './hooks/useGetPublicDemos'
export const Context = React.createContext('')
export const PublicDemosContext = ({ children }) => {
    const [publicDemos, setPublicDemos, loading] = useGetPublicDemos();

    const value = {
        publicDemos,
        setPublicDemos,
        loading
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
