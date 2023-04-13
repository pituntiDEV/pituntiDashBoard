import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../../components/modal/Modal';
import config from '../../config';
import useFetchApi from '../../hook/useFetchApi';
import { useGetAccounts } from '../../hook/useGetAccounts';
import useGetAccountServers from '../../hook/useGetAccountServers'
import { useGetUsersFromPlex } from '../../hook/useGetUsersFromPlex';
import "./NoRegisterUsers.scss";
import { Register } from './Register/Register';

export const NoRegisterUsers = () => {

    //State
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);
    const [users, setUsers] = useState([]);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [userToRegister, setUserToRegister] = useState(null);
    const [usersState, setUSersState] = useState(false);

    //Custom Hooks
    const [getUsersFromPlex, loadingGetUsersFromPlex] = useGetUsersFromPlex();
    const [getAllUsers, loadingGetAllUsers] = useFetchApi({ url: config.apiUrls.plex.getAllUsers, method: "GET" });
    const [getAccounts, , loadingGetAccouns] = useGetAccounts();

    //Effects
    useEffect(() => {
        getAccounts().then(data => {
            setAccounts(data);
        })
    }, [])

    useEffect(() => {
        if (account) {
            searchUsers().then();
        }
    }, [usersState])

    const onChangeServer = (e) => {
        const selectedServer = accounts.find(a => a._id == e.target.value);
        setAccount(selectedServer);
    }
    const searchUsers = async () => {
        if (!account) { return 0; }

        try {
            const token = account.data.user.authToken;

            const allUsersDB = await getAllUsers();
            const allUsersFromPlex = await getUsersFromPlex(token);

            const emails = allUsersDB.map(u => u.email.toLowerCase());
            console.log(allUsersFromPlex);
            const usersNoRegsiters = allUsersFromPlex.filter(u => !emails.includes(u.email && u.email.toLowerCase()));
            setUsers(usersNoRegsiters);

        } catch (error) {
            console.log(error)
        }



    }
    return (
        <div className='no_register_users container'>
            <section className='search_bar' >
                <select onChange={onChangeServer} defaultValue={""} name="" id="">
                    <option value="" disabled>Cuenta de PLEX</option>
                    {
                        accounts.map(account => {
                            return <option key={account._id} value={account._id}>{account.email}</option>
                        })
                    }
                </select>
                <button onClick={searchUsers}>Buscar</button>

            </section>


            {loadingGetUsersFromPlex ? "Loading...." :

                <section className='users'>
                    {
                        users.map(user => {
                            return (
                                <div onClick={() => {
                                    setUserToRegister(user);
                                    setOpenRegisterModal(true)
                                }} key={user.id} className='user'>
                                    <span className='email'>{user.email}</span>
                                    <span className={`${user.status && "active"}`}>{user.status}</span>
                                    <p>{user.id}</p>
                                </div>)
                        })
                    }

                    {openRegisterModal &&
                        <Modal setOpenModal={setOpenRegisterModal} title="Registrar usuario">
                            <Register account={account} setOpenModal={setOpenRegisterModal} setUSersState={setUSersState} user={userToRegister} />
                        </Modal>}
                </section>
            }
        </div>
    )
}
