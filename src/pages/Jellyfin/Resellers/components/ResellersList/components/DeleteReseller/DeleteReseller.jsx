import React, { useContext, useState } from 'react'
import { TrashIcon } from '../../../../../../../components/icons/TrashIcon'
import Modal from '../../../../../../../components/modal/Modal'
import useFetchApi from '../../../../../../../hook/useFetchApi';
import SWAlert from '../../../../../../../components/SwAlert/SWAlert';
import { Context } from '../../../../ResellersContext';

export const DeleteReseller = ({ reseller }) => {
    //Context
    const { resellers, setResellers } = useContext(Context);
    const [openModal, setOpenModal] = useState(false);
    const [deleteReseller, loading] = useFetchApi({
        url: `/api/jellyfin/resellers/${reseller._id}`,
        method: "DELETE"
    })
    const deleteFunction = () => {
        deleteReseller()
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Reseller eliminado"
                })

                const resellersUpdated = resellers.filter(r => r._id != reseller._id);
                setResellers(resellersUpdated);
                setOpenModal(false)
            })
    }
    return (
        <div>
            <TrashIcon onClick={() => setOpenModal(true)} />

            {openModal &&
                <Modal title='Eliminar' setOpenModal={setOpenModal}>
                    <div className="alert alert-danger">
                        Seguro que quieres eliminar a {reseller.reseller.email}
                    </div>

                    <div className="d-flex gap-3">
                        <button className='btn btn-primary' onClick={deleteFunction}>Si,Eliminar</button>
                        <button className='btn btn-secondary' type='button' onClick={() => setOpenModal(false)}>Cancelar</button>
                    </div>
                </Modal>
            }

        </div>
    )
}
