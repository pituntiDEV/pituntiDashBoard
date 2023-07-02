import React from 'react'
import "./UsersList.scss";
import utils from "../../../../../utils/date/index"
import { EditEmbyUser } from '../EditEmbyUser';
import { DeleteEmbyUser } from '../DeleteEmbyUser';
import { AddCreditsEmbyUser } from '../AddCreditsEmbyUser';
import { ChangeServer } from '../ChangeServer';
export const EmbyUsersList = ({ users, setUsers, setUpdateUserState }) => {

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
                                    <ChangeServer user={user} setUsers={setUsers} users={users} />
                                    <AddCreditsEmbyUser setUpdateUserState={setUpdateUserState} user={user} />
                                    <DeleteEmbyUser setUpdateUserState={setUpdateUserState} user={user} />
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
