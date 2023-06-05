import React from 'react'
import useFetchApi from '../../../../../hook/useFetchApi'
import { BtnPrimary } from '../../../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../../SwAlert/SWAlert'

export const DeleteReseller = ({ setOpenModal, reseller, setResellersState }) => {
  //custom Hooks
  const [deleteReseller, loadingDeleteReseller] = useFetchApi({
    url: `/api/resellers/${reseller._id}`,
    method: 'DELETE',

  })

  const deleteResell = () => {
    deleteReseller()
      .then(data => {
        SWAlert.alert({
          title: data.message || "Reseller Eliminado"
        })
        setOpenModal(false); //
        setResellersState(s => !s);
      })
      .catch(error => {
        SWAlert.error({
          title: error.message || "algo salio mal"
        })
      })
  }
  return (
    <div>
      <h2>
        Estas seguro que quires eliminar a
        <span className='text-danger'> {reseller.reseller.email}</span> ?
      </h2>
      <div className="btns">
        <BtnPrimary onClick={deleteResell} className="bg-danger" title="Si,Eliminar" />
        <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />
      </div>
    </div>
  )
}
