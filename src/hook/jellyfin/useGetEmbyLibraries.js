
import useFetchApi from "../useFetchApi"

export const useGetEmbyLibraries = (accountID) => {
    const [getLibs, loading] = useFetchApi({
        url: `/api/jellyfin/libraries/${accountID}`,
        method: "GET"
    })

    return [getLibs, loading]
}
