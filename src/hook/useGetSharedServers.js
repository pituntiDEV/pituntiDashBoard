import useFetchApi from "./useFetchApi"

export const useGetSharedServers = () => {
 const [getServers,loading] = useFetchApi({
    url:`/api/server/get/shared`,
    method: 'GET',
 })

 return [getServers,loading]
}
