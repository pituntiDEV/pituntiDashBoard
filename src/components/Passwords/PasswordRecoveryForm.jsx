import React from 'react'
import { useState } from 'react';
import useFetchApi from '../../hook/useFetchApi';
import SWAlert from '../SwAlert/SWAlert';

export const PasswordRecoveryForm = () => {
  const [email,setEmail] = useState("");
  const [submiting,setSubmiting] = useState(false);
  const [sendEmail,loading] =useFetchApi({
    url:`/api/auth/password/recovery`
  })
  const submit=(e)=>{
    e.preventDefault();
    sendEmail({body:JSON.stringify({email})})
    .then(data=>{
         SWAlert.success({
          title:data.message || "Revisa tu correo...",
         })
         setSubmiting(true)
    })
    .catch((error)=>{

    })
    
  }
  return (
    <>
      {!submiting &&  <form onSubmit={submit} className='form__password__recovery'>
          <div className="form__group ">
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder='Ingresa el email' />
          </div>
          {!loading && <button className='btn btn-primary'>
            Recuperar
          </button>}
        </form>}
      {submiting && 
      <>
        <a href="/login">Login</a>
        <p>Revisa tu correo</p>
      </>}
    </>
    
  )
}
