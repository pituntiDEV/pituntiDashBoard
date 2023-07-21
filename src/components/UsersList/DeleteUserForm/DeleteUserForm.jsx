import React, { useContext } from 'react'
import { UsersContext } from '../../../context/usersContext';
import useFetchApi from '../../../hook/useFetchApi';
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../SwAlert/SWAlert';
import "./DeleteUserForm.scss";
export const DeleteUserForm = ({ user, users, setUsers, setOpenModal, }) => {

    //States
    //Custom Hooks
    const [deleteUser] = useFetchApi({
        url: `/api/plex/user/delete/${user._id}`,
        method: 'DELETE',
    })

    const submit = (e) => {
        e.preventDefault();

        deleteUser().then(data => {
            const allUsersCopy = users.filter(u => u._id != user._id);
            setUsers(allUsersCopy);
            setOpenModal(false)
        }).catch(err => {
            SWAlert.alert({
                title: err.message || "Ago salio mal",
                icon: "error"
            })
            console.log(err);
        });

    }

    return (
        <form onSubmit={submit} className="delete-user-form" >
            <div className="message">
                Esta seguro que quiere eliminar a <span> {user.name}?</span>
            </div>
            <div className="buttons">
                <BtnPrimary title="SI" />
                <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="NO" />
            </div>
        </form>
    )
}
