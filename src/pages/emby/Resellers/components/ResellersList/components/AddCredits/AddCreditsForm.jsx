import React, { useContext, useState } from 'react'
import useFetchApi from '../../../../../../../hook/useFetchApi';
import SWAlert from '../../../../../../../components/SwAlert/SWAlert';
import { Context } from '../../../../ResellersContext';

export const AddCreditsForm = (props) => {
    const { reseller, setOpenModal } = props;
    const { resellers, setResellers } = useContext(Context);
    const [formData, setFormData] = useState({
        reseller: reseller._id,
        credits: 0,
        connections: 0,
        tv: false,
        admin: reseller.admin
    })

    //Custom Hooks
    const [AddCredits, loading] = useFetchApi({
        url: `/api/emby/resellers/${reseller._id}`,
        method: "POST"
    })

    //Functions
    const onChangeInputs = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onChangeCheckBox = (e) => setFormData({ ...formData, tv: e.target.checked })

    const submit = (e) => {
        e.preventDefault();
        AddCredits({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Credito Agregado"
                });
                const resellersUpdated = [...resellers];
                const resellerindex = resellersUpdated.findIndex(r => r._id == reseller._id);
                resellersUpdated[resellerindex].credits = data;
                setResellers(resellersUpdated);
                setOpenModal(false);


            }).catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })

    }
    return (
        <form onSubmit={submit}>

            <div className="form__group">
                <label htmlFor="credit">Creditos:</label>
                <input onChange={onChangeInputs} type="number" name="credits" required min={1} />
            </div>
            <div className="form__group">
                <label htmlFor="credit">Conexiones:</label>
                <input onChange={onChangeInputs} type="number" name="connections" required min={1} />
            </div>

            <div className="form__group">
                <hr />
                <label htmlFor="credit">  <input type="checkbox" name="tv" onChange={onChangeCheckBox} />Accesso a TV:</label>

            </div>

            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Agregar</button>
                <button className='btn btn-secondary'>Cancelar</button>
            </div>

        </form>
    )
}
