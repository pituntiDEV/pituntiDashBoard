import React, { useContext, useEffect, useState } from 'react'
import { InputWithIcon } from '../../components/icons/InputWithIcon/InputWithIcon';
import { ServerIcon } from '../../components/icons/ServerIcon';
import Modal from '../../components/modal/Modal';
import { appContext } from '../../context/AppContext';
import useGetAccountServers from '../../hook/useGetAccountServers';
import useGetPlexLibs from '../../hook/useGetPlexLibs';
import { MyPackages } from './MyPackages';
import { SelectLibs } from './SelectLibs';
import "./Paquetes.scss"
export const Paquetes = () => {
  const [openModal, setOpenModal ] = useState(false);
  const [getAccountsServers, accountServers, loading] = useGetAccountServers()
  const [serverSelected, setServerSelected] = useState(null);
  const [getLibs, libs] = useGetPlexLibs()

  useEffect(() => {
    getAccountsServers()
  }, [])

  const changeServer = (e) => {
    const server =e.target.value;
    setServerSelected(server);

  }
  return (
    <div className="container">
      <div className="new__package__bar">
        <h1>Package</h1>
        <button onClick={()=>setOpenModal(true)}>New Package</button>
      </div>
      <div className="servers__container">
      <h2>By Server:</h2>
        <InputWithIcon>
           <ServerIcon/>
          <select name="" id="" defaultValue={''} onChange={changeServer}>
            <option value="" disabled>Seleccione Server</option>
            {accountServers.map((server) => {
              const { platform, name, address, publicAddress } = server.data;
              return <option key={server._id} value={server._id}>{name}</option>

            })}
          </select>
        </InputWithIcon>
      </div>
      {

        openModal && <Modal title="Crear un Nuevo paquete" setOpenModal={setOpenModal}>
          <SelectLibs accountServers={accountServers} server={serverSelected} libs={libs} />

        </Modal>

      }

      <hr />
      <section>
        <MyPackages server={serverSelected} />
      </section>

    </div>
  )
}
