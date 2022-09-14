
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
function App() {
  return (
    <div className="App">
     <AppContext>
      <Router>
        
          <Routes>
            <Route path="/" element={<Layout ></Layout>} />
            <Route path="/users" element={<Layout ><Users/></Layout>} />
            <Route path="/accounts" element={<Layout ><Accounts/></Layout>} />
            <Route path="/servers" element={<Layout ><Server/></Layout>} />
            <Route path="/paquetes" element={<Layout ><Paquetes/></Layout>} />
            <Route path="/resellers" element={<Layout ><Resellers/></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </Routes>
      </Router>
      </AppContext>
    </div>
  );
}

export default App;
