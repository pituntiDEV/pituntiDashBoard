import React from 'react'
import { useContext } from 'react'
import { Context } from '../../PlexUsersContext'
import { useState } from 'react';
import { useFilter } from '../../UsersList/hooks/useFilter';
import { Card } from './Card';
import { FilterBar } from './FilterBar';
import "./UsersList.scss";
import { Spinner } from '../../../../components/Spinner/Spinner';

export const UsersList = () => {

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
                <FilterBar users={users} setFilterValue={setFilterValue} />
            </div>
            {
                loading ? <Spinner />
                    :
                    <div className="users-list-container">
                        {
                            users.map(user => {
                                const props = { user, users, setUsers }
                                return <Card key={user._id} {...props} />
                            })
                        }
                    </div>
            }
        </div>
    )
}
