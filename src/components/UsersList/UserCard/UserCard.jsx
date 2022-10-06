import React from 'react'
import { CancelIcon } from '../../icons/CancelIcon'
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon'
import { ServerIcon } from '../../icons/ServerIcon'
import { UserTieIcon } from '../../icons/UserTieIcon'
import { Options } from './Options/Options'
import "./UserCard.scss"
import dayjs from 'dayjs'
export const UserCard = ({ user,setNewUserState }) => {
  const expireAt = dayjs(user.credits[user.credits.length - 1]?.expireAt,"YYYY-MM-DD").format("DD/MMM/YYYY") || null;
  const isExpired = dayjs(dayjs()).isAfter(expireAt);

  return (
    <div className={`user__card ${isExpired && "expired"}`} key={user._id}>
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
          <i className="fa-solid fa-at"></i>
            <div>{user.email}</div>
          </InputWithIcon>

          <InputWithIcon>
            <ServerIcon />
            <small> {user?.data?.name} </small>
          </InputWithIcon>

          <InputWithIcon>
          <CancelIcon/>
          <small>{user.credits[user.credits.length - 1] ? expireAt:"null"}</small>
          </InputWithIcon>
        </div>
         
      </div>

      <div className="card__options">
        <Options setNewUserState={setNewUserState} user={user} />
      </div>

    </div>
  )
}
