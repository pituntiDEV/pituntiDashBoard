import React, { useState } from 'react'
import { ServerIcon } from '../../../../../../../components/icons/ServerIcon'
import Modal from '../../../../../../../components/modal/Modal';
import { ChangeServersAndPackagesForm } from './ChangeServersAndPackagesForm';

export const ChangeServersAndPackages = (props) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <ServerIcon onClick={() => setOpenModal(true)} />
            {openModal &&
                <Modal setOpenModal={setOpenModal} title="Change Server">
                    <ChangeServersAndPackagesForm {...props} setOpenModal={setOpenModal} />
                </Modal>}
        </div>
    )
}
