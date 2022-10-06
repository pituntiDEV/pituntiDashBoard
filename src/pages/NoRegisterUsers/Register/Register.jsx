import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BtnPrimary } from '../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../components/Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../components/SwAlert/SWAlert'
import useFetchApi from '../../../hook/useFetchApi'
import "./Register.scss";

export const Register = ({ user, setUSersState, setOpenModal }) => {
  //State
  const [state, setState] = useState({
    name: "",
    email: user.email,
    data: user.sharedServers[0],
    packages: [],
    seller: ""
  })

  const [packs, setPacks] = useState([])
  const [resellers, setResellers] = useState([]);

  //Custom hooks
  const [getResellers] = useFetchApi({
    url: "/api/resellers/",
    method: "GET",
  })

  const [getPackages] = useFetchApi({
    url: `/api/package/plex/get/all`,
    method: 'GET',
  })

  const [registerUser,loadingRegisterUser] = useFetchApi({
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
  }, [])

  //funtions
  const submit = (data) => {
    if (state.packages.length < 1) { return; }
    const dataToSend = {
      ...data,
      packages: state.packages,
      data: {
        ...state.data, invited: {
          thumb: user.thumb
        }
      },
      seller: state.seller,
      email: user.email,

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

      <div className="form-group packages">
        {packs.map(pack => {
          const active = state.packages.includes(pack._id);
          return (
            <div className={`pack ${active && "active"}`} onClick={() => changePackages(pack)} key={pack._id}>
              {pack.name}
            </div>)
        })}
      </div>


      {!loadingRegisterUser && state.packages.length > 0 &&
        <div className="btns">
          <BtnPrimary title="Registrar" />
          <BtnSecondary title="Cancelar" />
        </div>}


    </form>
  )
}
