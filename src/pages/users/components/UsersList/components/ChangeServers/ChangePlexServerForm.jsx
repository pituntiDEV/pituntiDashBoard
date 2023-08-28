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

export const ChangePlexServerForm = ({ user, setOpenModal, langPage }) => {


    const [formData, setFormData] = useState([]);
    //Hooks
    const [updateServers, loadingUpdating] = useFetchApi({
        url: `/api/plex/user/servers/${user._id}`,
        method: "PUT"
    })
    //Constext
    const { users, setUsers } = useContext(Context);
    const { plex } = useContext(appContext);
    const servers = plex.servers;

    //Iniciar formData con los paquetes que ya tengo agregados
    useEffect(() => {
        const initialData = [];
        for (const server of user.servers) {
            initialData.push({
                server: server,
                packages: user.packages.filter(p => p.server == server._id)
            })
        }
        setFormData([...formData, ...initialData]);
    }, [])




    const onChangePack = (pk) => {
        const serversFormData = [...formData];
        const serverFormDataFind = serversFormData.find(f => f.server._id == pk.server);
        if (serverFormDataFind) {
            const serverFormDataPackages = serverFormDataFind.packages;
            const packExiste = serverFormDataPackages.find(p => p._id == pk._id);
            if (!packExiste) {
                serverFormDataPackages.push(pk);
                setFormData(serversFormData);
            } else {
                const serversUpdated = serverFormDataPackages.filter(p => p._id != pk._id);
                serverFormDataFind.packages = serversUpdated;
                setFormData(serversFormData);
                if (serverFormDataFind.packages.length == 0) {
                    const serversUpdated = serversFormData.filter(s => s.server._id != serverFormDataFind.server._id);
                    setFormData(serversUpdated);

                }
            }

        } else {
            //Si no encuentra un server en formData [Agregarlo]
            const serverFind = servers.find(s => s._id == pk.server);
            serversFormData.push({
                server: serverFind,
                packages: [pk]
            })

            setFormData(serversFormData);
        }

    };

    const submit = (e) => {
        e.preventDefault();
        const dataToSend = formData.map(s => {
            return {
                server: s.server._id,
                packages: s.packages.map(p => p._id)
            }
        })
        updateServers({ body: JSON.stringify({ servers: dataToSend }) })
            .then(data => {
                SWAlert.alert({
                    title: "Aupdated"
                });
                const usersUpdated = [...users];
                const updateUser = usersUpdated.find(u => u._id == user._id);
                updateUser.packages = formData.map(f => f.packages).flat();
                console.log(updateUser.packages);
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
                                        const serverFormData = formData.find(f => f.server._id == server._id);
                                        const existe = serverFormData?.packages?.find(p => p._id == pk._id);

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
