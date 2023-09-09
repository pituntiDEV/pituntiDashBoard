import React from 'react'
import { useContext } from 'react'
import { Context } from '../../NoRegisterContext'
import { Spinner } from '../../../../components/Spinner/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import "./UsersList.scss";
import { Register } from '../Register/Register';
export const UserList = () => {
    const { loading, users, plexUsers } = useContext(Context);
    const [noRegisteredUsers, setNoRegisteredUsers] = useState([]);

    useEffect(() => {
        const emails = users.map(u => u.email.toLowerCase());
        const ids = users.map(u => String(u.plexUserID));
        // const noRegistered = plexUsers.filter(u => !ids.includes(String(u.invited.id) || !emails.includes(String(u.invited.email))));

        const noRegistered = plexUsers.filter(u => !emails.includes(u.invited.email && u.invited.email.toLowerCase()) && !ids.includes(String(u.invited.id)));
        setNoRegisteredUsers(noRegistered)
    }, [users, plexUsers])




    if (loading) return <Spinner />
    return (
        <div className='no_registered_users_list container'>
            <div className="users_list">
                {
                    noRegisteredUsers.map(user => {
                        return (
                            <Register key={user.id} user={user} />
                        )
                    })
                }

            </div>
        </div>
    )
}
