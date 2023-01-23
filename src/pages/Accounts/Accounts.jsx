import React, { useState } from 'react'
import { AccountList } from '../../components/Accounts/AccountList/AccountList';
import { PlexSecureIcon } from '../../components/icons/PlexSecureIcon/PlexSecureIcon';
import Modal from '../../components/modal/Modal';
import SWAlert from '../../components/SwAlert/SWAlert';
import useFetchApi from '../../hook/useFetchApi';
import Plex from '../../services/Plex';
import "./Accounts.scss";
import { NewEmbyAccountForm } from './components/NewEmbyAccountForm/NewEmbyAccountForm';
export const Accounts = () => {
    //State
    const [openModal, setOpenModal] = useState(false);
    const [openModalToEmby, setOpenModalToEmby] = useState(false);
    const [wating, setWating] = useState(false);
    const [newAccountState, setNewAccountState] = useState(false);
    const [totalAccounts, setTotalAccounts] = useState(0);

    //Custom hooks
    const [addAccount, loading] = useFetchApi({
        url: `/api/plex/account`,
        method: 'POST',
    })

    //Services
    const plexServices = new Plex();


    //Functions
    const login = async () => {
        try {
            setWating(true);
            const token = await plexServices.login();
            const account = await plexServices.getAccount(token);
            const newAccount = await addAccount({ body: JSON.stringify({ account }) });
            setWating(false);
            SWAlert.success({
                title: newAccount.message
            })
            setNewAccountState(a => !a)

        } catch (error) {
            SWAlert.error({
                title: error.message
            })
            setWating(false);
        }

    }

    return (
        <div className="accounts__container container">
            <div className="accounts__bar ">
                <span>Total {totalAccounts} Account</span>
                <div className="btn-group">
                    <button onClick={() => setOpenModal(true)}>New Plex Account</button>
                    {/* <button onClick={() => setOpenModalToEmby(true)}>New Emby Account</button> */}
                </div>
            </div>
            <AccountList setTotalAccounts={setTotalAccounts} newAccountState={newAccountState} />

            {openModal &&
                <Modal setOpenModal={setOpenModal} title="New Account">
                    {!wating ? <div className="login_plex_form" >
                        <div className="login" onClick={login}>
                            <PlexSecureIcon />
                            <span>Login secure with PLEX</span>

                        </div>
                    </div> :
                        <div className="loading_for_new_account">
                            <div className="loading">
                                <span className="title"> Loading...</span>
                                <img src="https://cdn4.iconfinder.com/data/icons/pixel-web-part-1/512/sand_2-512.png" />
                            </div>
                        </div>
                    }

                </Modal>}

            {openModalToEmby &&
                <Modal title="Nueva cuenta emby" setOpenModal={setOpenModalToEmby}>
                   <NewEmbyAccountForm/>
                </Modal>
            }
        </div>
    )
}
