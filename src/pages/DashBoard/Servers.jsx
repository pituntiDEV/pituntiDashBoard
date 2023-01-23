import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { BtnPrimary } from '../../components/Buttons/BtnSucess/BtnPrimary';
import { CloseIcon } from '../../components/icons/CloseIcon';
import Modal from '../../components/modal/Modal';
import useFetchApi from '../../hook/useFetchApi';

export const Servers = ({ server }) => {
    //VARS
    const token = server.data.accessToken;
    const connection = server.data.connections.find(c => c.local == false);
    const url = connection.uri.replace("http", "https");
    
    const playingUrl = `${url}/status/sessions?X-Plex-Token=${token}`;

    //State
    const [usersPlaying, setUsersPlaying] = useState([]);
    const [state, setState] = useState(true);
    const [usersDB,setUsersDB] = useState([]);
    const [openModalTerminate,setOpenModalTerminate] = useState(false);
    const [session,setSession] = useState({});
    const [message,setMessage] = useState("");

    //GetData
    const getData = () => {
        fetch(playingUrl, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then(data => data.json())
            .then(data => {
                setUsersPlaying(data?.MediaContainer?.Metadata || []);
                
            }).catch(error => {
                console.log(error);
            })
    }

    //Custom Hooks
    const [getUsers,loadingGetUsers] = useFetchApi({
        url:"/api/users/get",
        method:"GET",
    })

    //Effects

    useEffect(()=>{
        getUsers().then(data=>{
            setUsersDB(data);
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
    useEffect(() => {
        getData();
        //funtions
        const interval = setInterval(() => {
            getData();
        }, 10000)

        return () => clearInterval(interval);
    }, [])

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

    const terminateSession=async()=>{
         const urlToTerminate = `${url}/status/sessions/terminate?sessionId=${session}&reason=${message}&X-Plex-Token=${token}`
        await  fetch(urlToTerminate)
        setOpenModalTerminate(false);
    }



    return (
        <div className='playing'>
           <div className="total">
            <span>{usersPlaying.length}</span>
           <svg aria-hidden="true" className="_11ni0ce26 _11ni0ceb p0ac3m1 p0ac3m3 p0ac3ma" fill="currentColor" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45ZM30.8462 11.2308C30.5306 10.4734 29.7844 9.98555 28.964 10.0003C28.1436 10.0151 27.4154 10.5295 27.1273 11.2978L19.7377 31.0034L15.7889 23.1056C15.4501 22.428 14.7575 22 14 22H8V26H12.7639L18.2111 36.8944C18.5669 37.6059 19.3105 38.0389 20.1048 37.9973C20.8992 37.9556 21.5934 37.4471 21.8727 36.7022L29.0979 17.4349L32.1538 24.7692C32.4644 25.5145 33.1926 26 34 26H40V22H35.3333L30.8462 11.2308Z" fill="currentColor" fillRule="evenodd"></path></svg>
            {/* <Lineal data={usersPlaying.length} server={server} /> */}
            {server.data?.name}
           </div>

            <div className='users_playing_container'>
                {
                    usersPlaying.map(({ User, thumb, title, year, duration, Player,type,parentThumb,Session}) => {
                        const durationT = msToTime(duration)
                        const userInDB = usersDB.find(user=>user.data.invitedId == User.id);

                        return (
                            <div key={User.id} className='user_playing'>

                                <div className="user_playing_header">
                                    <span onClick={()=>{
                                        setSession(Session.id)
                                        setOpenModalTerminate(true);
                                    }}>
                                        <CloseIcon/>
                                    </span>
                                    <img src={`${url}${type=="episode"?parentThumb:thumb}?X-Plex-Token=${token}`} alt="" />
                                    <div className="info">
                                        <div>{title}</div>
                                        <div>{year}</div>
                                        <div>{durationT}</div>
                                    </div>
                                </div>

                                <div className="user_playing_body">
                                    <div>{Player.product}--{Player.platform}</div>
                                    <div className='fw-bold'>{Player.state}</div>
                                    <div>{Player.remotePublicAddress}</div>
                                </div>

                                <div className="user_playing_footer">
                                   <span className='img'>
                                        <img src={User.thumb} alt="" />
                                    </span>
                                    <span>
                                    {User.title}
                                   <div></div>
                                   <div>
                                       {userInDB?.email && !loadingGetUsers && userInDB?.email}
                                   </div>
                                   {userInDB?.email && <div>Expira:
                                    {dayjs(userInDB?.credits[userInDB?.credits.length-1]?.expireAt).format("DD-MMM-YYYY")}
                                   </div>}

                                   {
                                    !userInDB?.email && !loadingGetUsers && <div className='alert alert-danger'>No registrado</div>
                                   }


                                    </span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

            {openModalTerminate && 
            <Modal title="Parar la reproduccion" setOpenModal={setOpenModalTerminate}>
                <textarea onChange={(e)=>setMessage(e.target.value)} className='form-control'  cols="30" rows="10" placeholder='Mensaje'></textarea>
                 <BtnPrimary onClick={terminateSession} title="Finalizar"/>
            </Modal>}
        </div>
    )
}
