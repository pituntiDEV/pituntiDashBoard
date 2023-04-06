import React from 'react'

import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon'

import { Options } from './Options/Options'
import "./UserCard.scss"
import dayjs from 'dayjs'
import utils from "../../../utils/date/index";
import { WhatsappIcon } from '../../icons/WhatsappIcon'
export const UserCard = ({ user,setNewUserState, setUsers,users }) => {
  const expireAt = dayjs(user.expireAt).format("DD/MMM/YYYY - h:mmA	") || null;
  const isExpired = utils.isExpired(user.expireAt)

  return (
    <div className={`user__card ${isExpired && "expired"}`} key={user._id}>
      {/* header */}
     
      <div className={`card__header  ${isExpired && "expired"}`}> 
      <div className="whatsapp">
        {
          user.whatsapp &&
          <a href={`https://api.whatsapp.com/send?phone=${user.whatsapp}&&text=""`}><WhatsappIcon/></a>
        }
      </div>
        <div className='email'>{user.email}</div>
          <img src={ user.data[0]?.invited?.thumb||user.data?.invited?.thumb || user.thumb} alt="" />
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
            <small> { user?.data[0] && user?.data.map(d=>d?.name).join(",") || user?.data?.name} </small>
          </InputWithIcon>

          <InputWithIcon>
          <i className="fa-solid fa-clock"></i>
         
          <small>{expireAt}</small>
          </InputWithIcon>
        </div>
         
      </div>

      <div className="card__options">
        <Options users={users} setUsers={ setUsers} setNewUserState={setNewUserState} user={user} />
      </div>

    </div>
  )
}
