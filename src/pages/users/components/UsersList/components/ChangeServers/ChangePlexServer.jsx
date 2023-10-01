import React from 'react'
import { ServerIcon } from '../../../../../../components/icons/ServerIcon'
import Modal from '../../../../../../components/modal/Modal'
import { ChangePlexServerForm } from './ChangePlexServerForm'
import { useState } from 'react'

export const ChangePlexServer = (props) => {
    const { langPage } = props;
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <ServerIcon onClick={() => setOpenModal(true)} />
            {openModal &&
                <Modal title={langPage.changeServer} setOpenModal={setOpenModal}>
                    <ChangePlexServerForm setOpenModal={setOpenModal} {...props} />
                </Modal>
            }

        </>
    )
}
