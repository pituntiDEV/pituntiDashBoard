import React from 'react'
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';
import { Owner } from './Owner';
import "./Plans.scss";
import { Reseller } from './Reseller';
import { Spinner } from '../../Spinner/Spinner';

export const Plans = (props) => {
    const { state, setStep, loading } = props;
    const _id = localStorage.getItem("_id");


    const isNotAdmin = state.servers.filter(s => s.admin._id != _id);
    const isAdmin = isNotAdmin.length == 0 ? true : false


    // console.log(isNotAdmin);


    return (
        <div className="plans">
            {!isAdmin ? <Reseller {...props} /> : <Owner {...props} />}
            {!loading ?
                <div className="d-flex gap-3">
                    <button type='submit' className='btn btn-primary' >Agregar</button>
                    <button type='button' className='btn btn-secondary' onClick={() => setStep(1)} >Regresar</button>
                </div>
                :
                <Spinner />
            }
        </div>
    )
}
