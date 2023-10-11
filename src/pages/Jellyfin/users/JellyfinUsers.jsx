import { Header } from './components/Header/Header'
import { JellyfinUsersContext } from './JellyfinUsersContext'
import { JellyfinUsersList } from './components/JellyfinUsersList/JellyfinUsersList'


export default function JellyfinUsers() {
  return (
    <JellyfinUsersContext>
      <Header />
      <JellyfinUsersList />
    </JellyfinUsersContext>
  )
}
