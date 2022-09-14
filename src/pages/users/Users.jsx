import React, { useState } from 'react'
import { NewUserContextProvider } from '../../context/NewUserContextProvider'
import { UserContextProvider } from '../../context/usersContext'

import { NewUserBar } from '../../components/NewUserBar/NewUserBar'
import { UsersList } from '../../components/UsersList/UsersList'
import useFetchApi from '../../hook/useFetchApi'
import config from '../../config'
import { useEffect } from 'react'

export const Users = () => {
  //State
  const [users, setUsers] = useState([]);
  //Custom Hooks
  const [getAllUsers, loading] = useFetchApi({ url: config.apiUrls.plex.getAllUsers, method: "GET" });

  //Effects
  useEffect(() => {
    //Get all users 
    getAllUsers()
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, [])

  return (
    <div className='Users container'>
      <NewUserBar users={users} />
      <UsersList users={users} />

    </div>
  )
}
