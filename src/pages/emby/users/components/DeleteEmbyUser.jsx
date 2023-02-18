import React from 'react'
import { useState } from 'react';
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import Modal from '../../../../components/modal/Modal';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';

export const DeleteEmbyUser = ({ user, setUpdateUserState }) => {
  const [openModal, setOpenModal] = useState(false)
  // const userID = user.data.data.Id;
  const userID = user._id;
  const [deleteUser, loading] = useFetchApi({
    url: `/api/emby/users/${userID}/delete`,
    method: 'DELETE'
  })

  const deleteUserHandler = (e) => {
    e.preventDefault();
    deleteUser()
      .then(data => {
        setOpenModal(false);
        SWAlert.alert({
          title: data.message || "Eliminado"
        })
        setUpdateUserState(s => !s);
      })
      .catch(error => {
        // console.log(error);
        SWAlert.error({
          title: error.message || "Algo salio mal"
        })
      })
  }
  return (
    <>
      <li onClick={() => setOpenModal(true)}><TrashIcon /></li>
      {openModal &&
        <Modal title={`Eliminar a ${user.email}`} setOpenModal={setOpenModal}>
          <form onSubmit={deleteUserHandler} className="delete">
            <div className="dialog">
              <div className="alert alert-danger">
                Seguro que quieres eliminar a {user.email}?
              </div>
            </div>
            <div className="d-flex gap-3">
              <BtnPrimary type="submit" title="Eliminar" className="mr-1" />
              <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />

            </div>
          </form>
        </Modal>}
    </>
  )
}