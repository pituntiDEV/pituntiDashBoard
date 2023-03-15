import React, { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon'
import Modal from '../../../../components/modal/Modal'
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';

export const EditChatBot = ({ bot, bots, setBots }) => {
  const [openModal, setOpenModal] = useState(false);
  const [botUpdated, setBotUpdated] = useState(bot);

  const [editBot, loading] = useFetchApi({
    url: `/api/telegram/bot/${bot._id}`,
    method:"PUT"
  })

  const onChange = (e) => {
    setBotUpdated({ ...botUpdated, [e.target.name]: e.target.value });
  }

  const submit = (e) => {
    e.preventDefault();
    editBot({ body: JSON.stringify(botUpdated) })
      .then(data => {
        SWAlert.alert({
          title:data.message || "Editado"
        })
        const newBots = [...bots];
        const index = newBots.findIndex(b=>b._id==bot._id);
        newBots[index] = botUpdated;
        setBots(newBots);
        setOpenModal(false)

      })
      .catch(error => {
        SWAlert.error({
          title: error.message || "Algo salio mal"
        })
      })

  }
  return (
    <div>
      <EditSquareIcon onClick={() => setOpenModal(true)} />

      {
        openModal &&
        <Modal title={`Editar a ${bot.name}`} setOpenModal={setOpenModal}>
          <form onSubmit={submit}>

            <div className="form__group">
              <label htmlFor="name">Nombre:</label>
              <input onChange={onChange} type="text" value={botUpdated.name} name="name" id="" />
            </div>

            <div className="form__group">
              <label htmlFor="name">Token:</label>
              <input onChange={onChange} type="text" value={botUpdated.token} name="token" id="" />
            </div>

            <div className="form__group">
              <label htmlFor="name">ChatID:</label>
              <input onChange={onChange} type="text" value={botUpdated.chatId} name="chatId" id="" />
            </div>

            <div className="form__groups">
              <input onChange={(e) => {
                setBotUpdated({ ...botUpdated, notifications: e.target.checked })
              }} type="checkbox" checked={botUpdated.notifications} name="chatId" id="chatId" />
              <small className='text-muted' htmlFor=""> Usar este Bot Para Notificaciones:</small>
            </div>

            {
              botUpdated.notifications &&
              <>
                <small className='fw-bold'>Notificarme</small>
                <ul>
                  <li>
                    <input onChange={(e) => {
                      setBotUpdated({ ...botUpdated, recents: e.target.checked })
                    }} checked={botUpdated.recents} type="checkbox" name="" id="" /> <span className='text-muted'>Agregado recientemente</span>
                  </li>

                  <li>
                    <input onChange={(e) => {
                      setBotUpdated({ ...botUpdated, serverOffline: e.target.checked })
                    }} checked={botUpdated.serverOffline} type="checkbox" name="" id="" /> <span className='text-muted'>Servers caidos</span>
                  </li>
                </ul>
              </>
            }

            <div className="d-flex gap-3 ">
              <BtnPrimary title="Editar" />
              <BtnSecondary onClick={() => setOpenModal(false)} type="button" title="Cancelar" />
            </div>

          </form>
        </Modal>
      }
    </div>
  )
}
