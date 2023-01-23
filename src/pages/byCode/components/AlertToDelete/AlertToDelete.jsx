import React from 'react'
import SWAlert from '../../../../components/SwAlert/SWAlert';
import { useDeleteDevice } from '../../hooks/useDeleteDevice';

export const AlertToDelete = ({deviceToDelete,setDevicesState,setOpenModal}) => {
    const [deleteDevice, loadingDelete] = useDeleteDevice();

    const deleteDeviceFn = async (deviceID) => {
      try {
          const response = await deleteDevice({
              body: JSON.stringify({
                  deviceID
              })
          });

          console.log(response);
          SWAlert.alert({
              title: "Dispocitivo eliminado"
          })
          setDevicesState(ds => !ds);
          setOpenModal(false)
      } catch (error) {
          SWAlert.error({
              title: error.message
          })
      }
  }

  return (
    <div className='alert alert__device_delete'>
       <h3>Seguro que quieres eliminar a {deviceToDelete.name}</h3>

       <div className="buttonsd">
         <div className="btn btn-secondary" onClick={()=>{
          setOpenModal(false)
         }}>Cancelar</div>
         <div className="btn btn-danger m-2" onClick={()=>{
          deleteDeviceFn(deviceToDelete._id)
         }}>Si,Eliminar</div>
       </div>
    </div>
  )
}
