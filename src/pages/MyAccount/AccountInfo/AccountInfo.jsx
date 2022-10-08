import React, { useState } from 'react'
import { useEffect } from 'react'
import "./AccountInfo.scss";
export const AccountInfo = () => {
  const [user,setUser] = useState({});
  const [recentMovies,setRecentMovies] = useState([]);

  //Functions

  const getData=async()=>{
    const reqInfo=await fetch(`${process.env.REACT_APP_API_URL}/api/my-account-info?email=${localStorage.getItem("email_to_info")}`);
    setUser(await reqInfo.json());
    //Get Recent
    const reqRecent= await fetch(`${process.env.REACT_APP_API_URL}/api/my-account-info/recent-movies`);
    setRecentMovies(await reqRecent.json());

  }

  //Effects
  
  useEffect(()=>{
   getData()
  },[])


  return (
    <>
    <div className='account_info'>
      <div className="info_container">
        <div className="info">
          <header>
            <img src={user?.thumb || "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"} alt="" />
          </header>
          <div className="data">
            <div className="name">{user?.name}</div>
            <div className="email">{localStorage.getItem("email_to_info")}</div>
            <div className="expireAt">{user?.expireAt}</div>
            <div className="server">{user.serverName}</div>
            <div className="numLibraries">Librerias #{user.numLibraries}</div>
          </div>
        </div>
      </div>

    </div>
      <div className="recent_movies container">
        <h2>Agregado Recientemente:</h2>
        <div className="slide">
          {recentMovies?.map(({
            ratingKey,
            thumb
          })=>{
            return (
            <div key={ratingKey} className="img_container">
              <img src= {`${process.env.REACT_APP_API_URL}/api/my-account-info/plex-img?img=${thumb}`} alt="" />
            </div>)
          })}

        </div>
      </div>
    </>
  )
}
