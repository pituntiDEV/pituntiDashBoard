import React from 'react'
import { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary'
import { CoinPlusIcon } from '../../../../components/icons/InputWithIcon/CoinPlusIcon'
import Modal from '../../../../components/modal/Modal'
import SWAlert from '../../../../components/SwAlert/SWAlert'
import useFetchApi from '../../../../hook/useFetchApi'
import { useContext } from 'react'
import { Context } from '../EmbyUsersContext'

export const AddCreditsEmbyUser = ({ user }) => {
  const { users, setUsers } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    credits: "",
    connections: user.connections,
    tv: false
  })
  const [addCredits, loading] = useFetchApi({
    url: `/api/emby/users/${user._id}/credits`,
    method: "PUT"
  })
  ///api/emby/users/63e9f13ad362c58fb97ea02b/credits
  const addCreditsHandler = (e) => {
    e.preventDefault();
    addCredits({ body: JSON.stringify(formData) })
      .then(data => {
        SWAlert.alert({
          title: data.message || "Success",
        });
        const usersUpdated = [...users];
        const userIndex = usersUpdated.findIndex(u => u._id == user._id);
        usersUpdated[userIndex] = data;
        setUsers(usersUpdated);
        setOpenModal(false)
      })
      .catch(error => {
        SWAlert.error({
          title: error.message || "Error",
        })

      })
  }

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onChangeTV = (e) => {
    setFormData({ ...formData, tv: e.target.checked });
  }
  return (
    <>
      <li onClick={() => setOpenModal(true)}><CoinPlusIcon /></li>
      {openModal &&
        <Modal setOpenModal={setOpenModal} title={`Agregar creditos a ${user.email}`}>
          <form onSubmit={addCreditsHandler} action="">
            <div className="form__group">
              <label htmlFor="credits">Credits</label>
              <input required min={1} onChange={onChangeHandler} type="number" name="credits" id="credits" />
            </div>
            <div className="form__group">
              <label htmlFor="connections">Conexiones</label>
              <input required value={formData.connections} min={1} onChange={onChangeHandler} type="number" name="connections" id="connections" />
            </div>

            <div className="form__group">
              <label htmlFor="connections">TV</label>
              <div className="">
                <input onChange={onChangeTV} type="checkbox" name="tv" id="" /> TV?
              </div>
            </div>

            <div className="d-flex gap-3">
              <BtnPrimary type="submit" title="Agregar" />
              <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />
            </div>
          </form>
        </Modal>}
    </>
  )
}
