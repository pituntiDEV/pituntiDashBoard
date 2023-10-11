import React, { useState } from 'react'
import useFetchApi from '../../../../../../../hook/useFetchApi';
import SWAlert from '../../../../../../../components/SwAlert/SWAlert';

export const EditReselerForm = ({ reseller, resellers, setResellers, setOpenModal }) => {

    //Custom hooks
    const [updateReseller, loading] = useFetchApi({
        url: `/api/jellyfin/resellers/${reseller._id}`,
        method: "PUT"
    })
    const [formData, setFormData] = useState({ ...reseller });
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onChangeConfig = (e) => {
        const config = { ...formData.config };
        config[e.target.name] = e.target.value;
        setFormData({ ...formData, config });
    }

    const submit = (e) => {
        e.preventDefault();
        updateReseller({ body: JSON.stringify(formData) }).then(data => {
            const resellersUpdated = [...resellers];
            const resellerPos = resellersUpdated.findIndex(r => r._id == reseller._id);
            resellersUpdated[resellerPos] = data;
            setResellers(resellersUpdated);
            setOpenModal(false);
            SWAlert.alert({
                title: "Reseller Updated"
            })
        })
    }
    return (
        <form onSubmit={submit} action="">
            <div className="form__group">
                <label htmlFor="disconnect">Desactivar usuarios despues de vencidos(dias):</label>
                <input onChange={onChange} type="number" name="disconnect" value={formData.disconnect} id="" />
            </div>

            <div className="form__group">
                <label htmlFor="delete">Eliminar usuarios despues de vencidos(dias):</label>
                <input onChange={onChange} type="number" name="delete" value={formData.delete} id="" />
            </div>



            <div className="form__group">
                <label htmlFor="demos">Demos:</label>
                <input onChange={onChange} min={0} type="number" name="demos" value={formData.demos} id="" />
            </div>

            <div className="form__group">
                <label htmlFor="demos">Demos Duracion (Horas):</label>
                <input disabled={formData.demos < 1} required={formData.demos > 0} min={1} onChange={onChange} type="number" name="demosTime" value={formData.demosTime} id="" />
            </div>

            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Editar</button>
                <button type="button" onClick={() => setOpenModal(false)} className='btn btn-secondary'>Cancelar</button>
            </div>
        </form>
    )
}
