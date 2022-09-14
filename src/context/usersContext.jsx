import React, { useState } from "react";

export const UsersContext = React.createContext({});


export const UserContextProvider=({children})=>{

    const initialState={
        users:[],
    }
    const [state,setState] = useState(initialState);
    const value={
        state,
        setState
    }

    
   
   return <UsersContext.Provider value={value}>
        {children}
   </UsersContext.Provider>
}