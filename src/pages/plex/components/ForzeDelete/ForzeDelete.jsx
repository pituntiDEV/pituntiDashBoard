import React from 'react'
import useFetchApi from '../../../../hook/useFetchApi'
import SWAlert from '../../../../components/SwAlert/SWAlert'

export const ForzeDelete = ({ id, setOpenModal, state, users, setUsers }) => {
    const [deleteUser, loading] = useFetchApi({
        url: `/api/plex/user/deleteDB/${id}`,
        method: "DELETE"
    })
    const deleteUserDB = () => {
        deleteUser()
            .then(() => {
                SWAlert.alert({
                    title: "Deleted"
                })
                if (state) {
                    state(s => !s);
                }
                if (users) {
                    const updatedUsers = users.filter(u => u._id != id);
                    setUsers(updatedUsers);
                }

                setOpenModal(false);
            })
            .catch(error => {
                SWAlert.error({
                    title: error.title
                })
            })
    }
    return (
        <button type="button" className='btn btn-warning' onClick={deleteUserDB}><i className="fa-solid fa-circle-radiation"></i> Eliminación forzada en DB</button>
    )
}
