import { Register } from './pages/Regiter/Register';
import { Accounts } from './pages/Accounts/Accounts';
import { Server } from './pages/servers/Server';
import { Resellers } from './pages/resellers/Resellers';
import { Paquetes } from './pages/paquetes/Paquetes';
import { Login } from './pages/Login/Login';
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
import { Layout } from './components/Layout';

const Protected = ({ children }) => {
    return <ProtectedPage>  <UserContextProvider><Layout >{children}</Layout></UserContextProvider></ProtectedPage>
}

const routes = {
    home: {
        path: "/",
        element: <Protected><DashBoard /></Protected>
    },
    admin: [
        {
            path: "/superUser",
            element: <SuperUser />
        },
        {
            path:"/setting",
            element: <Protected><Settings/></Protected>
        },
        {
            path:"/accounts",
            element: <Protected><Accounts /></Protected>
        }
    ],
    auth: [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/password/recovery/form",
            element: <PasswordRecoveryForm />
        },
        {
            path: "/password/recovery",
            element: <PasswordRecovery />
        }
       
    ],
    plex: [
        {
            path: "/byCode",
            element: <Protected><ByCode /></Protected>
        },
        {
            path: "/byCode/resellers",
            element: <Protected><ResellersByCode /></Protected>
        },
        {
            path: "/users",
            element: <Protected><Users /></Protected>
        },
        {
            path: "/servers",
            element: <Protected><Server /></Protected>
        },
        {
            path: "/paquetes",
            element: <Protected><Paquetes /></Protected>
        },
        {
            path: "/resellers",
            element: <Protected><Resellers /></Protected>
        },
        {
            path: "/demos",
            element: <Protected><Demos /></Protected>
        },
        {
            path:"/no-register-users",
            element: <Protected><NoRegisterUsers /></Protected>
        }
    ],
    services:[
        {
            path:"/gdrive",
            element: <Protected><Gdrive /></Protected>
        }
    ],
    client:[
        {
            path:"/my-account",
            element:<MyAccount />
        }
    ],
    chat:[
        {
            path:"/chat",
            element:< ChatContextProvider><Chat /></ChatContextProvider>
        },
        {
            path:"/chat/:chatID",
            element:< ChatContextProvider><Chat /></ChatContextProvider>
        }
    ],
    emby:[
        {
            path:"/users/emby",
            element:<Protected><EmbyUsers /></Protected>
        }
    ]
}

export default routes

