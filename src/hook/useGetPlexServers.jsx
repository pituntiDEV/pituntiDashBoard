import  { useState } from 'react'
import useFetchPlex from './useFetchPlex'

const useGetPlexServers = () => {
    const [servers, setServers] = useState([]);
    const [req,data, loading] = useFetchPlex({
        url: `https://plex.tv/api/v2/resources.json?X-Plex-Client-Identifier=pi`,
        method: "GET"
      })

      const getServers = (token) => {
        req({
            headers: {
                "X-Plex-Token": token,
            }
        }).then((data) => {
            const serverFilter = data.filter(server => server.provides === "server" && server && server.owned===true);
            setServers(serverFilter);   
        });
      }


    
    
 return [getServers,servers,loading]
}

export default useGetPlexServers