import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Loading } from '../../../../../components/Loading/Loading';
import SWAlert from '../../../../../components/SwAlert/SWAlert';
import { ToggleSwhich } from '../../../../../components/ToggleSwhich/ToggleSwhich';
import { appContext } from '../../../../../context/AppContext';
import useFetchApi from '../../../../../hook/useFetchApi';
import { useGetPlexAccounts } from '../../../../../hook/useGetPlexAccounts';

import "./ActivateForm.scss";
export const ActivateForm = ({ setOpenModal, setDevicesState }) => {
    //Context
    const applicationContexts = useContext(appContext);
    const myInfo = applicationContexts.state.account_data;

    //States
    const [isOwner, setIsOwner] = useState(false);
    const [accountsShareWithMe, setAccountsShareWithMe] = useState([]);
    const [provider, setProvider] = useState(null);
    const [credits, setCredits] = useState([]);
    const [isDemo, setIsDemo] = useState(false);


    //Customs Hooks
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        credits: 0,
        account_id: "",
        demoTime: 0,
        whatsapp: "",
        deleteAt: 0
    })
    const [activate, loading] = useFetchApi({
        url: `/api/byCode/`,
        method: "POST",
    })

    const [accounts, loadingAccounts] = useGetPlexAccounts();
    const [getAccountsShareWithMe] = useFetchApi({
        url: `/api/byCode/accounts/shrare`,
        method: "GET",
    })

    const [getCredits] = useFetchApi({
        url: `/api/byCode/credits?provider=${provider}`,
        method: "GET",
    })


    //Effects Hook
    useEffect(() => {
        getAccountsShareWithMe().then(data => {
            const allAccounts = data.reduce((acc, cuenta) => {
                for (const account of cuenta.accounts) {
                    if (!acc.some(a => a._id == account._id)) {
                        acc.push(account)
                    }
                }
                return acc
            }, [])

            setAccountsShareWithMe(allAccounts)
        })
    }, [])

    useEffect(() => {
        const accontToVerify = accounts.find(a => a._id == formData.account_id);
        if (myInfo?._id == accontToVerify?.admin) {
            setIsOwner(true);
        }
    }, [formData.account_id])


    useEffect(() => {
        const getAccount = accountsShareWithMe.find(a => a._id == formData.account_id);
        if (!getAccount) return;
        setProvider(getAccount.admin)
        provider && getCredits().then(data => {
            console.log(data)
            setCredits(data)
        })
    }, [formData.account_id, isOwner, provider])

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    //Functions
    const submit = (e) => {
        e.preventDefault();

        activate({
            body: JSON.stringify({ ...formData, isDemo })
        }).then(data => {
            SWAlert.alert({
                title: data.message
            })
            setOpenModal(false)
            setDevicesState(devicesState => !devicesState);
        })
            .catch(error => {
                SWAlert.error({
                    title: error.message
                })
            })
    }
    return (
        <form onSubmit={submit} className="activate__form">

            <div className="form_group">
                <h3>Demo:</h3>
                <ToggleSwhich onChange={(e) => {
                    setIsDemo(e.target.checked)
                }} />
                {isDemo &&
                    <label htmlFor="" className='alert mt-3 alert-warning'>Este sera un DEMO</label>
                }
            </div>

            <div className="form_group">
                <label htmlFor="account">Cuenta de plex</label>
                <select id="account_id" onChange={onChange} defaultValue={""}>
                    <option value="" disabled>Selecciona una cuenta</option>
                    {
                        accounts.map(account => <option key={account._id} value={account._id}>{account.email}</option>)
                    }

                    {
                        accountsShareWithMe.map(account => <option key={account._id} value={account._id}>{account.email}</option>)
                    }
                </select>
            </div>
            <div className="form_group">
                <label htmlFor="name">Nombre:</label>
                <input required onChange={onChange} type="text" placeholder='Nombre' id="name" />
            </div>
            <div className="form_group">
                <label htmlFor="email">Email:</label>
                <input onChange={onChange} type="email" required placeholder='Email' id="email" />
            </div>
            <div className="form_group">
                <label htmlFor="whatsapp">Whatsapp:</label>
                <input onChange={onChange} type="text" placeholder='whatsapp' id="whatsapp" />
            </div>
            <div className="form_group">
                <label htmlFor="code">Codigo:</label>
                <input required onChange={onChange} type="text" minLength={4} placeholder='Codígo de activacíon' name="code" id="code" />
            </div>
            {isOwner && !isDemo ?
                <div className="form_group">
                    <label htmlFor="credits">Creditos</label>
                    <input onChange={onChange} type="number" required placeholder='Credist' min={1} id="credits" />
                </div >
                : !isOwner && !isDemo && formData.account_id ?
                    <div className="form_group" >
                        <label htmlFor="credits">Mes:</label>
                        <select defaultValue={''} onChange={onChange} required placeholder='Credist' id="credits">
                            <option value="" disabled>Mes</option>
                            {
                                credits.map((credit, i) => {
                                    return (
                                        <option value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    : ""
            }

            {isOwner && isDemo &&
                <div className="form_group">
                    <label htmlFor="credits">Tiempo del demo HR</label>
                    <input onChange={onChange} type="number" name="demoTime" required placeholder='Horas de demo' min={1} id="demoTime" />
                </div >
            }

            {isOwner &&
                <div className="form_group">
                    <label htmlFor="deleteAt">Eliminar despues de vencido(DIAS)</label>
                    <input onChange={onChange} type="number" name="deleteAt" id="deleteAt" placeholder='Dejar en blanco para no eliminar' min={0} />
                </div >
            }



            {!loading &&
                <button type='submit'>
                    Activar
                </button>}

            {loading && <Loading title={`Por favor Espere  .....`} />}
        </form>
    )
}
