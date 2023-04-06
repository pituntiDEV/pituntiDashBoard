import React, { useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi';
import utils from "../../../utils/date/index";
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../SwAlert/SWAlert';
export const EditPlexUser = ({ user, setOpenModal, setUsers, users }) => {
    const expireAt = utils.formatDate(user.expireAt, "YYYY-MM-DDTHH:mm");
    const isAdmin = localStorage.getItem("_id") == user.admin._id;
    const [formData, setFormData] = useState({
        name: user.name,
        expireAt: expireAt,
        deleteDays: user.delete ? user.deleteDays : "",
        removeLibsDays: user.removeLibs ? user.removeLibsDays : "",
        whatsapp:user.whatsapp,
        comments:user.comments

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
                const allUsersCopy=[...users];
                const userIndex= allUsersCopy.findIndex(u => u._id == user._id);
                allUsersCopy[userIndex] = data;
                setOpenModal(false);
                setUsers(allUsersCopy)
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
            <div className="form__group">
                <label htmlFor="whatsapp">WhatsApp:</label>
                <input onChange={onChange} type="text" name="whatsapp" id="whatsapp" value={formData.whatsapp} />
            </div>
            <div className="form__group">
                <label htmlFor="comments">Comentarios:</label>
                <input onChange={onChange} type="text" name="comments" id="comments" value={formData.comments} />
            </div>
            {isAdmin && <div className="form__group">
                <label htmlFor="name">Fecha Expiracíon:</label>
                <input onChange={onChange} type="datetime-local" name="expireAt" id="name" value={formData.expireAt} />
            </div>}

            {isAdmin &&
                <>
                    <div className="form__group">
                        <label htmlFor="name">Eliminar despues que vencio(dias)</label>
                        <input onChange={onChange} type="number" placeholder='Dejar en blaco para no eliminar' name="deleteDays" id="name" value={formData.deleteDays} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="name">Quitar librerias despues que vencio(dias)</label>
                        <input onChange={onChange} type="number" placeholder='Dejar en blaco para no quitar libs' name="removeLibsDays" id="name" value={formData.removeLibsDays} />
                    </div>
                </>}
            <div className="d-flex gap-2">
                <BtnPrimary title="Editar" />
                <BtnSecondary onClick={() => setOpenModal(false)} title="Cancelar" type="button" />
            </div>
        </form>
    )
}
