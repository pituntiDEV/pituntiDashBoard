
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { AppContext } from "./context/AppContext";
import routes from "./routes"


function App() {
  return (
    <div className="App">
      <AppContext>
        <Router>
          <Routes>
            {/* Hoem Route */}
            <Route key={routes.home.path} path={routes.home.path} element={routes.home.element} />
            {/* Admin Routes */}
            {routes.admin.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}
            {/* Auth Routes */}
            {routes.auth.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}
            {/* Plex Routes */}
            {routes.plex.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}
            {/* Emby Routes */}
            {routes.emby.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}
            {/* jellyfin Routes */}
            {routes.jellyfin.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}
            {/* Google,Gdrive,telegram,sms Routes */}
            {routes.services.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}
            {/*final Client Routes */}
            {routes.client.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}
            {/*Chat Routes */}
            {routes.chat.map(route => {
              return <Route key={route.path} path={route.path} element={route.element} />
            })}

            {/* Not Found Page */}
            <Route path="/*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </AppContext>
    </div>
  );
}

export default App;
