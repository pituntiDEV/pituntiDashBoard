import React from 'react'
import { NewEmbyUser } from '../NewEmbyUser';
import "./Header.scss";
export const Header = ({users,setUpdateUserState}) => {
  return (
    <div className='emby__users__header'>
       <div className="num__users">
          {users.length}-{users.length ==1 ?"Usuario":"Usuarios"}
       </div>
        <NewEmbyUser setUpdateUserState={setUpdateUserState}/>
    </div>
  )
}
