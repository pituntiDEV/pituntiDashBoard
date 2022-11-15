import React from 'react'
import useFetchApi from './useFetchApi'

export const useGetPackagesByServer = (serverID) => {
    const  [useGetPackagesByServer,loading] = useFetchApi({
        url:`/api/package/plex/server/${serverID}`,
        method: 'GET',
    })
 return [useGetPackagesByServer,loading]
}
