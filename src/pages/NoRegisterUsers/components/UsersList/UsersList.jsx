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
        const noRegsitered = plexUsers.filter(u => !emails.includes(u.invited.email && u.invited.email.toLowerCase()));
        setNoRegisteredUsers(noRegsitered)
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
