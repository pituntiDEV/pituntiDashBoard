import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../../PlexUsersContext'
import { useState } from 'react';
import { useFilter } from '../../UsersList/hooks/useFilter';
import { Card } from './Card';
import { FilterBar } from './FilterBar';
import "./UsersList.scss";
import { Spinner } from '../../../../components/Spinner/Spinner';
import { appContext } from '../../../../context/AppContext';

export const UsersList = () => {
    const { lang } = useContext(appContext)

    const [filterValue, setFilterValue] = useState({
        nameOrEmail: "",
        seller: "",
        state: "",
        byExpireDay: "",
        server: ""
    });
    const [users] = useFilter(filterValue);
    const { setUsers, loading } = useContext(Context);
    return (
        <div className='users-list'>
            <div className="filter-bar">
                <FilterBar lang={lang} users={users} setFilterValue={setFilterValue} />
            </div>
            {
                loading ? <Spinner />
                    :
                    <div className="users-list-container">
                        {
                            users.map(user => {
                                const props = { user, users, setUsers }
                                return <Card lang={lang} key={user._id} {...props} />
                            })
                        }
                    </div>
            }
        </div>
    )
}
