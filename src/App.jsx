
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
function App() {
  return (
    <div className="App">
     <AppContext>
      <Router>
        
          <Routes>
            <Route path='/superUser' element={<SuperUser/>} />
            <Route path='/my-account' element={<MyAccount/>}/>
            <Route path="/" element={<ProtectedPage>  <UserContextProvider><Layout ><DashBoard/></Layout></UserContextProvider></ProtectedPage>} />
            <Route path="/setting" element={<ProtectedPage>  <UserContextProvider><Settings/></UserContextProvider></ProtectedPage>} />
            <Route path="/users" element={<ProtectedPage>  <UserContextProvider><Layout ><Users/></Layout></UserContextProvider></ProtectedPage>} />
            <Route path="/accounts" element={<ProtectedPage><Layout ><Accounts/></Layout></ProtectedPage>} />
            <Route path="/servers" element={<ProtectedPage><Layout ><Server/></Layout></ProtectedPage>} />
            <Route path="/paquetes" element={<ProtectedPage><Layout ><Paquetes/></Layout> </ProtectedPage>} />
            <Route path="/resellers" element={<ProtectedPage><Layout ><Resellers/></Layout> </ProtectedPage>} />
            <Route path="/demos" element={<ProtectedPage><Layout ><Demos/></Layout> </ProtectedPage>} />
            <Route path="/no-register-users" element={<ProtectedPage><Layout ><NoRegisterUsers/></Layout> </ProtectedPage>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </Routes>
      </Router>
      </AppContext>
    </div>
  );
}

export default App;
