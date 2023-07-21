import React from 'react'
import { useState } from 'react'
import useFetchApi from '../../../../../../hook/useFetchApi';

export const EditForm = ({ user }) => {
    const [formData, setFormData] = useState({ ...user });

    const [updateUser, loading] = useFetchApi({
        url: `/api/plex/user/info/${user._id}`,
        method: "PUT"
    })
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const submit = (e) => {
        e.preventDefault();
        updateUser({ body: JSON.stringify(formData) })
            .then(data => {
                console.log(data);
            })

    }
    return (
        <form onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="name">Name:</label>
                <input type="text" onChange={onChange} name="name" value={formData.name} />
            </div>

            <div className="form__group">
                <label htmlFor="whatsapp">Whatsapp:</label>
                <input type="text" onChange={onChange} name="whatsapp" value={formData.whatsapp} />
            </div>

            <div className="form__group">
                <label htmlFor="comments">Comentarios:</label>
                <input type="text" onChange={onChange} name="comments" value={formData.comments} />
            </div>

            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Enviar</button>
            </div>

        </form>
    )
}
