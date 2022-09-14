import { useState } from "react";


const useSearchUser = () => {
   
    const search = (query, usersToFilter) => {
        return usersToFilter.filter(user => {
            if(user.name.toLowerCase().includes(query.toLowerCase())){    
               return user;
            }
            if(user.email.toLowerCase().includes(query.toLowerCase())){
                return user;
            }
        })
    }
    return [search]
}

export default useSearchUser