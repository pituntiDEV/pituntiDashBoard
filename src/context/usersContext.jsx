import React, { useState } from "react";

export const UsersContext = React.createContext({});


export const UserContextProvider=({children})=>{

    const initialState={
        users:[],
        newUserState:false
    }
    const [state,setState] = useState(initialState);

    const value={
        state,
        setState,
        setNewUserState:()=>{
            setState({...state,newUserState:!state.newUserState});
        }

    }

    
   
   return <UsersContext.Provider value={value}>
        {children}
   </UsersContext.Provider>
}