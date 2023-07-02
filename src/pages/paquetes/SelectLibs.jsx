import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CoinsIcon } from '../../components/icons/CoinsIcon';
import { InfoIcon } from '../../components/icons/InfoIcon';
import { InputWithIcon } from '../../components/icons/InputWithIcon/InputWithIcon';
import { PackCloseIcon } from '../../components/icons/PackCloseIcon';
import { ServerIcon } from '../../components/icons/ServerIcon';
import SWAlert from '../../components/SwAlert/SWAlert';
import { appContext } from '../../context/AppContext';
import useFetchApi from '../../hook/useFetchApi';
import useGetPlexLibs from '../../hook/useGetPlexLibs';
import "./SelectLibs.scss";

export const SelectLibs = ({ server, setOpenModal, accountServers, setNewPackageState }) => {

  //States

  const [libs, setLibs] = useState([]);
  const [selectedServer, setSelectedServer] = useState({});

  //custom hooks
  const [AddPackage, loading] = useFetchApi({
    url: '/api/package/plex',
  })


  const [getLibs] = useGetPlexLibs()

  const [data, setData] = useState({
    libs,
    name: "",
    description: "",
    priceByPackage: "0"

  });



  //Effects
  const libsStatus = libs.map(lib => ({ ...lib, active: true }))
  useEffect(() => {
    setData({ ...data, libs: libsStatus })
  }, [libs])


  //Functions

  //Change Server
  const serverChange = async (e) => {
    const server = accountServers.find(server => server._id == e.target.value);
    setSelectedServer(server);
    getLibs(server).then(data => {
      setLibs(data);
    })

  }

  //Change Status
  const changeStatus = (lib) => {
    const newLibs = libs.map(libx => {
      if (libx.key == lib.key) {
        libx.active = !libx.active;
      }

      return libx;
    })
    setData({ ...data, libs: newLibs })
  }

  const submit = (e) => {
    e.preventDefault();
    const libsSelected = data.libs.filter(lib => lib.active);
    try {
      const dataToSend = {
        name: data.name,
        description: data.description,
        priceByPackage: data.priceByPackage,
        libs: libsSelected,
        server: selectedServer._id,
        account: selectedServer.account
      }
      AddPackage({
        body: JSON.stringify(dataToSend)
      }).then(data => {
        SWAlert.alert({
          title: "Paquete agregado con exito"
        })
        setOpenModal(false);
        setNewPackageState(a => !a);
      }).catch(error => {
        SWAlert.error({
          title: error.message || "Algo salio mal"
        })
      })
    } catch (error) {
      console.log("Algo salio mal");
    }
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

  }
  return (
    <form onSubmit={submit} className='selectLibs'>
      <div className='form'>


        <div className='form-group'>
          <InputWithIcon>
            <ServerIcon />
            <select required onChange={serverChange} name="" id="" defaultValue={""}>
              <option disabled value="">Seleccione Server</option>
              {accountServers.map(server => {
                return <option key={server._id} value={server._id}>{server.data.name}</option>
              })}
            </select>
          </InputWithIcon>
        </div>

        <div className='form-group'>
          <label>Nombre del paquete:</label>
          <InputWithIcon>
            <PackCloseIcon />
            <input type="text" required name="name" onChange={onChange} />
          </InputWithIcon>
        </div>

        <div className='form-group'>
          <label>Description del paquete:</label>
          <InputWithIcon>
            <InfoIcon />
            <input type="text" required name="description" onChange={onChange} />
          </InputWithIcon>

        </div>

        <div className='form-group'>
          <label>Costo de creditos Extras</label>
          <InputWithIcon>
            <CoinsIcon />
            <input type="number" value={data.priceByPackage} required name="priceByPackage" onChange={onChange} />
          </InputWithIcon>

        </div>
      </div>

      <div className='libs'>
        <h1>Librerias:</h1>
        <div className='libs__container'>
          {loading && loading}
          {
            libs.map((lib, i) => {
              const { title, key, type, active } = lib;
              return (
                <div key={key} onClick={() => changeStatus(lib)} className={`lib   ${active && "active"}`}>
                  {type == "movie" ? <i className="fa-solid fa-file-video"></i>
                    : <i className="fa-solid fa-clapperboard"></i>
                  }
                  <small className="m-1 name">{title}</small>
                </div>
              )
            })

          }

        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="btn btn-primary">Save changes</button>
        <button className="btn btn-secondary" onClick={() => setOpenModal(false)}>Cancel</button>
      </div>
    </form>
  )
}
