import React, { useEffect, useState } from 'react'

import "./ChangePlexServer.scss";

import { useContext } from 'react';
import { Context } from '../../../../PlexUsersContext';
import useFetchApi from '../../../../../../hook/useFetchApi';
import useGetAccountServers from '../../../../../../hook/useGetAccountServers';
import SWAlert from '../../../../../../components/SwAlert/SWAlert';
import { Spinner } from '../../../../../../components/Spinner/Spinner';
import { BtnPrimary } from '../../../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../../../components/Buttons/BtnSucess/BtnSecondary';
import { appContext } from '../../../../../../context/AppContext';

export const ChangePlexServerForm = (props) => {
    const { user, setOpenModal, langPage, index } = props;

    const [selectedPackages, setSelectedPackages] = useState([]);

    const [formData, setFormData] = useState({
        ...user,
        servers: user.servers.map(s => {
            return {
                server: s._id,
                packages: user.packages.filter(p => String(p.server) == String(s._id)).map(p => p._id)
            }
        })
    });



    //Hooks
    const [updateServers, loadingUpdating] = useFetchApi({
        url: `/api/plex/user/servers/${user._id}`,
        method: "PUT"
    })
    //Constext
    const { users, setUsers } = useContext(Context);
    const { plex } = useContext(appContext);
    const servers = plex.servers;



    //UseEffects
    useEffect(() => {
        setSelectedPackages(formData.servers.reduce((acc, server) => {
            server.packages.map(p => {
                acc.push(p)
            })
            return acc
        }, []))
    }, [formData])


    const onChangePack = (pk) => {
        const servers = [...formData.servers];
        const serverIndex = servers.findIndex(s => s.server == pk.server);
        if (serverIndex >= 0) {
            let packages = servers[serverIndex].packages;
            const pack = packages.find(p => p == pk._id);
            if (!pack) {
                packages.push(pk._id);
                servers[serverIndex].packages = packages;
                setFormData({ ...formData, servers });
            } else {
                packages = packages.filter(p => p != pk._id);
                servers[serverIndex].packages = packages;
                setFormData({ ...formData, servers });
                if (servers[serverIndex].packages.length == 0) {
                    const serversUpdated = servers.filter(s => s.server != servers[serverIndex].server);
                    setFormData({ ...formData, servers: serversUpdated });

                }
            }

        } else {
            //Si no encuentra un server en formData [Agregarlo]
            const servers = [...formData.servers];
            servers.push({
                server: pk.server,
                packages: [pk._id]
            })

            setFormData({ ...formData, servers });
        }

    };

    const submit = (e) => {
        e.preventDefault();

        updateServers({ body: JSON.stringify({ servers: formData.servers }) })
            .then(data => {
                SWAlert.alert({
                    title: "Aupdated"
                });
                const usersUpdated = [...users];
                usersUpdated[index] = data;
                setUsers(usersUpdated)
                setOpenModal(false);

            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })

    }
    return (
        <form onSubmit={submit} className='change__plex__server'>
            <div className="servers">
                {servers.map(server => {
                    return (
                        <div className='server' key={server._id}>

                            <div className="name">
                                {server.data.name} - {langPage.packages}:
                            </div>
                            <div className="packs">
                                {
                                    server.packages.map(pk => {


                                        const existe = selectedPackages.includes(pk._id);

                                        return (
                                            <div onClick={() => onChangePack(pk)} key={pk._id} className={`pack ${existe && "active"}`}>
                                                {pk.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
            {loadingUpdating ?

                <div className='loading'>
                    <Spinner />
                </div> :
                <div className="d-flex gap-3">
                    <BtnPrimary title={langPage.btnSubmit.change} />
                    <BtnSecondary title={langPage.buttons.cancel} type="button" onClick={() => { }} />
                </div>
            }
        </form>
    )
}
