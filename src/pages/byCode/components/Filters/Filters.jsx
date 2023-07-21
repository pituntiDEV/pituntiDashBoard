import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import "./Filters.scss";
import utils from "../../../../utils/date/index";

export const Filters = ({ accounts, sellers, filterDevices, myDevices, setFilterDevices }) => {
    const [dataToFilter, setDataToFilter] = useState({
        state: "",
        account: "",
        seller: "",
        byDay: ""
    })

    const onChange = (e) => {
        setDataToFilter({ ...dataToFilter, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const filterByState = (device) => {
            if (dataToFilter.state != "") {

                if (dataToFilter.state == "active") {
                    return !utils.isExpired(device.expireAt)
                } else if (dataToFilter.state == "expired") {
                    return utils.isExpired(device.expireAt)
                }
            }
            return device
        }
        const filterByAccounts = (device) => {
            if (dataToFilter.account) {
                return device?.account?.email == dataToFilter.account
            }

            return device
        }
        const filterBySellers = (device) => {
            if (dataToFilter.seller) {
                return device?.seller?.email == dataToFilter.seller
            }

            return device
        }
        const filterByExpireDay = (device) => {
            if (dataToFilter.byDay) {
                const diasFaltantes = utils.remainingTime(device.expireAt);
                console.log(diasFaltantes);
                if (diasFaltantes < dataToFilter.byDay) {
                    return device;
                }

            } else {
                return device

            }

        }
        const filters = myDevices.filter(filterByExpireDay).filter(filterByState).filter(filterByAccounts).filter(filterBySellers);
        setFilterDevices(filters)
    }, [dataToFilter])
    return (
        <div className='by_code_filters'>
            <span>Filtros:{filterDevices.length}</span>
            <div className="filters">

                <div className="filter">
                    Estado
                    <div className="input">
                        <select onChange={onChange} defaultValue={""} name="state" id="">
                            <option value="">Todas los estados</option>
                            <option value="active">Activos</option>
                            <option value="expired">Vencido</option>
                        </select>
                    </div>
                </div>

                <div className="filter">
                    Proxiomo a vencer
                    <div className="input">
                        <input onChange={onChange} type="number" name="byDay" placeholder='By Expire Day' id="" />
                    </div>
                </div>

                <div className="filter">
                    Cuenta plex
                    <div className="input">
                        <select onChange={onChange} defaultValue={""} name="account" id="">
                            <option value="">Todas la cuentas</option>
                            {
                                accounts.map(acc => {
                                    return (
                                        <option key={acc} value={acc}>{acc}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="filter">
                    Vendedores
                    <div className="input">
                        <select onChange={onChange} defaultValue={""} name="seller" id="">
                            <option value="">Todos los vendedores</option>
                            {
                                sellers.map(acc => {
                                    return (
                                        <option key={acc} value={acc}>{acc}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>

        </div>
    )
}
