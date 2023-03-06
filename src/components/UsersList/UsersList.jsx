import React, { useContext,useEffect,useState } from 'react';
import { appContext } from '../../context/AppContext';
import { UserCard } from './UserCard/UserCard'
import { SearchInput} from "./SearchInput/SearchInput";
import {UsersFilter} from './UsersFilter/UsersFilter';
import { useUserFilter } from '../../hook/useUserFilter';

import "./UsersList.scss";
import { Spinner } from '../Spinner/Spinner';

export const UsersList = ({ users,setNewUserState }) => {
  //Context
  const { socket, state: { openEditModal }, setOpenEditModal } = useContext(appContext);
  
  //States
  const [usersFilter, setUsersFilter] = useState(users);
  const [filterValue,setFilterValue]=useState({
    nameOrEmail: "",
    seller:"",
    state:"",
    byExpireDay:"",
    server:""
  });

  //Custom Hooks
  const [filter] = useUserFilter(users);
  

  //Effects
  useEffect(()=>{
    setUsersFilter(users);
  },[users])

  useEffect(()=>{
    setUsersFilter(filter(filterValue));
  },[filterValue])


   
  //Functions
  const search = (e) => {
    setFilterValue({...filterValue,nameOrEmail: e.target.value})
  }

  const hanledChange = (e) => {
    setFilterValue({...filterValue,[e.target.name]: e.target.value});
  }


  return (
    <div className="users">

      
      <SearchInput onChange={search} />
      <UsersFilter users={users} onChange={hanledChange}/>
        <hr />
       <div className="text-center">
       {usersFilter.length}
       </div>
      <div className="users__container">
        {
          usersFilter.map((user) => {
            return(<UserCard setNewUserState={setNewUserState} key={user._id} user={user}/>)
          })
        }
      </div>

    </div>
  )
}
