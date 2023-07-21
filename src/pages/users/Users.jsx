import { NewUserBar } from '../../components/NewUserBar/NewUserBar'
import { PlexUsersContext } from './PlexUsersContext';
import { UsersList } from './components/UsersList/UsersList'


export const Users = () => {
  return (
    <PlexUsersContext>
      <div className='Users container'>
        <NewUserBar />
        <UsersList />
      </div>
    </PlexUsersContext>
  )
}
