import React, { useState } from 'react'
import { BtnPrimary } from '../../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../Buttons/BtnSucess/BtnSecondary'
import useFetchApi from '../../../../hook/useFetchApi'
import SWAlert from '../../../SwAlert/SWAlert'


export const AddCoins = ({ user, setOpenModal }) => {
    const [formData, setFormData] = useState({
        credits: 1,
        conexion: 1,
    })


    const [add, loading] = useFetchApi({
        url: `/api/resellers/add/credits/byReseller/${user._id}`
    })

    //OnChange
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const submit = (e) => {
        e.preventDefault();
        add({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message
                })
                setOpenModal(false)
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message,
                })
            })

    }
    return (
        <form onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="credits">Creditos:</label>
                <input onBlur={onChange} required min={1} placeholder='min 1' type="number" name="credits" id="credits" />
            </div>

            <div className="form__group">
                <label htmlFor="conexiones">Conexiones:</label>
                <input onChange={onChange} required min={1} placeholder='min 1' type="number" name="conexion" id="conexiones" />
            </div>

            <div className="d-flex gap-3">
                <BtnPrimary title="Agregar" />
                <BtnSecondary onClick={() => setOpenModal(false)} type="button" title={"Cancelar"} />
            </div>
        </form>
    )
}
