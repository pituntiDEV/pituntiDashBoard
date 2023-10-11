import React from 'react'
import { createContext } from 'react'
import { useGetEmbyDemos } from '../../../hook/jellyfin/useGetEmbyDemos';
export const Context = createContext()
export const DemosContext = ({ children }) => {
    const [demos, setDemos, loading] = useGetEmbyDemos();
    return (
        <Context.Provider value={{
            demos, setDemos, loading
        }}>
            {children}
        </Context.Provider>
    )
}
