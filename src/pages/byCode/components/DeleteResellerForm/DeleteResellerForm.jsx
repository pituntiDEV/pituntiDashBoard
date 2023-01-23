import React from 'react'
import SWAlert from '../../../../components/SwAlert/SWAlert'
import useFetchApi from '../../../../hook/useFetchApi'

export const DeleteResellerForm = ({user,setOpenModal,setResellersState}) => {
    const [deleteReseller,loading] = useFetchApi({
        url:`/api/byCode/resellers/${user._id}`,
        method: 'DELETE'
    })

    const submit=async(e)=>{
        e.preventDefault();
        try {
            const resp = await deleteReseller();
            SWAlert.alert({
                title:"Reseller Eliminado"
            }) 
            setOpenModal(false);
            setResellersState(s=>!s);
        } catch (error) {
            SWAlert.error({
                title:"Algo salio mal"
            })
        }

    }
  return (
    <form onSubmit={submit}>
        <div className="alert alert-danger">Seguro que quieres elimnar a {user.reseller.email}?</div>

        <div className="btns d-flex gap-4">
            <input className='btn btn-primary' type="submit" value="Si , Eliminar" />
            <input onClick={()=>{
                setOpenModal(false)
            }} className='btn btn-secondary' type="button" value="Cancelar" />
        </div>
    </form>
  )
}
