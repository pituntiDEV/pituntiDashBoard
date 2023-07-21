import React from 'react'
import { ServerIcon } from '../../../../../../components/icons/ServerIcon'
import Modal from '../../../../../../components/modal/Modal'
import { ChangePlexServerForm } from './ChangePlexServerForm'
import { useState } from 'react'

export const ChangePlexServer = ({ user }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <ServerIcon onClick={() => setOpenModal(true)} />
            {openModal &&
                <Modal title='Cambiar Server' setOpenModal={setOpenModal}>
                    <ChangePlexServerForm setOpenModal={setOpenModal} user={user} />
                </Modal>
            }

        </>
    )
}
