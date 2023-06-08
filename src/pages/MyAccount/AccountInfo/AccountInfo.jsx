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
  const [recentMedia, setRecentMedia] = useState([]);
  const [servers, setServers] = useState([]);
  const [serverId, setServerID] = useState(null);

  //Functions

  const [getRecents, loading] = useFetchApi({
    url: `/api/my-account-info/recent-movies?email=${email}`,
    method: "GET"
  })

  const [getRecentsByServer, loadingGetReccentByServer] = useFetchApi({
    url: `/api/my-account-info/recent-media-byServer/${serverId}`,
    method: "GET"
  })

  //Effects

  useEffect(() => {
    getRecents()
      .then(data => {
        setUser(data.user);
        setServers(data.user.servers);

        if (data.user.servers.length > 0) {
          setServerID(data.user.servers[0]._id)
        }
      })
  }, [])

  useEffect(() => {
    if (serverId) {
      getRecentsByServer()
        .then(data => {
          setRecentMedia(data)
        })
        .catch(error => {
          console.log(error);
        })
    }

  }, [serverId])


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
          <select onChange={(e) => { setServerID(e.target.value) }} defaultValue={servers[0]?._id} name="" id="">
            {servers.map(server => {
              return (
                <option value={server._id} key={server.data.name}>
                  {server.data.name}
                </option>
              )
            })}

          </select>
        </div>
      </div>


      {/* Recent Container */}
      <div className="recent_movies container">
        <div className="slide">
          {recentMedia.map(({
            ratingKey,
            thumb,
            title,
            parentTitle

          }) => {
            return (
              <div key={ratingKey} className="img_container">
                <div className="title">
                  {parentTitle}{title}
                </div>
                <img src={`${process.env.REACT_APP_API_URL}/api/my-account-info/plex-img?server=${serverId}&&img=${thumb}`} alt="Imagen no disponible" />
              </div>)
          })}

        </div>
      </div>
    </div>

  )
}
