import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi';
import { CheckIcon } from '../../../../icons/CheckIcon';
import { ServerIcon } from '../../../../icons/ServerIcon';
import SWAlert from '../../../../SwAlert/SWAlert';
import { PackagesList } from './PackagesList';
import "./ServersAndPackageEdit.scss";
export const ServersAndPackageEdit = ({ reseller, setOpenModal,setNewResellerState }) => {

  //State
  const [resellerToEdit, setResellerToEdit] = useState(reseller);
  const [servers, setServers] = useState([]);


  //Customs Hooks
  const [getServers, loading] = useFetchApi({
    url: `/api/server/get/all`,
    method: 'GET',
  });

  const [editReseller, loadingEditReseller] = useFetchApi({
    url: `/api/resellers/update/${resellerToEdit._id}`,
    method: 'PUT',
  })

  useEffect(() => {
    getServers()
      .then(({ data: { servers } }) => {
        setServers(servers);

      })
  }, [])

  //Functions

  const changeServer = (server) => {

    const serverExist = resellerToEdit.servers.find(s => s.server._id == server._id);

    if (serverExist) {
      const newServer = resellerToEdit.servers.filter(s => s.server._id != server._id);
      setResellerToEdit({ ...resellerToEdit, servers: newServer });
    } else {

      setResellerToEdit({
        ...resellerToEdit, servers: [...resellerToEdit.servers, {
          server,
          packages: []
        }]
      });
    }

  }

  const submit = (e) => {
    e.preventDefault();
    const formatServers = resellerToEdit.servers.map(s => {
      return {
        server: s.server._id,
        packages: s.packages
      }
    });

    editReseller({
      body: JSON.stringify({ servers: formatServers })
    }).then(data => {
      SWAlert.alert({
        title: data.message || "Reseller editado"
      })
      setOpenModal(false)
      setNewResellerState(s=>!s);
    }).catch(error => {
      SWAlert.error({
        title: error.message || "Algo salio mal"
      })
    })

  }
  return (
    <form onSubmit={submit} className="servers__and__packages">
      <div className="servers_container">
        <div className="servers__list">
          {
            servers.map((server) => {
              const { _id, data } = server;
              const { name } = data
              const existe = resellerToEdit.servers.find(s => s.server?._id == server?._id);
              return (
                <div onClick={() => changeServer(server)} className={`server ${existe && "selected"} `}>
                  {existe && <CheckIcon className="d-inlineblock pr-1" />}

                  <ServerIcon />
                  <span> {name}</span>
                </div>)
            })
          }
        </div>
      </div>

      {
        resellerToEdit.servers.map((server) => {
          return <PackagesList setResellerToEdit={setResellerToEdit} resellerToEdit={resellerToEdit} server={server.server} />
        })
      }
      {!loadingEditReseller ?<div className="btns">
        <button type="submit" className="btn btn-primary">Editar</button>
        <button type="button" onClick={() => setOpenModal(false)} className="btn btn-secondary">Cancelar</button>
      </div>
      :"Loading...."
      }
    </form>
  )
}
