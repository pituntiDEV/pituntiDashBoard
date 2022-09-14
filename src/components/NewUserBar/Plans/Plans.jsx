import React from 'react'
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';
import { Owner } from './Owner';
import "./Plans.scss";
import { Reseller } from './Reseller';

export const Plans = (props) => {
    const { state,setStep} = props;
    
  
    return (
        <div className="plans">
            {state.server.owner ? <Owner {...props} /> : <Reseller {...props} />}
            <button type='submit' className='btn btn-primary' >Agregar</button>
            <button type='button' className='btn btn-secondary'onClick={()=>setStep(1)} >Regresar</button>
        </div>
    )
}
