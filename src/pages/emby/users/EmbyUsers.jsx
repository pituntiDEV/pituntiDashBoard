import React, { useState } from 'react'
import { useEffect } from 'react'
import useFetchApi from '../../../hook/useFetchApi'
import { EmbyUsersList } from './components/EmbyUsersList/EmbyUsersList'
import { Header } from './components/Header/Header'
import { EmbyUsersContext } from './EmbyUsersContext'

export default function EmbyUsers() {
  //State
  const [users, setUsers] = useState([]);
  const [updateUserState, setUpdateUserState] = useState(false);
  // Custom Hooks
  const [getUsers, loading] = useFetchApi({
    url: `/api/emby/users`,
    method: 'GET',
  });

  //Effects
  useEffect(() => {
    getUsers()
      .then(users => {
        setUsers(users)
      })
  }, [updateUserState])


  return (
    <EmbyUsersContext>
      <Header setUpdateUserState={setUpdateUserState} users={users} />
      <EmbyUsersList />
    </EmbyUsersContext>
  )
}
