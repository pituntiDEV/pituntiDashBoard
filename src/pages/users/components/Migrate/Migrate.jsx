import React from 'react'
import Modal from '../../../../components/modal/Modal'
import { useState } from 'react'
import { useContext } from 'react'
import { appContext } from '../../../../context/AppContext'
import { useGetPackagesByServer } from '../../../../hook/useGetPackagesByServer'
import { useEffect } from 'react'
import { PlexServersAndPackages } from '../../PlexServersAndPackages/PlexServersAndPackages'

export const Migrate = ({ users, setSelectedUsers, }) => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        users,
        servers: []
    })

    const [getPackages, loading] = useGetPackagesByServer(formData.server);

    useEffect(() => {
        if (formData.server) {
            getPackages().then(data => setFormData({ ...formData, packages: data }))
        }
    }, [formData.server])

    const onchangeServer = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, server: value });


    }

    const migrateUsers = (e) => {
        e.preventDefault();

    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className='btn btn-success text-white'>Migrar</button>
            {openModal &&
                <Modal setOpenModal={setOpenModal} title='Migrar'>
                    <form onSubmit={migrateUsers}>

                        <PlexServersAndPackages onlyAdmin={true} formData={formData} setFormData={setFormData} />

                        <button className='btn btn-primary'>Migrar</button>

                    </form>
                </Modal>
            }
        </>
    )
}
