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
import { Migrate } from '../Migrate/Migrate';

export const UsersList = () => {
    const { lang } = useContext(appContext);

    const [selectedUsers, setSelectedUsers] = useState([]);

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

            {selectedUsers.length > 0 &&
                <Migrate setSelectedUsers={setSelectedUsers} users={selectedUsers} />
            }
            {
                loading ? <Spinner />
                    :
                    <div className="users-list-container">
                        {
                            users.map(user => {
                                const props = { user, users, setUsers }
                                return <Card selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} lang={lang} key={user._id} {...props} />
                            })
                        }
                    </div>
            }
        </div>
    )
}
