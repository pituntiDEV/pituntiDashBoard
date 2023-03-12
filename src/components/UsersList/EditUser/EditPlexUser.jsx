import React, { useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import utils from "../../../utils/date/index";
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../SwAlert/SWAlert';
export const EditPlexUser = ({ user, setOpenModal, setUsers, users }) => {
    console.log(user.delete);
    const expireAt = utils.formatDate(user.expireAt, "YYYY-MM-DDTHH:mm");
    const isAdmin = localStorage.getItem("_id") == user.admin._id;
    const [formData, setFormData] = useState({
        name: user.name,
        expireAt: expireAt,
        deleteDays:user.delete?user.deleteDays:"",
        removeLibsDays:user.removeLibs?user.removeLibsDays:""
        
    })
    const [update, loading] = useFetchApi({
        url: `/api/plex/user/info/${user._id}`,
        method: "PUT"
    })
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();
        update({ body: JSON.stringify(formData) })
            .then(data => {
                const usersUpdated = [...users]
                const userUpdate = usersUpdated.find(u => u._id == user._id);
                userUpdate.name = formData.name;
                userUpdate.expireAt = formData.expireAt;
                userUpdate.deleteDays = formData.deleteDays;
                userUpdate.removeLibsDays=formData.removeLibsDays;
                setOpenModal(false);
                setUsers(usersUpdated)
                SWAlert.alert({
                    title: data.message || "Updated"
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
                <label htmlFor="name">Name:</label>
                <input onChange={onChange} type="text" name="name" id="name" value={formData.name} />
            </div>
            {isAdmin && <div className="form__group">
                <label htmlFor="name">Fecha Expiracíon:</label>
                <input onChange={onChange} type="datetime-local" name="expireAt" id="name" value={formData.expireAt} />
            </div>}
            <div className="form__group">
                <label htmlFor="name">Eliminar despues que vencio(dias)</label>
                <input onChange={onChange} type="number" placeholder='Dejar en blaco para no eliminar' name="deleteDays" id="name" value={formData.deleteDays} />
            </div>
            <div className="form__group">
                <label htmlFor="name">Quitar librerias despues que vencio(dias)</label>
                <input onChange={onChange} type="number" placeholder='Dejar en blaco para no quitar libs' name="removeLibsDays" id="name" value={formData.removeLibsDays} />
            </div>
            <div className="d-flex gap-2">
                <BtnPrimary title="Editar" />
                <BtnSecondary onClick={() => setOpenModal(false)} title="Cancelar" type="button" />
            </div>
        </form>
    )
}
