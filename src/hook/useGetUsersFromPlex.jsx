import { useState } from "react";

export const useGetUsersFromPlex = () => {
    const [loading,setLoading] = useState(false)
   const getUsers = async(token)=>{
        setLoading(true);
      try {
        const req = await fetch(`https://plex.tv/api/v2/friends?includeSharedServers=true&includeSharedSources=true&includeSharingSettings=true&status=accepted&X-Plex-Product=Plex%20Web&X-Plex-Version=4.92.0&X-Plex-Client-Identifier=5apj9p8o24qsrpd1bl7bremu&X-Plex-Platform=Chrome&X-Plex-Platform-Version=105.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=hosted&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=939x722%2C1536x864&X-Plex-Token=${token}&X-Plex-Language=es`,{
            headers:{
                "Accept": "application/json",
            }
        })
        setLoading(false);
        return req.json();
      } catch (error) {
        setLoading(false);
        return error;
      }
   }

   return [getUsers,loading];
}
