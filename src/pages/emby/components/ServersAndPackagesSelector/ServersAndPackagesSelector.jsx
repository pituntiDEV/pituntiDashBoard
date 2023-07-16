import React from 'react'
import { useState } from 'react';
import { useGetPackagesByAccount } from '../../../../hook/emby/useGetPackagesByAccount';
import useFetchApi from '../../../../hook/useFetchApi';
import { useGetEmbySharedServers } from '../../../../hook/emby/useGetEmbySharedServers';
import { useEffect } from 'react';
import "./ServersAndPackagesSelector.scss";
export const ServersAndPackagesSelector = ({ formData, setFormData }) => {
    const [servers, setServers] = useState([]);
    const [sharedPackages, setSharedPackages] = useState([]);

    // Custom Hooks
    const [packages, , loadingPackagesByAccount] = useGetPackagesByAccount(formData.account || formData.server);


    const [getServers, loadingGetAccounts] = useFetchApi({
        url: `/api/emby/accounts`,
        method: "GET"
    });

    const [sharedServers, loadingSharedServers] = useGetEmbySharedServers();
    // Effects
    useEffect(() => {
        getServers()
            .then(accounts => {
                setServers(accounts)
            })
    }, []);

    // Functions
    const onChangePackages = (pack) => {
        const existe = formData.packages.find(pk => pk._id === pack._id);
        if (!existe) {
            const packagesUpdated = [...formData.packages, pack];
            setFormData({ ...formData, packages: packagesUpdated })
        } else {
            const packagesUpdated = formData.packages.filter(pk => pk._id !== pack._id);
            setFormData({ ...formData, packages: packagesUpdated })
        }
    }

    const onChangeSelect = (e) => {

        const opcionSeleccionada = e.target.options[e.target.selectedIndex];
        const isShared = opcionSeleccionada.getAttribute("data-shared");
        if (isShared) {
            const selectedServer = sharedServers.find(s => s.server._id == e.target.value);
            if (!selectedServer) return;
            setSharedPackages(selectedServer.packages);

        }
        setFormData({ ...formData, account: e.target.value, packages: [] })
    };

    return (
        <div className='EmbyServersAndPackagesSelector'>
            <div className="form__group ">
                <label htmlFor="credits">Server:</label>
                <select onChange={onChangeSelect} required name="account" defaultValue={""} id="account">
                    <option value="" disabled>Selecciona un Server</option>
                    {
                        servers.map(account => {
                            return (
                                <option value={account._id} key={account._id}>
                                    {account.data.name}
                                </option>
                            )
                        })
                    }

                    {
                        sharedServers.map(server => {
                            return (
                                <option data-shared={true} value={server.server._id} key={server.server._id}>
                                    {server.server.data.name}-(Compartido)
                                </option>
                            )
                        })
                    }
                </select>
            </div>


            <div className="form__group">
                <div className="packages">
                    {
                        packages.length > 0 && packages.map(pack => {
                            const isSelected = formData.packages.find(pk => pk._id === pack._id);
                            return (
                                <div onClick={() => onChangePackages(pack)} key={pack._id} className={`pack ${isSelected && "selected"}`}>
                                    {isSelected ? "✔" : "⛔"} {pack.name}
                                </div>
                            )
                        })
                    }

                    {
                        sharedPackages.map(pack => {
                            const isSelected = formData.packages.find(pk => pk._id === pack._id);
                            return (
                                <div onClick={() => onChangePackages(pack)} key={pack._id} className={`pack ${isSelected && "selected"}`}>
                                    {isSelected ? "✔" : "⛔"} {pack.name}
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}
