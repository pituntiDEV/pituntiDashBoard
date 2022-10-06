import  { useState } from 'react'
import useFetchPlex from './useFetchPlex'

const useGetPlexServers = () => {
    const [req, loading] = useFetchPlex({
        url: `https://plex.tv/api/v2/resources.json?X-Plex-Client-Identifier=pi`,
        method: "GET"
      })

      const getServers = async(token) => {
        try {
            const servers = await req({headers: {"X-Plex-Token": token}})
            const serverFilter = servers.filter(server => server.provides === "server" && server && server.owned===true);
            return serverFilter;
        } catch (error) {
            return error
        }
      }

 return [getServers,loading]
}

export default useGetPlexServers