import React from 'react'
import "./UsersList.scss";
import utils from "../../../../../utils/date/index"
import { EditEmbyUser } from '../EditEmbyUser';
import { DeleteEmbyUser } from '../DeleteEmbyUser';
import { AddCreditsEmbyUser } from '../AddCreditsEmbyUser';
export const EmbyUsersList = ({ users ,setUpdateUserState }) => {
    const findExpireDate = (credits) => {
        const credito = credits.filter(credit => !utils.isExpired(credit.expireAt));
        return {
            expired: credito[0] ? false : true,
            expireAt:  utils.formatDate(credits[credits.length - 1].expireAt),
            current: credito[0] || credits[credits.length - 1]
        }
    }
    return (
        <div className='emby__users__container container'>
            <div className="emby__users__list">
                {users.map((user) => {
                    const expiration = findExpireDate(user.credits)
                    return (
                        <div className='user' key={user._id}>
                            <div className="header">
                                {user.email}
                            </div>

                            <div className="body">
                                <div className="name">
                                    {user.name}
                                </div>
                                <hr />
                                <div className="expireDate">
                                    {expiration.expireAt}
                                </div>
                            </div>
                            <hr />
                            <div className="footer">
                                    {/* {expiration.current.connections} */}
                                <ul>
                                    <EditEmbyUser/>
                                    <AddCreditsEmbyUser setUpdateUserState={setUpdateUserState} user={user}/>
                                    <DeleteEmbyUser setUpdateUserState={setUpdateUserState} user={user}/>
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
