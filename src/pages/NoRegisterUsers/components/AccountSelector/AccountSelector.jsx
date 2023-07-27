import React from 'react'
import { useContext } from 'react'
import { Context } from '../../NoRegisterContext'
import "./AccountSelector.scss"
import useFetchApi from '../../../../hook/useFetchApi'
import config from '../../../../config'
import { useGetUsersFromPlex } from '../../../../hook/useGetUsersFromPlex'
export const AccountSelector = ({ setFormData }) => {
    //States
    const { accounts, setUsers, setPlexUsers, setAccountID, setLoading } = useContext(Context);
    //Hooks
    const [getUsers, loadingPlexUsers] = useGetUsersFromPlex();
    const [getAllUsers, loadingGetAllUsers] = useFetchApi({ url: config.apiUrls.plex.getAllUsers, method: "GET" });

    //Functions
    const onchange = async (e) => {
        setLoading(true);
        const accountID = e.target.value;
        const account = accounts.find(acc => acc._id == accountID);
        const token = account.data.user.authToken;

        const allUsersDB = await getAllUsers();
        const plexUsers = await getUsers(token);
        setUsers(allUsersDB);
        setPlexUsers(plexUsers);
        setLoading(false)
        setAccountID(accountID)

    }

    return (
        <div className='no-regiter-account-selector'>

            <div className="select">
                <select onChange={onchange} name="account" defaultValue={""}>
                    <option value="" disabled>Seleccione una cuenta</option>
                    {
                        accounts.map(acc => {
                            return (
                                <option value={acc._id} key={acc._id}>{acc.email}</option>
                            )
                        })
                    }
                </select>

                <button className='buscar'>Buscar</button>

            </div>
        </div>
    )
}
