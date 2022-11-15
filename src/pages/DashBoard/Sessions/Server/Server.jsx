import dayjs from 'dayjs';
import React from 'react'
import { useState } from 'react';
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { CloseIcon } from '../../../../components/icons/CloseIcon';
import Modal from '../../../../components/modal/Modal';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import "./Server.scss";
export const Server = ({ session: sessionData }) => {
   

    //VARS
    const { usersRegistered, serverName, server, usersNotRegistred } = sessionData;
    const totalUsers = usersNotRegistred.length + usersRegistered.length;

    //States
    const [openModalTerminate,setOpenModalTerminate] = useState(false);
    const [sessionToStop,setSessionToStop] = useState({
        server:"",
        session:"",
        message:""
    })

    //Custom Hooks
    const [stopSessionApi,loading] = useFetchApi({
        url:`/api/plex/sessions/${sessionToStop.session}?server=${sessionToStop.server}&message=${sessionToStop.message}`,
        method:"DELETE"
    })

    //functions
    const stopSession=()=>{
        stopSessionApi().then(data=>{
            SWAlert.alert({
                title:"Peticion Enviada por favor espere..."
            })
            setOpenModalTerminate(false)
            
        }).catch(err=>{
            SWAlert.error({
                title:"Error"
            })
        })
    }
    return (
        <div className='all_sessions  container'>
            <div className="serverTitle">
                <span className='num total'>{totalUsers}</span>
                <svg aria-hidden="true" className="_11ni0ce26 _11ni0ceb p0ac3m1 p0ac3m3 p0ac3ma" fill="currentColor" height="48" viewBox="0 0 48 48" width="48" xmlns="https://www.w3.org/2000/svg"><path clipRule="evenodd" d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45ZM30.8462 11.2308C30.5306 10.4734 29.7844 9.98555 28.964 10.0003C28.1436 10.0151 27.4154 10.5295 27.1273 11.2978L19.7377 31.0034L15.7889 23.1056C15.4501 22.428 14.7575 22 14 22H8V26H12.7639L18.2111 36.8944C18.5669 37.6059 19.3105 38.0389 20.1048 37.9973C20.8992 37.9556 21.5934 37.4471 21.8727 36.7022L29.0979 17.4349L32.1538 24.7692C32.4644 25.5145 33.1926 26 34 26H40V22H35.3333L30.8462 11.2308Z" fill="currentColor" fillRule="evenodd"></path></svg>
                <span className='title'>{serverName}</span>
            </div>

            <div className="sessions_container">
                <div className="users_playing_container">


                    <div className="no_registred">
                        {
                            usersNotRegistred.length > 0 &&
                            <>
                                <h2>Usuarios no registrados</h2>
                                <div className="bar"></div>
                            </>
                        }
                        <div className="sessions">
                        {
                            usersNotRegistred.map(session => {
                                const { Media, Player, User, Session } = session;
                                const durationT = ""
                                return (
                                    <div className='user user_playing'>
                                        <div className="user_playing_header">
                                        <span onClick={() => {
                                                 setSessionToStop({
                                                    session:session.Session.id,
                                                    server:sessionData.server
                                                 })
                                                 setOpenModalTerminate(true);
                                            }}>
                                                <CloseIcon />
                                            </span>
                                            <img src={`${process.env.REACT_APP_API_URL}/api/my-account-info/plex-img/byServer?path=${session.type == "movie" ? session.thumb : session.parentThumb}&&server=${server}`} alt="" />

                                            <div className="info">
                                                <div>{session.type == "movie" ? session.title : `${session.grandparentTitle}-${session.title}`}</div>
                                                <div>{session.year}</div>
                                                <div>{durationT}</div>
                                            </div>
                                        </div>
                                        <div className="user_playing_body">
                                            <div>{session.Player?.product}--{session.Player?.platform}</div>
                                            <div className='fw-bold'>{session.Player?.state}</div>
                                            <div>{session.Player?.remotePublicAddress}</div>
                                        </div>

                                        <div className="user_playing_footer">
                                            <span className='img'>
                                                <img src={session.User.thumb} alt="" />
                                            </span>
                                            <span>
                                                {session?.User?.title}
                                                <div></div>



                                                <div className='alert alert-danger'>No registrado</div>

                                            </span>
                                        </div>


                                    </div>
                                )
                            })
                        }

                        </div>

                    </div>
                    <div className="registred">
                        {
                            usersRegistered.length > 0 &&
                            <>
                                <h2>Usuarios Registrados</h2>
                                <div className="bar"></div>
                            </>
                        }
                        <div className="sessions">
                        {
                            usersRegistered.map(({ userDB, session }) => {
                                const durationT = ""
                                return (
                                    <div className='user user_playing'>
                                        <div className="user_playing_header">
                                            <span onClick={() => {
                                                  setSessionToStop({
                                                    session:session.Session.id,
                                                    server:sessionData.server
                                                 })
                                                 setOpenModalTerminate(true);
                                            }}>
                                                <CloseIcon />
                                            </span>
                                            <img src={`${process.env.REACT_APP_API_URL}/api/my-account-info/plex-img/byServer?path=${session.type == "movie" ? session.thumb : session.parentThumb || session.thumb}&&server=${server}`} alt="" />

                                            <div className="info">
                                                <div>{session.type == "movie" ? session.title : `${session.grandparentTitle}-${session.title}`}</div>
                                                <div>{session.year}</div>
                                                <div>{durationT}</div>
                                            </div>
                                        </div>
                                        <div className="user_playing_body">
                                            <div>{session.Player?.product}--{session.Player?.platform}</div>
                                            <div className='fw-bold'>{session.Player?.state}</div>
                                            <div>{session.Player?.remotePublicAddress}</div>
                                        </div>

                                        <div className="user_playing_footer">
                                            <span className='img'>
                                                <img src={session.User.thumb} alt="" />
                                            </span>
                                            <span>
                                                {session?.User?.title}
                                                <div></div>
                                                <div>
                                                    {userDB?.email}
                                                </div>
                                                {userDB?.email && <div>Expira:
                                                    {dayjs(userDB?.credits[userDB?.credits.length - 1]?.expireAt).format("DD-MMM-YYYY")}
                                                </div>}

                                                {
                                                    !userDB?.email && <div className='alert alert-danger'>No registrado</div>
                                                }
                                            </span>
                                        </div>


                                    </div>
                                )
                            })
                        }
                        </div>

                    </div>
                </div>
            </div>
            {openModalTerminate &&
             <Modal title="Stop Session" setOpenModal={setOpenModalTerminate}>
               <div className="terminate">
                  <textarea onChange={(e)=>{
                    setSessionToStop({...sessionToStop,message:e.target.value})
                  }} name="" id=""  cols="10" rows="5"></textarea>
                  <BtnPrimary title="Stop" onClick={stopSession} className="bg-danger"/>
               </div>
            </Modal>}
        </div>
    )
}
