import React, { useState } from 'react'
import Modal from '../../../../components/modal/Modal'
import { NewPackageForm } from './NewPackageForm'

export const Options = ({ setPackages, packages }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <div onClick={() => setOpenModal(true)} className="btn btn-primary">
                Agregar nuevo paquete
            </div>
            {openModal &&
                <Modal setOpenModal={setOpenModal} title='Crear nuevo paquete'>
                    <NewPackageForm packages={packages} setPackages={setPackages} setOpenModal={setOpenModal} />
                </Modal>}
        </>
    )
}
