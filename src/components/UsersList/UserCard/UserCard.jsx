import React from 'react'

import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon'

import { Options } from './Options/Options'
import "./UserCard.scss"
import dayjs from 'dayjs'
export const UserCard = ({ user,setNewUserState }) => {
  const expireAt = dayjs(user.credits[user.credits.length - 1]?.expireAt,"YYYY-MM-DD").format("DD/MMM/YYYY") || null;
  const isExpired = dayjs(dayjs()).isAfter(expireAt);

  return (
    <div className={`user__card ${isExpired && "expired"}`} key={user._id}>
      {/* header */}
      <div className={`card__header  ${isExpired && "expired"}`}> 
        <div className='email'>{user.email}</div>
          <img src={ user.data[0]?.invited?.thumb||user.data?.invited?.thumb} alt="" />
      </div>

      {/* body */}
      <div className='card__body'>

        <div className="user__info">
          <InputWithIcon>
            {/* <UserTieIcon /> */}
            <i className="fa-solid fa-id-card"></i>
            <span> {user.name}</span>
          </InputWithIcon>
          <InputWithIcon>
            {/* <ServerIcon /> */}
            <i className="fa-solid fa-share-nodes"></i>
            <small> {user?.data[0] && user.data.map(d=>d.name).join(",") || user?.data.name} </small>
          </InputWithIcon>

          <InputWithIcon>
          <i className="fa-solid fa-clock"></i>
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
