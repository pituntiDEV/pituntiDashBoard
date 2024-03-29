import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../../components/SwAlert/SWAlert'
import useFetchApi from '../../../../hook/useFetchApi'
import useGetPlexLibs from '../../../../hook/useGetPlexLibs'
import "./LibsSelection.scss"
export const LibsSelection = ({ pack, setPaqueteState, setOpenModal }) => {


  //states
  const [libs, setLibs] = useState([]);
  const [state, setState] = useState({
    name: pack.name,
    libs: pack.libs,
    priceByPackage: pack.priceByPackage
  })
  //Custom Hooks
  const [getPackages, loadingGetPackages] = useFetchApi({
    url: `/api/package/plex/server/${pack.server._id}`,
    method: "GET"
  })
  const [getServerByID, loadingGetServerByID] = useFetchApi({
    url: `/api/server/${pack.server._id}`,
    method: 'GET',
  })
  const [getPlexLibs] = useGetPlexLibs();

  const [updatePackage, loadingUpdatePackage] = useFetchApi({
    url: `/api/package/${pack._id}`,
    method: 'PUT',
  })



  //Effects
  useEffect(() => {
    getServerByID().then(data => {
      getPlexLibs(data).then((data) => {
        setLibs(data);
        const plexLibsIDS = data.map(l => l.id);
        const filter = state.libs.filter(l => plexLibsIDS.includes(l.id));
        setState({ ...state, libs: filter })
      })

    })

  }, [])
  const libsPackIDS = state.libs.map(l => l.id);

  const hanledToggleLibs = (lib) => {
    let libsLocal = state.libs;
    const existe = libsLocal.find(l => l.id == lib.id);
    if (!existe) {
      libsLocal.push(lib);
      setState({ ...state, libs: libsLocal });
    } else {
      libsLocal = libsLocal.filter(l => l.id != lib.id);
      setState({ ...state, libs: libsLocal });
    }

  }

  const submit = (e) => {
    e.preventDefault();

    updatePackage({
      body: JSON.stringify(state),
    }).then(data => {
      setPaqueteState(s => !s);
      SWAlert.alert({
        title: "Paquete Actualizado"
      })
      setOpenModal(false);

    })
      .catch(error => {
        alert.error({
          title: error.message || "Algo salio mal"
        })
      })
  }
  return (
    <form onSubmit={submit} className='packageUpdate'>
      <datalist className='libs_container'>
        {libs.map(lib => {
          const selected = libsPackIDS.includes(lib.id);
          return (
            <div onClick={() => hanledToggleLibs(lib)} className={`lib ${selected && "selected"}`}>
              <p className='fw-bold'>
                <i className={`fa-solid ${lib.type == "movie" && "fa-film"}  ${lib.type == "show" && "fa-video"}`}></i> ({lib.type})
              </p>
              {lib.title}
            </div>
          )
        })}
      </datalist>
      <div className="form">
        <div className="form__group">
          <label htmlFor="name">Name:</label>
          <input onChange={(e) => {
            setState({ ...state, name: e.target.value })
          }} type="text" required minLength={4} value={state.name} />

        </div>

        <div className="form__group mt-3">
          <label htmlFor="priceByPackage">Costo de creditos EXTRA:</label>
          <input onChange={(e) => {
            setState({ ...state, priceByPackage: e.target.value })
          }} type="number" value={state.priceByPackage} />
          <small className='bg-warning px-1 my-3'>Asignar costo de creditos al paquete</small>
        </div>
      </div>



      <div className="btns">
        <BtnPrimary title="Editar" />
        <BtnSecondary onClick={() => setOpenModal(false)} type="button" title="Cancelar" />
      </div>
    </form>
  )
}
