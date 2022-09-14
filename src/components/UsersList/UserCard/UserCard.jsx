import React from 'react'
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon'
import { ServerIcon } from '../../icons/ServerIcon'
import { UserTieIcon } from '../../icons/UserTieIcon'
import { Options } from './Options/Options'
import "./UserCard.scss"
export const UserCard = ({ user }) => {
  return (
    <div className='user__card' key={user._id}>
      {/* header */}
      <div className='card__header'>


      </div>

      {/* body */}
      <div className='card__body'>

        <div className="user__info">
          <img src={user.data?.invited?.thumb} alt="" />
          <InputWithIcon>
            <UserTieIcon />
            <span> {user.name}</span>
          </InputWithIcon>
          <InputWithIcon>
          <i class="fa-solid fa-at"></i>
            <div>{user.email}</div>
          </InputWithIcon>

          <InputWithIcon>
            <ServerIcon />
            <small> {user.data.name} </small>
          </InputWithIcon>
        </div>

      </div>

      <div className="card__options">
        <Options user={user} />
      </div>

    </div>
  )
}
