import React from 'react'
import { useGetPackagesByAccount } from '../../../../../hook/jellyfin/useGetPackagesByAccount';

export const PackagesSelected = ({ server, server_id, formData, setFormData }) => {
    const [packages, setPackages, loadingPackages] = useGetPackagesByAccount(server_id);

    const onChangePackages = (pk) => {
        const servers = [...formData.servers];
        const serverPos = servers.findIndex(s => s.server == server_id);


        const existe = servers[serverPos].packages.find(p => p === pk._id);
        if (!existe) {
            servers[serverPos].packages.push(pk._id);
            setFormData({ ...formData, servers });
        } else {
            const packagesUpdated = servers[serverPos].packages.filter(p => p != pk._id);
            servers[serverPos].packages = packagesUpdated;
            setFormData({ ...formData, servers })

        }
    }

    return (
        <>
            <div className="server fw-bold  text-center">
                <u>{server.data.name} PAQUETES:</u>
                <hr />
            </div>
            <div className="packages__emby">
                {
                    packages.map(pk => {
                        const server = formData.servers.find(s => s.server == server_id);
                        let existe = server ? server.packages.find(p => p == pk._id) : null;
                        return (
                            <div className={`package ${existe && "active"} `} onClick={() => onChangePackages(pk)} key={pk._id}>
                                <div className="name">
                                    {existe ? "✔" : "⛔"} {pk.name}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
