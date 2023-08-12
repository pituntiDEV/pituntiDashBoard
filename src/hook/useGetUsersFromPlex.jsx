import { useState } from "react";

export const useGetUsersFromPlex = () => {
  const [loading, setLoading] = useState(false)
  const getUsers = async (token) => {
    setLoading(true);
    try {
      const url = `https://clients.plex.tv/api/v2/shared_servers/owned/accepted?X-Plex-Product=Plex%20Web&X-Plex-Version=4.111.1&X-Plex-Client-Identifier=8oyiw9onbmf56sxj3zzrlrtx&X-Plex-Platform=Chrome&X-Plex-Platform-Version=114.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=hosted&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1536x722%2C1536x864&X-Plex-Token=${token}&X-Plex-Language=en`

      const url2 = `https://plex.tv/api/v2/friends?includeSharedServers=true&includeSharedSources=true&includeSharingSettings=true&status=accepted&X-Plex-Product=Plex%20Web&X-Plex-Version=4.92.0&X-Plex-Client-Identifier=5apj9p8o24qsrpd1bl7bremu&X-Plex-Platform=Chrome&X-Plex-Platform-Version=105.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=hosted&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=939x722%2C1536x864&X-Plex-Token=${token}&X-Plex-Language=es`;
      const req = await fetch(url, {
        headers: {
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

  return [getUsers, loading];
}
