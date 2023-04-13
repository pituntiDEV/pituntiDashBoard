import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BtnPrimary } from '../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../components/Buttons/BtnSucess/BtnSecondary'
import { ServerIcon } from '../../../components/icons/ServerIcon'
import SWAlert from '../../../components/SwAlert/SWAlert'
import useFetchApi from '../../../hook/useFetchApi'
import { Packages } from './Packages/Packages'
import "./Register.scss";

export const Register = ({ account, user, setUSersState, setOpenModal }) => {
  console.log(account._id);
  //State
  const [state, setState] = useState({
    name: "",
    email: user.email,
    sharedServers: user.sharedServers,
    userPlexID: user.id,
    packages: [],
    seller: "",
    servers: [],
    account: account._id

  })


  const [packs, setPacks] = useState([])
  const [resellers, setResellers] = useState([]);
  const [servers, setServers] = useState([]);

  //Custom hooks
  const [getResellers] = useFetchApi({
    url: "/api/resellers/",
    method: "GET",
  })

  //GetServers
  const [getServers] = useFetchApi({
    url: `/api/server/get/all`,
    method: 'GET',
  });

  const [getPackages] = useFetchApi({
    url: `/api/package/plex/get/all`,
    method: 'GET',
  })

  const [registerUser, loadingRegisterUser] = useFetchApi({
    url: `/api/plex/register`,
  })

  const { register, handleSubmit } = useForm();

  //Effects
  useEffect(() => {
    getPackages().then(data => {
      const packages = data.data.filter(p => p.server.data.clientIdentifier == state.data.machineIdentifier);
      setPacks(packages);
    })
    getResellers().then(resells => {
      setResellers(resells);
    })
    getServers().then(servers => {
      setServers(servers);
    })
  }, [])

  useEffect(() => {
    const serversIDS = state.servers.reduce((acc, server) => {
      if (!acc.includes(server._id)) {
        acc.push(server._id);
      }
      return acc;
    }, [])
    const packsFilter = state.packages.filter(p => serversIDS.includes(p.server))
    setState({ ...state, packages: packsFilter })
  }, [state.servers])

  //funtions
  const submit = (data) => {

    if (state.packages.length < 1) { return; }
    const dataToSend = {
      ...data,
      packages: state.packages,
      sharedServers: state.sharedServers,
      seller: state.seller,
      email: user.email,
      servers: state.servers,
      userPlexID: state.userPlexID,
      accountID: account._id


    };


    registerUser({ body: JSON.stringify(dataToSend) }).then(data => {
      SWAlert.alert({
        title: data.message || "Agregado",
        icon: "success"
      })

      setUSersState(s => !s);
      setOpenModal(false);
    }).catch(error => {
      SWAlert.error({
        title: error.message || "algo salio mal"
      })
    })

  }

  const changePackages = (pack) => {
    const exist = state.packages.find(p => p == pack._id);
    if (!exist) {
      setState({ ...state, packages: [...state.packages, pack._id] })
    } else {
      setState({ ...state, packages: state.packages.filter(p => p != pack._id) })
    }
  }

  const changeServer = (server) => {

    const existe = state.servers.find(s => s._id === server._id);
    if (!existe) {
      const servers = [...state.servers, server];
      setState({ ...state, servers });
    } else {
      const servers = state.servers.filter(s => s._id != server._id);
      setState({ ...state, servers });
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)} className='register_user'>
      <h2>{user.email}</h2>

      <div className="form_data">
        <div className="form-group">
          <label htmlFor="">Name:</label>
          <input type="text" {...register("name", {
            required: "*Requerido",
          })} />
        </div>

        <div className="form-group">
          <label htmlFor="">
            <input type="checkbox" {...register("delete")} />
            Eliminar usuario despues de <span className='text-danger'>[DIAS]</span>:
          </label>
          <input {...register("deleteDays", {
            required: "*Requerido",
          })} type="number" min="0" name="deleteDays" id="" />
        </div>

        <div className="form-group">
          <label htmlFor="">
            Fecha de vencimiento:
          </label>
          <input {...register("date", {
            required: "*Requerido",
          })} type="date" />
        </div>

        <div className="form-group">
          <label htmlFor="">
            Conexiones:
          </label>
          <input {...register("conexion", {
            required: "*Requerido",
          })} type="number" min={1} required />
        </div>

        <div className="form-group">
          <label htmlFor="">
            <input type="checkbox" {...register("removeLibs")} />
            Quitar librerias despues de <span className='text-danger'>[DIAS]</span>:
          </label>
          <input min="0" type="number" {...register("removeLibsDays", {
            required: "*Requerido",
          })} />
        </div>
        <div className="form-group">
          <label htmlFor="">Seller</label>
          <select onChange={(e) => setState({ ...state, seller: e.target.value })} name="" id="">
            <option value="">Yo</option>
            {
              resellers.map(resell => {
                return (
                  <option value={resell.reseller._id}>
                    {resell.reseller.email}
                  </option>
                )
              })
            }
          </select>
        </div>
      </div>

      <div className="form-group servers">
        <h3>Servers:</h3>
        <div className="servers__container">
          {servers.map(server => {
            const existe = state.servers.find(s => s._id === server._id);
            return (
              <div onClick={() => changeServer(server)} key={server._id} className={`server ${existe && "active"}`} >
                <ServerIcon /> {server?.data?.name}
              </div>)
          })}
        </div>
      </div>

      <div className="form-group servers">
        {state.servers.length > 0 && <h3>Packages:</h3>}
        {state.servers.map(server => {

          return (
            <Packages state={state} setState={setState} server={server} key={server._id} />
          )
        })}
      </div>


      {/* <div className="form-group packages">
        {packs.map(pack => {
          const active = state.packages.includes(pack._id);
          return (
            <div className={`pack ${active && "active"}`} onClick={() => changePackages(pack)} key={pack._id}>
              {pack.name}
            </div>)
        })}
      </div> */}


      {!loadingRegisterUser && state.packages.length > 0 &&
        <div className="btns">
          <BtnPrimary title="Registrar" />
          <BtnSecondary title="Cancelar" />
        </div>}


    </form>
  )
}
