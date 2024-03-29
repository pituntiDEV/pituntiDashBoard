import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../../context/AppContext';
import { UserCard } from './UserCard/UserCard'
import { SearchInput } from "./SearchInput/SearchInput";
import { UsersFilter } from './UsersFilter/UsersFilter';
import { useUserFilter } from '../../hook/useUserFilter';

import "./UsersList.scss";
import { Context } from '../../pages/users/PlexUsersContext';



export const UsersList = ({ setNewUserState }) => {
  //Context
  const { socket, state: { openEditModal }, setOpenEditModal } = useContext(appContext);
  const { users, setUsers } = useContext(Context);

  //States
  const [usersFilter, setUsersFilter] = useState([...users]);
  const [filterValue, setFilterValue] = useState({
    nameOrEmail: "",
    seller: "",
    state: "",
    byExpireDay: "",
    server: ""
  });

  //Custom Hooks
  const [filter] = useUserFilter(users);


  //Effects
  useEffect(() => {
    setUsersFilter(users);
  }, [users])

  useEffect(() => {
    setUsersFilter(filter(filterValue));
  }, [filterValue])



  //Functions
  const search = (e) => {
    setFilterValue({ ...filterValue, nameOrEmail: e.target.value })
  }

  const hanledChange = (e) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  }


  return (
    <div className="users">


      <SearchInput onChange={search} />
      <UsersFilter users={users} onChange={hanledChange} />
      <hr />
      <div className="text-center">

        <button type="button" className="btn btn-dark">
          Total filtrados: <span className="badge text-bg-success"> {usersFilter.length}</span>
        </button>
      </div>
      <div className="users__container">
        {
          usersFilter.map((user) => {
            return (<UserCard users={users} setUsers={setUsers} setNewUserState={setNewUserState} key={user._id} user={user} />)
          })
        }
      </div>

    </div>
  )
}
