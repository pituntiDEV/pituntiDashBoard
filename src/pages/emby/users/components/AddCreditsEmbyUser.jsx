import React from 'react'
import { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary'
import { CoinPlusIcon } from '../../../../components/icons/InputWithIcon/CoinPlusIcon'
import Modal from '../../../../components/modal/Modal'
import SWAlert from '../../../../components/SwAlert/SWAlert'
import useFetchApi from '../../../../hook/useFetchApi'

export const AddCreditsEmbyUser = ({ user, setUpdateUserState }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    credits: "",
    connections: user.connections,
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
        console.log(data);
        SWAlert.alert({
          title: data.message || "Success",
        });
        setUpdateUserState(s => !s);
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

            <div className="d-flex gap-3">
              <BtnPrimary type="submit" title="Agregar" />
              <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />
            </div>
          </form>
        </Modal>}
    </>
  )
}
