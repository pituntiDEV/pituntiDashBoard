import React from 'react'
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon'
import Modal from '../../../../components/modal/Modal'
import { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary'
import useFetchApi from '../../../../hook/useFetchApi'
import SWAlert from '../../../../components/SwAlert/SWAlert'

export const EditEmbyUser = ({ user, users, setUsers }) => {
  const [formData, setFormData] = useState({ ...user });
  const [openModal, setOpenModal] = useState(false);

  //Custom Hooks
  const [editUser, loading] = useFetchApi({
    url: `/api/emby/users/${user._id}`,
    method: "PUT"
  })


  //Functions

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const submit = (e) => {
    e.preventDefault();
    editUser({ body: JSON.stringify(formData) })
      .then(data => {
        const userIndex = users.findIndex(u => u._id == user._id);
        const usersUpdated = [...users]
        usersUpdated[userIndex] = data;
        setUsers(usersUpdated);
        SWAlert.alert({
          title: 'Users updated'
        })
        setOpenModal(false)
      })
      .catch(error => {
        SWAlert.error({
          title: error.message || "Algo salio mal"
        })

      })
  }


  return (
    <>
      <li onClick={() => setOpenModal(true)}><EditSquareIcon /></li>
      {openModal &&
        <Modal setOpenModal={setOpenModal} title={`Edit ${user.name}`}>
          <form onSubmit={submit}>
            <div className="form__group">
              <label htmlFor="name">Name:</label>
              <input value={formData.name} onChange={onChange} type="text" name="name" id="" />
            </div>

            <div className="form__group">
              <label htmlFor="connections">Conexiones:</label>
              <input value={formData.connections} onChange={onChange} type="number" min={1} name="connections" id="" />
            </div>

            <div className="form__group">
              <label htmlFor="expireAt">ExpireAt:</label>
              <input value={new Date(formData.expireAt).toISOString().slice(0, 16)} onChange={onChange} type="datetime-local" name="expireAt" id="expireAt" />
            </div>

            <div className="d-flex gap-3">
              <BtnPrimary title="Editar" />
              <BtnSecondary onClick={() => setOpenModal(false)} type="button" title="Cancelar" />

            </div>

          </form>
        </Modal>}
    </>
  )
}
