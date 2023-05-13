
import useFetchApi from "../useFetchApi"

export const useGetEmbyLibraries = (accountID) => {
    const [getLibs, loading] = useFetchApi({
        url: `/api/emby/libraries/${accountID}`,
        method: "GET"
    })

    return [getLibs, loading]
}
