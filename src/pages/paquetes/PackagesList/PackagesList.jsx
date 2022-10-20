import React, { useState } from 'react'
import { useEffect } from 'react';
import { BookIcon } from '../../../components/icons/BookIcon';
import { EditSquareIcon } from '../../../components/icons/EditSquareIcon';
import { ServerIcon } from '../../../components/icons/ServerIcon';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import Modal from '../../../components/modal/Modal';
import useFetchApi from '../../../hook/useFetchApi';
import { DeletePackage } from './DeletePackage';
import { LibsSelection } from './libsSelection/LibsSelection';
import "./PackagesList.scss";
export const PackagesList = ({ server,newPackageState }) => {

  //States
  const [packages, setPackages] = useState([]);
  const [openModalToEdit,setOpenModalToEdit] = useState(false);
  const [openModalToDelete ,setOpenModalToDelete] = useState(false);
  const [paquete,setPaquete] = useState(null);
  const [paqueteState,setPaqueteState] = useState(false);


  //Custom Hooks 
  const [getPackages, loadingGetPackages] = useFetchApi({
    url: `/api/package/plex/get/all`,
    method: 'GET',
  })



  useEffect(() => {
    getPackages().then(({ data }) => {
      setPackages(data);
      console.log(data);
    })
  }, [newPackageState,paqueteState])

  return (
    <div className="packages__list">

      <h2>Mis paquetes:</h2>
      <div className="packages_container">


        <div className="packages">
          {
            packages.map(pk => {
              return (
                <div className='package' key={pk._id}>
                   <div className="control">
                    <span onClick={()=>{
                      setOpenModalToEdit(true);
                      setPaquete(pk);
                      
                    }}><EditSquareIcon/></span>
                    <span onClick={()=>{
                      setOpenModalToDelete(true);
                      setPaquete(pk)
                    }}><TrashIcon className="text-danger"/></span>
                    <span className="num_libs"><BookIcon/> <small>{pk.libs.length}</small></span>

                  </div>

                  <div className="info">
                    <div className="img-container">
                      <img src={pk.account.data.user.thumb} alt="" />
                    </div>
                    <span>{pk.name}</span>
                    <span><ServerIcon/>  {pk.server.data.name}</span>
                    
                  </div>
                 
                </div>
              )
            })
          }

        </div>

      </div>

      {/* Modals */}

      {/* Edit */}
      {openModalToEdit &&
       <Modal title="Editar Paquete" setOpenModal={setOpenModalToEdit}>
           <LibsSelection setOpenModal={setOpenModalToEdit} setPaqueteState={setPaqueteState} pack={paquete}/>
      </Modal>}
      {/* Delete */}
      {openModalToDelete &&
       <Modal title="Eliminar paquete" setOpenModal={setOpenModalToDelete}>
           <DeletePackage setOpenModal={setOpenModalToDelete} setPaqueteState={setPaqueteState} pack={paquete}/>
      </Modal>}
    </div>

  )
}
