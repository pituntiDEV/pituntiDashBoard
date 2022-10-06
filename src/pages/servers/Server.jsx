import React, { useState } from "react";
import "./Server.scss";
import { ServersList } from "../../components/Servers/ServersList/ServersList";
import Modal from "../../components/modal/Modal";
import { NewServerForm } from "../../components/Servers/NewServerForm/NewServerForm";

export const Server = () => {

  //States
  const [totalServers,setTotalServers] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [newServerState,setNewServerState] = useState(false);

  //SaveServer
  // const saveServer = (server) => {
  //   const newServer = { data: server.data, account: selectedAccount._id }
  //   api.newServer(newServer).then((data) => {
  //     SWAlert.success({ title: "Servidor Creado", text: data.message });
  //   })
  //     .catch((error) => {
  //       SWAlert.error({ title: "Error", text: error.message });
  //     })
  // }

  return (
    <div className="servers-page">

      <div className="new_server_bar">
        <span>Total: {totalServers} servers</span>
        <button onClick={() => setOpenModal(true)}>Agregar Server</button>
      </div>

      {openModal &&
        <Modal title="New Server" setOpenModal={setOpenModal}>
          <NewServerForm setNewServerState={setNewServerState} setOpenModal={setOpenModal} />
        </Modal>}
      <ServersList newServerState={newServerState} setTotalServers={setTotalServers} />

    </div>
  )
}
