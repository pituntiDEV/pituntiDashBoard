import { useState } from "react";
import useFetchPlex from "./useFetchPlex";
const useGetPlexLibs = () => {
    // const [libs,setLibs]= useState([])
    // const getLib=async(server)=>{
    //     // const uri = server.connections.find(s=>s.local==false).uri;
    //     // const url= `${uri}/library/sections/all?X-Plex-Token=${server.accessToken}`;
    //     const serverID=server.data.clientIdentifier
    //     const url= `https://plex.tv/api/v2/servers/${serverID}?X-Plex-Token=${server.data.accessToken}`

    //     const req=await fetch(url,{
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     });
    //     const libraries=await req.json();
    //     setLibs(libraries.librarySections)
    // }
    // return [getLib,libs]

    const getLib = async (server) => {
        return new Promise(async(resolve, reject) => {
            try {
                const serverID=server.data.clientIdentifier
                const url = `https://plex.tv/api/v2/servers/${serverID}?X-Plex-Token=${server.data.accessToken}`;
                const req= await fetch(url,{headers: { Accept: 'application/json','Content-Type': 'application/json'}});
                const data = await req.json();
                resolve(data.librarySections);
               
            } catch (error) {
                reject(error);
            }
        })
    }


    return [getLib]

}

export default useGetPlexLibs
