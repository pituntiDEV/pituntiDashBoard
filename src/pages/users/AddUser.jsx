import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../../components/modal/Modal'
import { appContext } from '../../context/AppContext'
import { DatosCuenta } from './DatosCuenta';
import { DatosPersonales } from './DatosPersonales';
import { SelectRole } from './SelectRole';

export const AddUser = () => {
  const [data,setData]=useState({
    name:'',
    email:''
  });
  const {openModal,setOpenModal} = React.useContext(appContext);
  const [step, setStep] = React.useState(1);

  const datatosend={
    data,
    setData,
    setOpenModal,
    setStep
  }

  const reset=()=>{
    setStep(1);
    setData({});
    setOpenModal(false)
  }
  const steps={
    1:{
      title:'Datos Personales',
      component:<DatosPersonales {...datatosend}/>
    },
    2:{
      title:"ROle",
      component:<SelectRole {...datatosend}/>
    },
    3:{
      title:'Datos de la cuenta',
      component:<DatosCuenta  {...datatosend}/>
    },
 

  }



  return (
   <>
    <section>
      <div>
       <button onClick={()=>setOpenModal(true)}>Agregar nuevo usuario</button>
        <hr />
      </div>
    {openModal &&  
      <Modal reset={reset} title='Add User' >
        {
          steps[step].component
        }
      </Modal>}
    </section>
   </>
  )
}
