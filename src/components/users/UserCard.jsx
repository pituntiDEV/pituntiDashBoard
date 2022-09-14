import React from 'react'
import { ServerIcon } from '../icons/ServerIcon'
import { UserTieIcon } from '../icons/UserTieIcon'
import { UserControllButtons } from './UserControllButtons'

export const UserCard = ({ setUser,user, showCoverHandler, showCover, setShowCover }) => {
    return (
        <div className='user' key={user._id}>
            <p><small className="font-weight-bold"> <ServerIcon /> {user.data.name} </small></p>
            <p className='name'><UserTieIcon/> {user.name}</p>
            <div className="control">
                <div className="info">
                    {showCover && showCover._id === user._id && <div className='cover'>
                        <p className='btn-close' onClick={() => setShowCover(null)}></p>
                        <div className='content'>
                            {showCover.type == "info" &&
                                <div>
                                    <h3>INFO:</h3>
                                    <p>Seller:</p>
                                    <p>{user.seller.email}</p>

                                </div>}

                            {showCover.type == "resend" &&
                                <button>Reenviar la solicitud</button>}
                        </div>
                    </div>}
                    <p>{user.email}</p>
                    <img src={user.data?.invited?.thumb} alt="" />

                </div>
                <UserControllButtons setUser={setUser} showCoverHandler={showCoverHandler} user={user} />
            </div>
        </div>
    )
}
