import React from 'react'
import useFetchApi from '../../../../../../hook/useFetchApi'
import { useContext } from 'react'
import { Context } from '../../../../PlexUsersContext'
import SWAlert from '../../../../../../components/SwAlert/SWAlert'

export const DeleteForm = ({ user, setOpenModal }) => {
    const { users, setUsers } = useContext(Context);
    const [deleteUser] = useFetchApi({
        url: `/api/plex/v2/users/${user._id}`,
        method: "DELETE"
    })
    const submit = (e) => {
        e.preventDefault();
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
                Seguro que quieres eliminar a {user.email}?
            </div>

            <button className='btn btn-danger'>
                Si, Eliminar
            </button>
        </form>
    )
}
