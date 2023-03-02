
import './App.css';
import { Layout } from './components/Layout';
import {
  BrowserRouter as  Router,
  Routes,
  Route,
} from "react-router-dom";
import { Register } from './pages/Regiter/Register';
import { Accounts } from './pages/Accounts/Accounts';
import { Server } from './pages/servers/Server';
import { Resellers } from './pages/resellers/Resellers';
import { Paquetes } from './pages/paquetes/Paquetes';
import React from 'react'
import { Login } from './pages/Login/Login';
import  {AppContext} from "./context/AppContext";
import { Users } from './pages/users/Users';
import { UserContextProvider } from './context/usersContext';
import { ProtectedPage } from './pages/ProtectedPage/ProtectedPage';
import { Demos } from './pages/Demos/Demos';
import { NoRegisterUsers } from './pages/NoRegisterUsers/NoRegisterUsers';
import { DashBoard } from './pages/DashBoard/DashBoard';
import { MyAccount } from './pages/MyAccount/MyAccount';
import { Settings } from './pages/Settings/Settings';
import { SuperUser } from './pages/SuperUser/SuperUser';
import { Chat } from './pages/Chat/Chat';
import { ChatContextProvider } from './pages/Chat/context/ChatContextProvider';
import { ByCode } from './pages/byCode/ByCode';
import { ResellersByCode } from './pages/byCode/ResellersByCode';
import { PasswordRecovery } from './components/Passwords/PasswordRecovery';
import { PasswordRecoveryForm } from './components/Passwords/PasswordRecoveryForm';
import EmbyUsers from './pages/emby/users/EmbyUsers';
import { Gdrive } from './pages/gdrive/Gdrive';
function App() {
  return (
    <div className="App">
     <AppContext>
      <Router>
        
          <Routes>
            <Route path='/superUser' element={<SuperUser/>} />

            <Route path='/chat' element={< ChatContextProvider><Chat/></ChatContextProvider>}/>
            
            <Route path='/chat/:chatID' element={<ChatContextProvider>
              <Chat/>
            </ChatContextProvider>}/>
            <Route path='/my-account' element={<MyAccount/>}/>
            <Route path="/" element={<ProtectedPage>  <UserContextProvider><Layout ><DashBoard/></Layout></UserContextProvider></ProtectedPage>} />
            <Route path="/setting" element={<ProtectedPage>  <UserContextProvider><Settings/></UserContextProvider></ProtectedPage>} />
            <Route path="/users" element={<ProtectedPage>  <UserContextProvider><Layout ><Users/></Layout></UserContextProvider></ProtectedPage>} />

            <Route path="/users/emby" element={<ProtectedPage>  <UserContextProvider><Layout ><EmbyUsers/></Layout></UserContextProvider></ProtectedPage>} />


            <Route path="/byCode" element={<ProtectedPage>  <UserContextProvider><Layout ><ByCode/></Layout></UserContextProvider></ProtectedPage>} />
            <Route path="/byCode/resellers" element={<ProtectedPage>  <UserContextProvider><Layout ><ResellersByCode/></Layout></UserContextProvider></ProtectedPage>} />
            <Route path="/accounts" element={<ProtectedPage><Layout ><Accounts/></Layout></ProtectedPage>} />
            <Route path="/servers" element={<ProtectedPage><Layout ><Server/></Layout></ProtectedPage>} />
            <Route path="/paquetes" element={<ProtectedPage><Layout ><Paquetes/></Layout> </ProtectedPage>} />
            <Route path="/resellers" element={<ProtectedPage><Layout ><Resellers/></Layout> </ProtectedPage>} />
            <Route path="/demos" element={<ProtectedPage><Layout ><Demos/></Layout> </ProtectedPage>} />
            <Route path="/no-register-users" element={<ProtectedPage><Layout ><NoRegisterUsers/></Layout> </ProtectedPage>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/recovery/form" element={<PasswordRecoveryForm />} />
            <Route path="/password/recovery" element={<PasswordRecovery />} />
            {/* Gdrive */}
            <Route path="/gdrive" element={<ProtectedPage><Layout ><Gdrive/></Layout> </ProtectedPage>} />
            <Route path="/*" element={<h1>Not Found</h1>} />

            
            
          </Routes>
      </Router>
      </AppContext>
    </div>
  );
}

export default App;
