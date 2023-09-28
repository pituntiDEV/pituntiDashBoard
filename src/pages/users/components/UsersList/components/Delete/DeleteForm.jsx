import React, { useEffect, useState } from 'react'
import useFetchApi from '../../../../../../hook/useFetchApi'
import { useContext } from 'react'
import { Context } from '../../../../PlexUsersContext'
import SWAlert from '../../../../../../components/SwAlert/SWAlert'
import { ForzeDelete } from '../../../../../plex/components/ForzeDelete/ForzeDelete'
import useSocketIO from '../../../../../../hook/useSocketIO'
import { BtnLoading } from '../../../../../../components/Buttons/BtnLoading/BtnLoading'

export const DeleteForm = ({ user, setOpenModal, langPage }) => {
    const { users, setUsers } = useContext(Context);
    const [notify, setNotify] = useState([]);
    const [deleteUser, loading] = useFetchApi({
        url: `/api/plex/v2/users/${user._id}`,
        method: "DELETE"
    })

    const [io] = useSocketIO();

    useEffect(() => {
        if (io) {
            io.on("notify", (message) => {

                SWAlert.alert({ title: message.message, icon: "info" })

            })
        }
    }, [io])
    const submit = (e) => {
        e.preventDefault();
        setNotify([])
        deleteUser()
            .then(() => {
                const updatedUsers = users.filter(u => u._id != user._id);
                setUsers(updatedUsers);
                setOpenModal(false);
                SWAlert.alert({
                    title: "Success"
                })
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })
    }
    return (
        <form onSubmit={submit}>
            <div className="alert alert-danger">
                {langPage.messages.deleteConfirm} {user.email}?
            </div>
            {/* {
                notify.map(noti => {
                    return <div className={`alert alert-${noti.type}`} key={noti.message}>
                        {noti.message}
                    </div>
                })
            } */}
            <div className="d-flex gap-3">

                {loading ? <BtnLoading /> : <button className='btn btn-danger'>
                    {langPage.btnSubmit.confirm}
                </button>}

                <ForzeDelete id={user._id} users={users} setUsers={setUsers} setOpenModal={setOpenModal} />
            </div>

        </form>
    )
}
