import React, { useState } from 'react'
import { useEffect } from 'react';
import useFetchApi from '../../../hook/useFetchApi'
import { EditServer } from '../../../pages/servers/components/EditServer';
import { EditSquareIcon } from '../../icons/EditSquareIcon';
import { ServerIcon } from '../../icons/ServerIcon';
import { TrashIcon } from '../../icons/TrashIcon';
import Modal from '../../modal/Modal';
import { DeleteServer } from './DeleteServer/DeleteServer';
import "./ServersList.scss";
export const ServersList = ({ setTotalServers, newServerState }) => {
  //States
  const [servers, setServers] = useState([]);
  const [openModalToDeleteServer, setOpenModalToDeleteServer] = useState(false);
  const [openModalToEditServer, setOpenModalToEditServer] = useState(false)
  const [serverToDelete, setServerToDelete] = useState(null);
  const [serverToEdit, setServerToEdit] = useState(null);
  const [serverState,setServerState] = useState(false);


  //Custom hooks
  const [getServers, loadingGetServers] = useFetchApi({
    url: `/api/server/get/all`,
    method: 'GET',
  });

  useEffect(() => {
    getServers().then((servers) => {
      setServers(servers);
      setTotalServers(servers?.length);
    })
  }, [newServerState,serverState])
  return (
    <div className='server-list'>
      <h2> Servers:</h2>
      <div className="servers">
        {servers.map(server => {
          return (
            <div  key={server._id} className="server">

              <div className="body">
                <div className="options">
                  <TrashIcon onClick={() => {
              setOpenModalToDeleteServer(true);
              setServerToDelete(server);

            }} />
                  <EditSquareIcon  onClick={() => {
              setOpenModalToEditServer(true);
              setServerToEdit(server);

            }}/>
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
        <Modal title="Eliminar server" setOpenModal={setOpenModalToDeleteServer}>
          <DeleteServer setServerState={setServerState} setOpenModal={setOpenModalToDeleteServer} server={serverToDelete} />
        </Modal>}

        {openModalToEditServer &&
        <Modal title="Editar Server" setOpenModal={setOpenModalToEditServer}>
          <EditServer setServerState={setServerState} setOpenModal={setOpenModalToEditServer} server={serverToEdit} />
        </Modal>}
    </div>
  )
}
