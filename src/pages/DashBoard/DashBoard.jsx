import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import useGetAccountServers from '../../hook/useGetAccountServers'
import { Servers } from './Servers';
// import "./DashBoard.scss";
import useFetchApi from '../../hook/useFetchApi';
import { Sessions } from './Sessions/Sessions';
import { io } from "socket.io-client";
import config from '../../config';
import { Playing } from './components/Playing/Playing';
import GraficaBarras from '../../components/Chart/GraficaBarras';
import { Statistics } from './components/Statistics/Statistics';
import { appContext } from '../../context/AppContext';

export const DashBoard = () => {
  const { wsData } = useContext(appContext);




  //State
  const [servers, setServers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [newSessions, setNewSessions] = useState([]);


  //Custom Hooks
  const [getServers] = useGetAccountServers();
  const [getSessions, loadingGetSessions] = useFetchApi({
    url: "/api/plex/sessions",
    method: "GET",
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



  useEffect(() => {
    getSessions().then(data => {
      setSessions(data)
    })
    const timer = setInterval(() => {
      getSessions().then(data => {
        setSessions(data)
      })
    }, 10000)

    return () => {
      clearInterval(timer);
    }
  }, [])



  useEffect(() => {
    getServers().then(servers => {

      setServers(servers)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])



  return (
    <div className='container' >
      {/* <GeneralCard/> */}
      <div className='playing'>
        <Statistics />
        <Sessions sessions={sessions} newSessions={newSessions} />
      </div>

    </div>
  )
}
