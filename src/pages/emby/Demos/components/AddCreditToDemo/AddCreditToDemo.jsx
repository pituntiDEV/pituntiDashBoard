import React, { useContext } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi';
import { useState } from 'react';
import SWAlert from '../../../../../components/SwAlert/SWAlert';
import { Context } from '../../DemosContext';

export const AddCreditToDemo = (props) => {
    const { demo, setOpenModal } = props;
    const { demos, setDemos } = useContext(Context);
    const [formData, setFormData] = useState({});
    const [addCredits, loading] = useFetchApi({
        url: `/api/emby/demos/credits/${demo._id}`,
        method: "PUT"
    })
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onChangeTV = (e) => {
        setFormData({ ...formData, tv: e.target.checked });
    }
    const submit = (e) => {
        e.preventDefault();
        addCredits({ body: JSON.stringify(formData) })
            .then(data => {
                const newDemosState = demos.filter(d => d._id != demo._id);
                setDemos(newDemosState)
                setOpenModal(false);
                SWAlert.alert({
                    title: "Agregado a usuarios"
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
                <label htmlFor="connections">Conexiones</label>
                <input min={1} required type="number" onChange={onChange} name="connections" id="connections" />
            </div>

            <div className="form__group">
                <label htmlFor="credits">Creditos</label>
                <input min={1} required type="number" onChange={onChange} name="credits" id="credits" />
            </div>

            <div className="form__group">

                <div className="">
                    <input onChange={onChangeTV} type="checkbox" name="tv" id="" /> TV?
                </div>
            </div>

            <div className="d-flex gap-3">
                <button className='btn btn-primary'>Agregar</button>
                <button onClick={() => setOpenModal(false)} type='button' className='btn btn-secondary'>Cancelar</button>
            </div>
        </form>
    )
}
