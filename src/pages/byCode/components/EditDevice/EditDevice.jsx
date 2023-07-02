import React, { useState } from 'react'
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import "./EditDevice.scss";
import utils from "../../../../utils/date/index"
export const EditDevice = ({ deviceToEdit, setDevicesState, setOpenModal }) => {

  const isAdmin = localStorage.getItem('_id') == deviceToEdit.admin;

  const [deviceData, setDeviceData] = useState({
    name: deviceToEdit.name,
    email: deviceToEdit.email,
    deviceID: deviceToEdit._id,
    expireAt: deviceToEdit.expireAt,
    whatsapp: deviceToEdit.whatsapp,
    deleteAt: deviceToEdit.deleteAt
  })
  const [edit, loading] = useFetchApi({
    url: `/api/byCode/`,
    method: "PUT"
  })

  const onChange = (e) => {

    setDeviceData({ ...deviceData, [e.target.name]: e.target.value });
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await edit({
        body: JSON.stringify(deviceData)
      })
      setDevicesState(d => !d);
      setOpenModal(false)
      SWAlert.alert({
        title: `User ${deviceToEdit.name} updated`
      })
    } catch (error) {
      SWAlert.error({
        title: error.message || "Error"
      })
    }


  }
  return (
    <form onSubmit={submit} className='edit__device__form'>
      <div className="form__group">
        <label htmlFor="name">Name:</label>
        <input onChange={onChange} required type="text" name="name" id="name" value={deviceData.name} />
      </div>
      <div className="form__group">
        <label htmlFor="name">Email:</label>
        <input onChange={onChange} required type="email" name="email" id="name" value={deviceData.email} />
      </div>
      {/* deleteAt */}
      <div className="form__group">
        <label htmlFor="whatsapp">Whatsapp:</label>
        <input onChange={onChange} type="text" name="whatsapp" id="whatsapp" value={deviceData.whatsapp} />
      </div>

      <div className="form__group">
        <label htmlFor="deleteAt">Eliminar despues de vencido:</label>
        <input onChange={onChange} type="number" min={0} name="deleteAt" id="deleteAt" value={deviceData.deleteAt} />
      </div>

      {isAdmin &&
        <div className="form__group">
          <label htmlFor="date">Fecha expiracion:</label>
          <input onChange={onChange} required type="date" name="expireAt" id="date" value={utils.formatDate(deviceData.expireAt, "YYYY-MM-DD")} />
        </div>}

      <button><EditSquareIcon /> Editar</button>
    </form>
  )
}
