import React, { useState } from 'react'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import Modal from '../../../../components/modal/Modal';
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary';
import useFetchApi from '../../../../hook/useFetchApi';
import SWAlert from '../../../../components/SwAlert/SWAlert';

export const DeletePackageForm = ({ packageToDelete, packages, setPackages }) => {
    const [openModal, setOpenModal] = useState(false);
    const [deletePackage, loading] = useFetchApi({
        url: `/api/jellyfin/packages/${packageToDelete._id}`,
        method: "DELETE"
    })

    const submit = () => {
        deletePackage()
            .then((data) => {
                SWAlert.alert({
                    title: data.message || "Eliminado"
                })
                const packagesUpdated = packages.filter(pack => pack._id != packageToDelete._id);
                setPackages(packagesUpdated);
                setOpenModal(false)
            })
            .catch((error) => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })
    }
    return (
        <div>
            <TrashIcon onClick={() => setOpenModal(true)} />

            {openModal &&
                <Modal title='Eliminar paquete' setOpenModal={setOpenModal}>
                    <div className="alert alert-danger">
                        Seguro quieres eliminar este paquete?
                    </div>

                    <div className="d-flex gap-3">
                        <BtnPrimary onClick={submit} title="Si,Eliminar" />
                        <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />
                    </div>
                </Modal>}

        </div>
    )
}
