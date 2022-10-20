import React, { useState } from 'react'
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi'
import { ServerIcon } from '../../icons/ServerIcon';
import { TrashIcon } from '../../icons/TrashIcon';
import Modal from '../../modal/Modal';
import { DeleteServer } from './DeleteServer/DeleteServer';
import "./ServersList.scss";
export const ServersList = ({ setTotalServers, newServerState }) => {
  //States
  const [servers, setServers] = useState([]);
  const [openModalToDeleteServer, setOpenModalToDeleteServer] = useState(false);
  const [serverToDelete, setServerToDelete] = useState(null);
  const [serverState,setServerState] = useState(false);


  //Custom hooks
  const [getServers, loadingGetServers] = useFetchApi({
    url: `/api/server/get/all`,
    method: 'GET',
  });

  useEffect(() => {
    getServers().then(({ data }) => {
      setServers(data.servers);
      setTotalServers(data.servers?.length);
    })
  }, [newServerState,serverState])
  return (
    <div className='server-list'>
      <h2> Servers:</h2>
      <div className="servers">
        {servers.map(server => {
          return (
            <div onClick={() => {
              setOpenModalToDeleteServer(true);
              setServerToDelete(server);

            }} key={server._id} className="server">

              <div className="body">
                <div className="options">
                  <TrashIcon />
                </div>
                <div className="info">
                  <span className="circle">{server.data.name[0]}</span>
                  <span> <ServerIcon /> {server.data.name}</span>
                </div>
              </div>
            </div>)
        })}
      </div>

      {openModalToDeleteServer &&
        <Modal setOpenModal={setOpenModalToDeleteServer}>
          <DeleteServer setServerState={setServerState} setOpenModal={setOpenModalToDeleteServer} server={serverToDelete} />
        </Modal>}
    </div>
  )
}
