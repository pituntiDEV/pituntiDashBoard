import React, { useEffect, useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import Modal from '../../../../components/modal/Modal'
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import { useGetAccounts } from '../../../../hook/useGetAccounts';
import "./MigrateDevices.scss";
export const MigrateDevices = () => {
  //State
  const [openModal, setOpenModal] = useState(false);
  const [openModalToRegister, setOpenModalToRegister] = useState(false);
  const [plexAccounts, setPlexAccounts] = useState([]);
  const [devicesNoRegistered, setDevicesNoRegistered] = useState([]);
  const [account, setAccount] = useState(null);
  const [selectedDevice,setSelectedDevice] = useState(null);
  const [resellers, setResellers] = useState([]);
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    demo:false,
    seller:""
  })

  //Hooks
  const [getAccounts, accounts, loading] = useGetAccounts();
  const [getDevices, loadingGetDevices] = useFetchApi({
    url: `/api/byCode/no-register`
  });

  const [getResellersByCode,loadingGetResellersByCode] = useFetchApi({
    url:`/api/byCode/resellers`,
    method: "GET",
  })

  const [register,loadingRegister] = useFetchApi({
    url:`/api/byCode/register`
  })

  // Effects
  useEffect(() => {
    getAccounts()
      .then(data => {
        setPlexAccounts(data)
      })
  }, [])

  const getDevicesFromServer = () => {
    getDevices({ body: JSON.stringify({ account }) })
      .then(data => {
        setDevicesNoRegistered(data)
        getResellersByCode()
          .then(data=>{
            setResellers(data)
          })
      })
  }

  const onImputChangeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
     
  }
  
  const submit = (e) => {
    e.preventDefault();
    const dataToSend={...formData,...{
      device:selectedDevice,
      id:selectedDevice?.id,
      account:account
    }}
     register({body:JSON.stringify(dataToSend)})
      .then(data=>{
        const newStateDevice = [...devicesNoRegistered];
        const newDevices = newStateDevice.filter(d=>d.id != data.device.id);
        setDevicesNoRegistered(newDevices);
        setOpenModalToRegister(false)
       
       
        SWAlert.alert({
          title:"Registrado"
        })
      })
      .catch(error=>{
        SWAlert.error({
          title:error.message || "Algo salio mal"
        })
      })
  }
  return (
    <div className=''>
      <button onClick={() => setOpenModal(true)}>Migrar</button>
      {openModal
        &&
        <Modal setOpenModal={setOpenModal} title='Migrar dispositivos'>
          <div className="search__devices__by__email__for__migrate">
            <select onChange={(e) => setAccount(e.target.value)} name="" id="" defaultValue={""}>
              <option value="" disabled>Selecciona una cuenta</option>
              {
                plexAccounts.map((acc) => {
                  return (<>
                    <option key={acc._id} value={acc._id}>{acc.email}</option>
                  </>)
                })
              }
            </select>
            <button onClick={getDevicesFromServer}>Buscar</button>
          </div>

          <div  className="devices__list__to__migrate">
            {
              devicesNoRegistered.map((device) => {
                return (
                  <div key={device.id} className="device">
                    <div className="card-device">
                      <div className="header">
                        <small className="id">
                          {device.id}
                        </small>
                        <div className="title">
                          {device.device} - {device.name}
                        </div>
                        <div className="model">
                          {device.model}{device.vendor && `- ${device.vendor}`}
                        </div>
                        
                        <div className="createAt">
                          {device.createdAt}
                        </div>
                      </div>

                      <div className="footer">
                       
                          <button onClick={()=>{
                            setOpenModalToRegister(true)
                            setSelectedDevice(device)
                          }} type='button' className='btn-primary'>Registrar</button>
                        
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

          {
            openModalToRegister 
            && 
            <Modal setOpenModal={setOpenModalToRegister} title="Registrar">
                <form onSubmit={submit}>
                  <div className="form__group">
                    <label htmlFor="">Name:</label>
                    <input onChange={onImputChangeHandler} type="text" required name="name" id="" />
                  </div>
                  <div className="form__group">
                    <label htmlFor="">Email:</label>
                    <input onChange={onImputChangeHandler} type="email" required name="email" id="" />
                  </div>

                  <div className="form__group">
                    <label htmlFor="">ExpireAt:</label>
                    <input onChange={onImputChangeHandler} type="date" required name="expireAt" />
                  </div>

                  <div className="form__group">
                    <label htmlFor="">Seller:</label>
                    <select onChange={onImputChangeHandler} name="seller" >
                       <option value="">Yo</option>
                       {
                        resellers.map(resell=>{
                          return (<>
                          <option value={resell._id} key={resell._id}>{resell.reseller.email}</option>
                          </>)
                        })
                       }
                    </select>
                  </div>
                  <BtnPrimary title="Agregar"/>
                </form>

            </Modal>
          }
        </Modal>}
    </div>
  )
}
