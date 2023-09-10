import React from 'react'
import { useState } from 'react'
import "./ActivateCodeForm.scss"
import useFetchApi from '../../../../hook/useFetchApi'
import SWAlert from '../../../../components/SwAlert/SWAlert'
export const ActivateCodeForm = ({ user, setOpenModal }) => {
    const [formData, setFormData] = useState({
        code: "",
        user: user._id
    })
    const [activate, loading] = useFetchApi({
        url: `/api/plex/v2/users/code/activate`,
        method: "POST"
    })
    const submit = (e) => {
        e.preventDefault();
        activate({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message
                })
                setOpenModal(false)
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message
                })
            })

    }
    return (
        <form onSubmit={submit} className='ActivateCodeForm'>
            <input required onChange={(e) => setFormData({ ...formData, code: e.target.value })} minLength={4} maxLength={4} type="text" name="" id="" />
            <div className="">
                <button className='btn btn-primary'>Activar</button>
            </div>
        </form>
    )
}
