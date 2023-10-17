import { useState } from "react"
import { ChangeServersAndPackagesComponent } from "./ChangeServersAndPackagesComponent"
import useFetchApi from "../../../../../../../hook/useFetchApi"
import SWAlert from "../../../../../../../components/SwAlert/SWAlert"

export const ChangeServersAndPackagesForm = ({ reseller, resellers, setResellers, setOpenModal }) => {

    const [formData, setFormData] = useState({
        servers: [...reseller.servers]
    })
    const [changeServer, loading] = useFetchApi({
        url: `/api/emby/resellers/servers/${reseller._id}`,
        method: "PUT"
    })



    const onSubmit = (e) => {
        e.preventDefault();
        const serversToAddFilter = formData.servers.filter(s => s.packages.length > 0);
        changeServer({ body: JSON.stringify({ servers: serversToAddFilter }) })
            .then(data => {
                SWAlert.alert({
                    title: "Updated"
                })

                setOpenModal(false)

            })
            .catch(error => {
                SWAlert.error({
                    title: error.message
                })
            })

    }

    return (
        <form onSubmit={onSubmit}>
            <ChangeServersAndPackagesComponent formData={formData} setFormData={setFormData} />

            <div className=" d-flex gap-3">
                <button className="btn btn-primary">Actualizar</button>
            </div>

        </form>
    )
}
