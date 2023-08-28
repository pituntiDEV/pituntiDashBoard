import React, { useState } from 'react'
import { BtnPrimary } from '../../../components/Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../../components/Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../hook/useFetchApi';

export const EditServer = ({ server, setOpenModal }) => {
    const [formData, setFormData] = useState({
        limit: server.limit ? server.limit : null,
        noTranscodeQuality: [...server.noTranscodeQuality] || []
    })


    const [editServer, loading] = useFetchApi({
        url: `/api/server/${server._id}`,
        method: "PUT"
    })

    const onChangeCheckbox = (e) => {
        const title = e.target.name;
        const index = formData.noTranscodeQuality.findIndex(t => t == title);


        if (e.target.checked && !!index) {
            const updated = [...formData.noTranscodeQuality, title]
            setFormData({ ...formData, noTranscodeQuality: updated });
        } else {
            const updated = formData.noTranscodeQuality.filter(t => t != title);
            setFormData({ ...formData, noTranscodeQuality: updated });
        }
    }
    const submit = (e) => {
        e.preventDefault();

        editServer({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: "Editado Correctamente",
                })
                server.limit = formData.limit;
                setOpenModal(false)

            })
            .catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal",
                })
            })
    }
    return (
        <form onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" readOnly id="name" value={server.data.name} />
            </div>
            <div className="form__group">
                <label htmlFor="limit">Limite de usuarios:</label>
                <input type="number" min="0" onChange={(e) => {
                    setFormData({ ...formData, limit: e.target.value });
                }} name="limit" id="limit" value={formData.limit} />
            </div>
            <div className="form__group">
                <div className="">

                    <input type="checkbox" name="4K" checked={formData.noTranscodeQuality.includes("4K")} onChange={onChangeCheckbox} />
                    <label htmlFor="limit">Negar Transcoding 4K (WEBHOOKS):</label>
                </div>
                <div className="">

                    <input type="checkbox" name="1080" checked={formData.noTranscodeQuality.includes("1080")} onChange={onChangeCheckbox} />
                    <label htmlFor="limit">Negar Transcoding 1080p (WEBHOOKS):</label>
                </div>
            </div>
            <div className="d-flex gap-3">
                <BtnPrimary title="Editar" />
                <BtnSecondary type="button" onClick={() => setOpenModal(false)} title="Cancelar" />
            </div>

        </form>
    )
}
