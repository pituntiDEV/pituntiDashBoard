import React, { useState } from 'react'
import { useEffect } from 'react'
import { EditSquareIcon } from '../../components/icons/EditSquareIcon';
import { CoinPlusIcon } from '../../components/icons/InputWithIcon/CoinPlusIcon';
import { TrashIcon } from '../../components/icons/TrashIcon';
import Modal from '../../components/modal/Modal';
import useFetchApi from '../../hook/useFetchApi'
import { AddCreditsToResellersForm } from './components/AddCreditsToResellersForm';
import { DeleteResellerForm } from './components/DeleteResellerForm/DeleteResellerForm';
import { EditResellerForm } from './components/EditResellerForm/EditResellerForm';
import { ShareForm } from './components/Shared/ShareForm/ShareForm';
import "./ResellersByCode.scss";
export const ResellersByCode = () => {
  //State
  const [resellers, setResellers] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [openModalToAddCredits, setOpenModalToAddCredits] = useState(false);
  const [openModalToEdit, setOpenModalToEdit] = useState(false);
  const [openModalToDelete, setOpenModalToDelete] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null)
  const [resellersState, setResellersState] = useState(false)
  //Custom Hooks
  const [getResellers, loading] = useFetchApi({
    url: `/api/byCode/resellers`,
    method: 'GET',
  })

  useEffect(() => {
    getResellers()
      .then(data => {
        setResellers(data)
      })
  }, [resellersState])
  return (
    <div className='ResellersByCode'>
      <div className="shared__by__code">
        <button onClick={() => setOpenModal(true)}><i className="fa-solid fa-share-nodes"></i> Agregar Reseller</button>
      </div>
      <h2 className='fw-bold m-4'>Resellers:</h2>
      <div className="resellers__list">
        {
          resellers.map(resell => {
            return (
              <div className='reseller' key={resell._id}>
                <div className="header">
                  <small>{resell.reseller.name}</small>
                  <p className='fw-bold email'>{resell.reseller.email}</p>
                  <hr />
                </div>

                <div className="footer">
                  <ul>
                    <li onClick={() => {
                      setUserToEdit(resell);
                      setOpenModalToEdit(true)
                    }}><EditSquareIcon /></li>
                    <li onClick={() => {
                      setUserToEdit(resell);
                      setOpenModalToAddCredits(true)
                    }}>
                      <span className='credits'>{resell.credits.length}</span>
                      <CoinPlusIcon />
                    </li>
                    <li onClick={()=>{
                      setUserToEdit(resell);
                      setOpenModalToDelete(true)
                    }}><TrashIcon /></li>
                  </ul>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        openModal &&
        <Modal title="Compratir" setOpenModal={setOpenModal}>
          <ShareForm setResellersState={setResellersState}  setOpenModal={setOpenModal} />
        </Modal>
      }

      {
        openModalToAddCredits &&
        <Modal title="Agregar creditos" setOpenModal={setOpenModalToAddCredits}>
          <AddCreditsToResellersForm setResellersState={setResellersState} user={userToEdit} setOpenModal={setOpenModalToAddCredits} />
        </Modal>
      }

      {
        openModalToEdit &&
        <Modal title="Editar" setOpenModal={setOpenModalToEdit}>
          <EditResellerForm setResellersState={setResellersState} user={userToEdit} setOpenModal={setOpenModalToEdit} />
        </Modal>
      }

      {
        openModalToDelete &&
        <Modal title="Editar" setOpenModal={setOpenModalToDelete}>
          <DeleteResellerForm setResellersState={setResellersState} user={userToEdit} setOpenModal={setOpenModalToDelete} />
        </Modal>
      }


    </div>
  )
}
