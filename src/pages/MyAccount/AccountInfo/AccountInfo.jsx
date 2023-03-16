import React, { useState } from 'react'
import { useEffect } from 'react'
import { CloseIcon } from '../../../components/icons/CloseIcon';
import useFetchApi from '../../../hook/useFetchApi';
import "./AccountInfo.scss";
import dateUtils from "../../../utils/date/index";
import { ServerIcon } from '../../../components/icons/ServerIcon';
export const AccountInfo = () => {

  //State
  const email = localStorage.getItem("email_to_info");
  const [user, setUser] = useState({});
  const [recentMovies, setRecentMovies] = useState([]);
  const [servers, setServers] = useState([]);

  //Functions

  const [getRecents, loading] = useFetchApi({
    url: `/api/my-account-info/recent-movies?email=${email}`,
    method: "GET"
  })

  //Effects

  useEffect(() => {
    getRecents()
      .then(data => {
        setUser(data.user);
        setServers(data.userData)
      })
  }, [])


  const logOut = () => {
    localStorage.removeItem("email_to_info");
    window.location.reload();
  }


  return (
    <div className='my__account__info'>

      <div className='account_info'>
        <div className="info_container">
          <div className="info">
            <header>
              <div className="btn-exit" onClick={logOut}>
                <CloseIcon />
              </div>
              <div className="email">{localStorage.getItem("email_to_info")}</div>

              <img src={user?.thumb || "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"} alt="" />
            </header>
            <div className="data">
              <div className="name">{user?.name}</div>
              {!loading && <div className="expireAt">{dateUtils.formatDate(user?.expireAt, "DD-MMMM-YYYY")}</div>}
              <div className="server">{user.serverName}</div>
            </div>
          </div>
        </div>
      </div >

      <div className="servers__shared container">
        <h3>Servers:</h3>
        <div className="servers__container">
          {servers.map(server => {
            return (
              <div className='server-shared' key={server.server.name}>
                <ServerIcon /> {server.server.name}
              </div>
            )
          })}
        </div>
      </div>

      <div className="recents__container">
        <div className="recents">
          {servers.map(server => {
            return (
              <div className='server-shared' key={server.server.name}>
                <div className="recent_movies container">
                  {server?.recent?.length > 0 && <h2>Agregado Recientemente A: {server.server.name}</h2>}
                  <div className="slide">
                    {server?.recent?.length > 0 && server.recent?.map(({
                      ratingKey,
                      thumb,
                      title,
                      parentTitle

                    }) => {
                      return (
                        <div key={ratingKey} className="img_container">
                           <div className="title">
                            { parentTitle}{title}
                           </div>
                          <img src={`${process.env.REACT_APP_API_URL}/api/my-account-info/plex-img?server=${server.server._id}&&img=${thumb}`} alt="Imagen no disponible" />
                        </div>)
                    })}

                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    // <>
    // <div className='account_info'>
    //   <div className="info_container">
    //     <div className="info">
    //       <header>
    //         <div className="btn-exit" onClick={logOut}>
    //           <CloseIcon/>
    //         </div>
    //       <div className="email">{localStorage.getItem("email_to_info")}</div>

    //         <img src={user?.thumb || "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"} alt="" />
    //       </header>
    //       <div className="data">
    //         <div className="name">{user?.name}</div>
    //         {!loading && <div className="expireAt">{dateUtils.formatDate(user?.expireAt,"DD-MMMM-YYYY")}</div>}
    //         <div className="server">{user.serverName}</div>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    //   <div className="recent_movies container">
    //     {recentMovies.length > 0 && <h2>Agregado Recientemente:</h2>}
    //     <div className="slide">
    //       {recentMovies?.map(({
    //         ratingKey,
    //         thumb
    //       })=>{
    //         return (
    //         <div key={ratingKey} className="img_container">

    //           <img src= {`${process.env.REACT_APP_API_URL}/api/my-account-info/plex-img?img=${thumb}`} alt="Imagen no disponible" />
    //         </div>)
    //       })}

    //     </div>
    //   </div>
    // </>
  )
}
