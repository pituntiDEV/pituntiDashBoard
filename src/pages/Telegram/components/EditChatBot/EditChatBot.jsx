import React, { useEffect, useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon'
import Modal from '../../../../components/modal/Modal'
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import useGetAccountServers from '../../../../hook/useGetAccountServers';
import "./EditChatBot.scss";
export const EditChatBot = ({ bot, bots, setBots }) => {

  //States
  const [formData, setFormData] = useState({
    ...bot,
    servers: bot.servers.map(s => s._id)
  });

  const [openModal, setOpenModal] = useState(false);

  const [servers, setServers] = useState([])

  //Custom Hooks
  const [getServers, loadingServers] = useGetAccountServers();

  const [editBot, loading] = useFetchApi({
    url: `/api/telegram/bot/${bot._id}`,
    method: "PUT"
  })


  //Effects
  useEffect(() => {
    getServers()
      .then(data => {
        setServers(data)
      })
  }, [])


  //Functions

  const onChangeServers = (server) => {
    const existe = formData.servers.find(s => s === server._id);
    if (!existe) {
      const servers = [...formData.servers, server._id];
      setFormData({ ...formData, servers });
    } else {
      const servers = formData.servers.filter(s => s !== server._id);
      setFormData({ ...formData, servers })
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submit = (e) => {
    e.preventDefault();
    editBot({ body: JSON.stringify(formData) })
      .then(data => {
        SWAlert.alert({
          title: data.message || "Editado"
        })
        const newBots = [...bots];
        const index = newBots.findIndex(b => b._id == bot._id);
        newBots[index] = formData;
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
    <div className='EditChatBot'>
      <EditSquareIcon onClick={() => setOpenModal(true)} />

      {
        openModal &&
        <Modal title={`Editar a ${bot.name}`} setOpenModal={setOpenModal}>
          <form onSubmit={submit} className='EditChatBot'>

            <div className="form__group">
              <label htmlFor="name">Nombre:</label>
              <input onChange={onChange} type="text" value={formData.name} name="name" id="" />
            </div>

            <div className="form__group">
              <label htmlFor="name">Token:</label>
              <input onChange={onChange} type="text" value={formData.token} name="token" id="" />
            </div>

            <div className="form__group">
              <label htmlFor="name">ChatID:</label>
              <input onChange={onChange} type="text" value={formData.chatId} name="chatId" id="" />
            </div>

            <div className="form__groups">
              <span className='fw-bold'>Servers:</span>
              <div className="servers_container">
                {
                  servers.map(server => {
                    return (
                      <div onClick={() => onChangeServers(server)} className={`server ${formData.servers.includes(server._id) && "selected"}`} key={server._id}>
                        {server.data.name}
                      </div>
                    )
                  })
                }

              </div>
            </div>

            <div className="form__groups">
              <input onChange={(e) => {
                setFormData({ ...formData, notifications: e.target.checked })
              }} type="checkbox" checked={formData.notifications} name="chatId" id="chatId" />
              <small className='text-muted' htmlFor=""> Usar este Bot Para Notificaciones:</small>
            </div>

            {
              formData.notifications &&
              <>
                <small className='fw-bold'>Notificarme</small>
                <ul>
                  <li>
                    <input onChange={(e) => {
                      setFormData({ ...formData, recents: e.target.checked })
                    }} checked={formData.recents} type="checkbox" name="" id="" /> <span className='text-muted'>Agregado recientemente</span>
                  </li>

                  <li>
                    <input onChange={(e) => {
                      setFormData({ ...formData, serverOffline: e.target.checked })
                    }} checked={formData.serverOffline} type="checkbox" name="" id="" /> <span className='text-muted'>Servers caidos</span>
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
