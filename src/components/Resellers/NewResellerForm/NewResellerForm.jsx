import React from 'react'
import { useState } from 'react';
import useFetchApi from '../../../hook/useFetchApi';
import SWAlert from '../../SwAlert/SWAlert';
import { Buttons } from './Buttons/Buttons';
import { CreditsAndConnections } from './CreditsAndConnections/CreditsAndConnections';
import "./NewResellerForm.scss";
import { ResellerConfig } from './ResellerConfig/ResellerConfig';
import { SearchReseller } from './SearchReseller/SearchReseller';
import { ServerList } from './ServerList/ServerList';
export const NewResellerForm = ({ setOpenModal, resellers, setResellers }) => {

    //State
    const [state, setState] = useState({
        reseller: "",
        servers: [],
        credits: 0,
        connections: 0,
        deleteUsers: true,
        deleteUsersDays: 6,
        removeUsersLibs: true,
        removeUsersLibsDays: 3,
        demos: true,
        demosTime: 60,
        demosTimeFormat: "minutes",
        demosLimit: true,
        demosForDay: 10,

    })

    //Custom Hooks
    const [addReseller, loading] = useFetchApi({
        url: '/api/resellers/add',
    })

    //Initial
    const props = {
        state,
        setState,
    }
    const submit = (e) => {
        e.preventDefault();
        const serversIDS = state.servers.map(server => {
            return {
                server: server.server._id,
                packages: server.packages
            }
        })

        const dataToSend = {
            reseller: state.reseller,
            credits: state.credits,
            connections: state.connections,
            servers: serversIDS,
            deleteUsers: state.deleteUsers,
            deleteUsersDays: state.deleteUsersDays,
            removeUsersLibs: state.removeUsersLibs,
            removeUsersLibsDays: state.removeUsersLibsDays,
            demos: state.demos,
            demosLimit: state.demosLimit,
            demosForDay: state.demosForDay,
            demosTimeFormat: state.demosTimeFormat,
            demosTime: state.demosTime,
        }
        addReseller({
            body: JSON.stringify(dataToSend),
        }).then(data => {
            SWAlert.alert({
                title: data.message || "Reseller Agregado"
            })
            setOpenModal(false);
            setResellers([...resellers, data])

        }).catch((error) => {
            SWAlert.error({
                title: error.message || "Algo salio mal"
            })
        })

    }

    return (
        <form onSubmit={submit} className="new__reseller__form">
            <SearchReseller {...props} />
            <ServerList {...props} />
            <CreditsAndConnections {...props} />
            <ResellerConfig {...props} />
            <Buttons setOpenModal={setOpenModal} />

        </form>
    )
}
