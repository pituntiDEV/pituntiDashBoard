import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import useGetAccountServers from '../../hook/useGetAccountServers'
import { Servers } from './Servers';
// import "./DashBoard.scss";
import useFetchApi from '../../hook/useFetchApi';
import { Sessions } from './Sessions/Sessions';
import {io} from "socket.io-client";
import config from '../../config';
import { Playing } from './components/Playing/Playing';
import GraficaBarras from '../../components/Chart/GraficaBarras';
import { Statistics } from './components/Statistics/Statistics';

export const DashBoard = () => {
  
    
    //State
    const [servers,setServers] = useState([]);
    const [sessions , setSessions] = useState([]);
    const [newSessions , setNewSessions] = useState([]);
    const [socket,setSocket] = useState(null);
  
    //Custom Hooks
    const [getServers] = useGetAccountServers();
    const [getSessions,loadingGetSessions] = useFetchApi({
      url:"/api/plex/sessions",
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

  // Effects for Socket.io
  useEffect(()=>{
    const socketConn = io(config.socketUrl+"/playing",{
      query: {
          _id: localStorage.getItem("_id") || "",
            token: localStorage.getItem("access-token")
          
      }
    });

    setSocket(socketConn)
  
    return ()=>{
      socketConn.disconnect()
    }
  },[])

  useEffect(()=>{
     socket?.on("playing",(data)=>{
      console.log(data);
      if(data.payload.event=="media.play"){
        setNewSessions([...newSessions,data])
      }
     })
  },[socket,newSessions])

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
        getServers().then(servers=>{
            
            setServers(servers)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
  

    
  return (
    <div className='container' >
    {/* <GeneralCard/> */}
    <div className='playing'>

    <div className="total">
    
     
     {/* {server.data?.name} */}
    </div>
      {/* <GraficaBarras/> */}
      <Statistics/>
    {/* <Playing/> */}
    <Sessions sessions={sessions} newSessions={newSessions}/>

     {/* <div className='users_playing_container container'>
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

     </div> */}

     {/* {openModalTerminate && 
     <Modal title="Parar la reproduccion" setOpenModal={setOpenModalTerminate}>
         <textarea onChange={(e)=>setMessage(e.target.value)} className='form-control'  cols="30" rows="10" placeholder='Mensaje'></textarea>
          <BtnPrimary onClick={terminateSession} title="Finalizar"/>
     </Modal>} */}
 </div>
    
    </div>
  )
}
