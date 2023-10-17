import React, { useState } from 'react'
import { useGetEmbyAccounts } from '../../../../../../../hook/jellyfin/useGetEmbyAccounts'
import { useGetPackagesByAccount } from '../../../../../../../hook/jellyfin/useGetPackagesByAccount';
import { useGetAllPackages } from '../../../../../../../hook/jellyfin/useGetAllPackages';
import "./ChangeServersAndPackagesComponent.scss";
import { ServerIcon } from '../../../../../../../components/icons/ServerIcon';
export const ChangeServersAndPackagesComponent = ({ formData, setFormData }) => {
    const [myServers, loading] = useGetEmbyAccounts();


    const [packages, loadingPackages] = useGetAllPackages()

    const onChangePack = async (pack, server) => {
        const serverIsSelected = formData.servers.findIndex(s => s.server == String(server._id));



        if (serverIsSelected >= 0) {
            const packageIsSelected = formData.servers[serverIsSelected].packages.findIndex(p => p == String(pack._id));
            if (packageIsSelected < 0) {
                const updateServers = [...formData.servers];
                const selectedServer = updateServers[serverIsSelected];
                selectedServer.packages.push(pack._id);
                setFormData({ ...formData, servers: updateServers })



            } else {
                const updateServers = [...formData.servers];
                const selectedServer = updateServers[serverIsSelected];
                selectedServer.packages = selectedServer.packages.filter(p => p != pack._id);
                setFormData({ ...formData, servers: updateServers })


            }

        } else {
            const addServer = [...formData.servers]
            addServer.push({
                server: server._id,
                packages: [pack._id]
            })

            setFormData({ ...formData, servers: addServer })
        }

    }
    return (
        <div className='ChangeServersAndPackages servers'>
            {myServers.map((serverAcc) => {
                const findInSelectedServer = formData.servers?.find(s => s.server == serverAcc._id);
                const packagesInSelected = findInSelectedServer ? findInSelectedServer.packages : [];


                return (
                    <div key={serverAcc._id} className="server">
                        <ServerIcon /> {serverAcc.data.name}
                        <div className="packages">
                            {packages.filter(p => p.account == serverAcc._id).map(pack => {
                                return <div key={pack._id} className={`pack ${packagesInSelected.includes(pack._id) && "active"}`} onClick={() => onChangePack(pack, serverAcc)}>{pack.name}</div>
                            })}
                        </div>
                        <hr />
                    </div>
                )
            })}

        </div>
    )
}
