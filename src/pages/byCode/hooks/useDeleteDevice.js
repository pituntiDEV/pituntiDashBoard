import useFetchApi from "../../../hook/useFetchApi"

export const useDeleteDevice = () => {
    const [deleteDevice,loading] = useFetchApi({
        url:`/api/byCode/`,
        method: 'DELETE'
    })

    return [deleteDevice,loading]
}
