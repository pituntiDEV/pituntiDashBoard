import React, { useState } from 'react'
import { ServerIcon } from '../../../components/icons/ServerIcon'
import Modal from '../../../components/modal/Modal'
import { ServersAndPackageEdit } from '../../../components/Resellers/ResellerList/EditResellerForm/ServersAndPackageEdit/ServersAndPackageEdit'

export const ChangeServers = ({ setResellersState, reseller }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <ServerIcon onClick={() => setOpenModal(true)} />

            {openModal &&
                <Modal title="Servers And Packages" setOpenModal={setOpenModal}>
                    <ServersAndPackageEdit setOpenModal={setOpenModal} setResellersState={setResellersState} reseller={reseller} />
                </Modal>
            }
        </>
    )
}
