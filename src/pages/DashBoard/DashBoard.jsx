import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Lineal } from '../../components/Chart/Lineal';
import useGetAccountServers from '../../hook/useGetAccountServers'
import { Servers } from './Servers';
import "./DashBoard.scss";
import useFetchApi from '../../hook/useFetchApi';
import { CloseIcon } from '../../components/icons/CloseIcon';
import dayjs from 'dayjs';
export const DashBoard = () => {
  
    
    //State
    const [servers,setServers] = useState([]);
    const [sessions , setSessions] = useState([]);
  
    //Custom Hooks
    const [getServers] = useGetAccountServers();
    const [getSessions,loadingGetSessions] = useFetchApi({
      url:"/api/plex/get/plexSessions",
      method:"GET",
    })

    //function 
    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + " h " + minutes + " min";
  }


    useEffect(()=>{
      getSessions().then(data=>{
        setSessions(data)
      })
      const timer = setInterval(()=>{
        getSessions().then(data=>{
          setSessions(data)
        })
      },10000)

      return ()=>{
        clearInterval(timer);
      }
    },[])



    useEffect(()=>{
        getServers().then(data=>{
          
            setServers(data.data.servers)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
  

    
  return (
    <div className='playing'>
    <div className="total">
     <span>{sessions.length}</span>
    <svg aria-hidden="true" className="_11ni0ce26 _11ni0ceb p0ac3m1 p0ac3m3 p0ac3ma" fill="currentColor" height="48" viewBox="0 0 48 48" width="48" xmlns="https://www.w3.org/2000/svg"><path clipRule="evenodd" d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45ZM30.8462 11.2308C30.5306 10.4734 29.7844 9.98555 28.964 10.0003C28.1436 10.0151 27.4154 10.5295 27.1273 11.2978L19.7377 31.0034L15.7889 23.1056C15.4501 22.428 14.7575 22 14 22H8V26H12.7639L18.2111 36.8944C18.5669 37.6059 19.3105 38.0389 20.1048 37.9973C20.8992 37.9556 21.5934 37.4471 21.8727 36.7022L29.0979 17.4349L32.1538 24.7692C32.4644 25.5145 33.1926 26 34 26H40V22H35.3333L30.8462 11.2308Z" fill="currentColor" fillRule="evenodd"></path></svg>
     {/* <Lineal data={usersPlaying.length} server={server} /> */}
     {/* {server.data?.name} */}
    </div>

     <div className='users_playing_container container'>
         {
             sessions.map((session) => {
              const { user,User, data,server,thumb, title, year, duration, Player,player,type,parentThumb,Session} =session;
                 const durationT = msToTime(session.duration)

                 return (
                     <div key={User?.id} className='user_playing'>

                         <div className="user_playing_header">
                             <span onClick={()=>{
                                //  setSession(Session.id)
                                //  setOpenModalTerminate(true);
                             }}>
                                 <CloseIcon/>
                             </span>
                              <img src={`${process.env.REACT_APP_API_URL}/api/my-account-info/plex-img/byServer?path=${session.type=="movie"?thumb:session.parentThumb}&&server=${user?.server}`} alt="" />
                             
                             <div className="info">
                                 <div>{session.type=="movie" ? session.title :`${session.grandparentTitle}-${session.title}`}</div>
                                 <div>{session.year}</div>
                                 <div>{durationT}</div>
                             </div>
                         </div>

                         <div className="user_playing_body">
                             <div>{Player?.product}--{Player?.platform}</div>
                             <div className='fw-bold'>{Player?.state}</div>
                             <div>{Player?.remotePublicAddress}</div>
                         </div>

                         <div className="user_playing_footer">
                            <span className='img'>
                                 <img src={session.User.thumb} alt="" />
                             </span>
                             <span>
                             {session?.User?.title}
                            <div></div>
                            <div>
                                {user?.email}
                            </div>
                            {user?.email && <div>Expira:
                             {dayjs(user?.credits[user?.credits.length-1]?.expireAt).format("DD-MMM-YYYY")}
                            </div>}

                            {
                             !user?.email && !loadingGetSessions && <div className='alert alert-danger'>No registrado</div>
                            }


                             </span>
                         </div>
                     </div>
                 )
             })
         }

     </div>

     {/* {openModalTerminate && 
     <Modal title="Parar la reproduccion" setOpenModal={setOpenModalTerminate}>
         <textarea onChange={(e)=>setMessage(e.target.value)} className='form-control'  cols="30" rows="10" placeholder='Mensaje'></textarea>
          <BtnPrimary onClick={terminateSession} title="Finalizar"/>
     </Modal>} */}
 </div>
  )
}
