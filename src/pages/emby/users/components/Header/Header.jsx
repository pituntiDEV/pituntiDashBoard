import React from 'react'
import { NewEmbyUser } from '../NewEmbyUser';
import "./Header.scss";
import { useContext } from 'react';
import { Context } from '../../EmbyUsersContext';
export const Header = () => {
  const { users } = useContext(Context);
  return (
    <div className='emby__users__header'>
      <div className="num__users">
        {users.length}-{users.length == 1 ? "Usuario" : "Usuarios"}
      </div>
      <NewEmbyUser />
    </div>
  )
}
