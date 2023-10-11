import React from 'react'
import "./UsersList.scss";
import utils from "../../../../../utils/date/index"
import { EditEmbyUser } from '../EditEmbyUser';
import { DeleteEmbyUser } from '../DeleteEmbyUser';
import { AddCreditsEmbyUser } from '../AddCreditsEmbyUser';
import { ChangeServer } from '../ChangeServer';
import { useContext } from 'react';
import { Context } from '../../JellyfinUsersContext';
export const JellyfinUsersList = () => {
    const { users, setUsers } = useContext(Context)

    return (
        <div className='emby__users__container container'>
            <div className="emby__users__list">
                {users.map((user) => {
                    const isExpired = utils.isExpired(user.expireAt);
                    const props = { user, users, setUsers }
                    return (
                        <div className={`user ${isExpired && "expired"}`} key={user._id}>
                            <div className="header">
                                <div className="initial_letter">
                                    {user.email[0]}
                                </div>
                                {user.email}
                            </div>

                            <div className="body">
                                <div className="name">
                                    {user.name}
                                </div>
                                <hr />
                                <div className="expireDate">
                                    {utils.formatDate(user.expireAt)}
                                </div>
                            </div>
                            <hr />
                            <div className="footer">
                                {/* {expiration.current.connections} */}
                                <ul>
                                    <EditEmbyUser {...props} />
                                    <ChangeServer  {...props} />
                                    <AddCreditsEmbyUser {...props} />
                                    <DeleteEmbyUser {...props} />
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
