import React, { useContext } from 'react'
import { useState } from 'react'
import useFetchApi from '../../../../../../hook/useFetchApi';
import { Context } from '../../../../PlexUsersContext';
import { OnlyAdminOptions } from './OnlyAdminOptions';
import SWAlert from '../../../../../../components/SwAlert/SWAlert';

export const EditForm = ({ user, setOpenModal, langPage }) => {
    console.log(langPage);
    const [formData, setFormData] = useState({ ...user });
    const { users, setUsers } = useContext(Context);

    const [updateUser, loading] = useFetchApi({
        url: `/api/plex/v2/users/${user._id}`,
        method: "PUT"
    })
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const submit = (e) => {
        e.preventDefault();
        updateUser({ body: JSON.stringify(formData) })
            .then(data => {
                const findIndex = users.findIndex(u => u._id == user._id);
                const usersUpdated = [...users];
                usersUpdated[findIndex] = data;
                setUsers(usersUpdated);
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
            <div className="form__group">
                <label htmlFor="name">{langPage.name}:</label>
                <input type="text" onChange={onChange} name="name" value={formData.name || ""} />
            </div>

            <div className="form__group">
                <label htmlFor="whatsapp">Whatsapp:</label>
                <input type="text" onChange={onChange} name="whatsapp" value={formData.whatsapp || ""} />
            </div>

            <div className="form__group">
                <label htmlFor="comments">{langPage.comments}:</label>
                <input type="text" onChange={onChange} name="comments" value={formData.comments || ""} />
            </div>

            <OnlyAdminOptions langPage={langPage} onChange={onChange} formData={formData} user={user} />

            <div className="d-flex gap-3">
                <button className='btn btn-primary'>{langPage.btnSubmit.edit}</button>
            </div>


        </form>
    )
}
