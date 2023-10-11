import React, { useEffect, useState } from 'react'
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon'
import Modal from '../../../../components/modal/Modal'
import "./EditPackageForm.scss";
import { useGetEmbyLibraries } from '../../../../hook/emby/useGetEmbyLibraries';
import { EditPackageForm } from './EditPackageForm';
export const EditPackage = ({ packages, packageToEdit, setPackages }) => {
    //States
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <EditSquareIcon onClick={() => setOpenModal(true)} />
            {openModal &&
                <Modal title='Editar paquete' setOpenModal={setOpenModal}>
                    <EditPackageForm setOpenModal={setOpenModal} packages={packages} packageToEdit={packageToEdit} setPackages={setPackages} />
                </Modal>}

        </div>
    )
}
