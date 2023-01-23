import React, { useContext, useState } from 'react'

import { NewUserBar } from '../../components/NewUserBar/NewUserBar'
import { UsersList } from '../../components/UsersList/UsersList'
import useFetchApi from '../../hook/useFetchApi'
import config from '../../config'
import { useEffect } from 'react'
import { Spinner } from '../../components/Spinner/Spinner'

export const Users = () => {
  //State
  const [users, setUsers] = useState([]);
  const [newUserState,setNewUserState] = useState(false);

  //Custom Hooks
  const [getAllUsers, loading] = useFetchApi({ url: config.apiUrls.plex.getAllUsers, method: "GET" });

  //Effects
  useEffect(() => {
    //Get all users 
    getAllUsers()
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, [newUserState])

  return (
    <div className='Users container' style={{position:"relative"}}>
      {
        loading ? <div className='loading'><Spinner/></div>
        :<>
        <NewUserBar setNewUserState={setNewUserState} users={users} />
        <UsersList setNewUserState={setNewUserState} users={users} />
        </>
      }
    </div>
  )
}
