import React from 'react'
import Modal from '../../../../components/modal/Modal'
import { useState } from 'react'
import { useContext } from 'react'
import { appContext } from '../../../../context/AppContext'
import { useGetPackagesByServer } from '../../../../hook/useGetPackagesByServer'
import { useEffect } from 'react'
import { PlexServersAndPackages } from '../../PlexServersAndPackages/PlexServersAndPackages'
import useFetchApi from '../../../../hook/useFetchApi'
import { Spinner } from '../../../../components/Spinner/Spinner'

export const Migrate = ({ users, setSelectedUsers, }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalToShowInfo, setOpenModalToShowInfo] = useState(false)
    const [counter, setCounter] = useState({
        total: users.length,
        success: 0,
        error: 0,
        loading: false
    })


    const [updateServers, loadingUpdating] = useFetchApi({
        url: `/api/plex/user/servers/migrate`,
        method: "POST"
    })
    const [formData, setFormData] = useState({
        servers: []
    })




    const migrateUsers = async (e) => {
        e.preventDefault();
        setOpenModalToShowInfo(true);
        setCounter({ ...counter, loading: true, success: 0, error: 0 })
        for (const user of users) {
            try {
                const data = await updateServers({ body: JSON.stringify({ ...formData, user }) });
                setCounter((counter) => ({ ...counter, success: counter.success + 1 }))

            } catch (error) {
                setCounter((counter) => ({ ...counter, error: counter.error + 1 }));
            }

        }

        setCounter((counter) => ({ ...counter, loading: false }))

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

            {
                openModalToShowInfo &&

                <Modal title='info' setOpenModal={setOpenModalToShowInfo}>
                    {counter.loading && <Spinner />}
                    <p> Total: {counter.total}</p>
                    <p> Success: {counter.success}</p>
                    <p> Errors {counter.error}</p>
                </Modal>
            }
        </>
    )
}
