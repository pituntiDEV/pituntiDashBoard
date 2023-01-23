import React, { useState } from 'react'
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import "./EditDevice.scss";
export const EditDevice = ({deviceToEdit,setDevicesState,setOpenModal}) => {

  const isAdmin = localStorage.getItem('_id')==deviceToEdit.admin;
  console.log(isAdmin);
    const [deviceData,setDeviceData] = useState({
        name: deviceToEdit.name,
        email: deviceToEdit.email,
        deviceID:deviceToEdit._id,
        expireAt: deviceToEdit.expireAt
    })
 const [edit,loading] = useFetchApi({
    url:`/api/byCode/`,
    method:"PUT"
 })

 const onChange = (e) =>{
    setDeviceData({...deviceData,[e.target.name]:e.target.value});
 }
 
 const submit=async(e)=>{
   e.preventDefault();
   try {
    const response = await edit({
        body:JSON.stringify(deviceData)
       })
       setDevicesState(d=>!d);
       setOpenModal(false)
       SWAlert.alert({
        title:`User ${deviceToEdit.name} updated`
       })
   } catch (error) {
      SWAlert.error({
        title:error.message || "Error"
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

        {isAdmin &&
        <div className="form__group">
            <label htmlFor="date">Fecha expiracion:</label>
            <input onChange={onChange} required type="date" name="expireAt" id="date" value={deviceData.expireAt} />
        </div>}

        <button><EditSquareIcon/> Editar</button>
    </form>
  )
}
