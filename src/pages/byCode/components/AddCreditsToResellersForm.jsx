import React, { useState } from 'react'
import SWAlert from '../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../hook/useFetchApi'

export const AddCreditsToResellersForm = ({ user, setOpenModal,setResellersState }) => {
    const [formData, setFormData] = useState({
        credits: 0
    });

    const [addCredits, loading] = useFetchApi({
        url: `/api/byCode/resellers/${user._id}/credits`
    })

    const submit = (e) => {
        e.preventDefault();
        addCredits({body:JSON.stringify(formData)})
            .then(data=>{
                SWAlert.alert({
                    title: "Creditos agregados"
                })
                setOpenModal(false)
                setResellersState(s=>!s);
            })
            .catch(err=>{
                SWAlert.error({
                    title:"Algo salio mal"
                })
            })
    }
    return (
        <form onSubmit={submit}>
            <div className="form__group">
                <label htmlFor="credits" className='fw-bold'>Credits:</label>
                <input type="number" onChange={(e)=>{
                    setFormData({credits:e.target.value});
                }} min={1} required name="credits" placeholder='ingresa los creditos' id="credits" />
            </div>
            <div className='btn_group my-4 d-flex gap-3'>
                <button className='btn btn-primary'>Agregar</button>
                <button onClick={() => setOpenModal(false)} className='btn btn-secondary'>Cancelar</button>
            </div>
        </form>
    )
}
