import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon';
import { CoinPlusIcon } from '../../../../components/icons/InputWithIcon/CoinPlusIcon';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import Modal from '../../../../components/modal/Modal';
import Pruebas from '../../../../components/Pruebas';
import { SearchInput } from '../../../../components/UsersList/SearchInput/SearchInput';
import useFetchApi from '../../../../hook/useFetchApi';
import { AddCredits } from '../AddCredits/AddCredits';
import { Alert, AlertToDelete } from '../AlertToDelete/AlertToDelete';
import { EditDevice } from '../EditDevice/EditDevice';
import { Reactivate } from '../Reactivate/Reactivate';
import "./Devices.scss";
import { Amazon } from './images/Amazon';
import Kodi from './images/Kodi';
import { Plex } from './images/Plex';
import { Roku } from './images/Roku';
import { Samsung } from './images/Samsung';
import { Filters } from '../Filters/Filters';
const utils = require('../../../../utils/date/index');

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)
export const Devices = ({ devicesState, setDevicesState }) => {
    // State
    const [myDevices, setMyDevices] = useState([]);
    const [deviceToDelete, setDeviceToDelete] = useState(null);
    const [openModalToDelete, setOpenModalToDelete] = useState(false);
    const [openModalToEdit, setOpenModalToEdit] = useState(false);
    const [openModalToAddCredits, setOpenModalToAddCredits] = useState(false);
    const [deviceToAddCredits, setdeviceToAddCredits] = useState(false);
    const [deviceToEdit, setDeviceToEdit] = useState(null);
    const [reactivateDevice, setReactivateDevice] = useState(null);
    const [openModalToReactivateDevice, setOpenModalToReactivateDevice] = useState(false);
    const [filterDevices, setFilterDevices] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [sellers, setSellers] = useState([]);


    //Custom Hooks
    const [getDevices, loading] = useFetchApi({
        url: `/api/byCode/`,
        method: 'GET',
    })




    // Effects
    useEffect(() => {
        getDevices().then(data => {
            setMyDevices(data)
            setFilterDevices(data);
            const allAccounts = data.reduce((acc, dev) => {
                if (!acc.includes(dev.account?.email)) {
                    if (dev.account) {
                        acc.push(dev.account?.email)
                    }
                }
                return acc;
            }, [])

            const allSellers = data.reduce((acc, dev) => {
                if (!acc.includes(dev.seller?.email)) {
                    if (dev.seller) {
                        acc.push(dev.seller?.email)
                    }
                }
                return acc;
            }, [])

            setAccounts(allAccounts);
            setSellers(allSellers);
        })
    }, [devicesState])

    // Functions
    const getImages = (device) => {
        let imagen = device.vendor == "Samsung" ? <Samsung /> :
            device.vendor == "Amazon" ? <Amazon /> :
                device.platform == "Kodi" ? <Kodi /> : <Plex />

        return imagen;

    }


    const search = (e) => {
        const filter = myDevices.filter(d => {
            if (e.target.value != "") {
                return d.name.toLowerCase().includes(e.target.value.toLowerCase()) || d.email.toLowerCase().includes(e.target.value.toLowerCase())
            } else {
                return d
            }

        })
        setFilterDevices(filter)


    }
    return (
        <div className='Devices container'>
            <SearchInput onChange={search} />
            <Filters sellers={sellers} accounts={accounts} myDevices={myDevices} filterDevices={filterDevices} setFilterDevices={setFilterDevices} />

            {/* <Pruebas/> */}

            <h2>
                {loading ? "Cargando Espere..." : ` Dispositivos:${myDevices.length}`}
                <hr />
            </h2>
            <div className="devices__list">
                {
                    myDevices.length > 0 && filterDevices.map(device => {
                        const isExpired = utils.isExpired(device.expireAt);
                        return (
                            <div key={device._id} className={`device ${isExpired && "expired"}`}>
                                <div className="header">
                                    <label><i className="fa-solid fa-microchip"></i> {device.device.id}</label>
                                    <div className="logo">
                                        {getImages(device.device)}
                                        <div className="email">
                                            {device.email}
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                                <small className="body">
                                    <div className="name">
                                        {device.name}
                                    </div>

                                    <small className="brand">
                                        {device.device.vendor || device.device.platform}
                                    </small>
                                </small>

                                <div className="footer ">
                                    <small className="account">

                                        {device?.account?.email}
                                    </small>

                                    <div className="expireAt">

                                        <div className="date">
                                            {utils.formatDate(device.expireAt, "DD/MMM/YYYY HH:mm:ss")}
                                        </div>
                                    </div>

                                    {isExpired ? <small className='text-danger'>Vencido</small> :
                                        <small className='text-success'>Active</small>
                                    }
                                </div>

                                <div className="options">
                                    <ul>
                                        <li onClick={() => {
                                            setDeviceToEdit(device);
                                            setOpenModalToEdit(true)
                                        }}><EditSquareIcon /></li>
                                        <li onClick={() => {
                                            setReactivateDevice(device);
                                            setOpenModalToReactivateDevice(true)
                                        }}>
                                            <i className="fa-solid fa-tachograph-digital"></i>
                                        </li>
                                        <li onClick={() => {
                                            setOpenModalToAddCredits(true);
                                            setdeviceToAddCredits(device);
                                        }}><CoinPlusIcon /></li>
                                        <li onClick={() => {
                                            setDeviceToDelete(device)
                                            setOpenModalToDelete(true)
                                        }}><TrashIcon /></li>

                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }

            </div>


            {openModalToDelete &&
                <Modal setOpenModal={setOpenModalToDelete} title="Emilinar dispocitivo">
                    <AlertToDelete setOpenModal={setOpenModalToDelete} setDevicesState={setDevicesState} deviceToDelete={deviceToDelete} />
                </Modal>
            }

            {openModalToEdit &&
                <Modal setOpenModal={setOpenModalToEdit} title={`Editar a ${deviceToEdit.name}`}>
                    <EditDevice setOpenModal={setOpenModalToEdit} setDevicesState={setDevicesState} deviceToEdit={deviceToEdit} />
                </Modal>
            }

            {openModalToAddCredits &&
                <Modal setOpenModal={setOpenModalToAddCredits} title={`Agregar creditos a ${deviceToAddCredits.name}`}>
                    <AddCredits setDevicesState={setDevicesState} deviceToAddCredits={deviceToAddCredits} setOpenModal={setOpenModalToAddCredits} />
                </Modal>
            }

            {openModalToReactivateDevice &&
                <Modal setOpenModal={setOpenModalToReactivateDevice} title={`Reactivar a ${reactivateDevice.name}`}>

                    <Reactivate setDevicesState={setDevicesState} deviceToReactivate={reactivateDevice} setOpenModal={setOpenModalToReactivateDevice} />
                </Modal>
            }



        </div>
    )
}
