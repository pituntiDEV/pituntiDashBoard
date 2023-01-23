import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSearchParams, Redirect } from 'react-router-dom'
import useFetchApi from '../../hook/useFetchApi';
import SWAlert from '../SwAlert/SWAlert';
import "./Password.scss"
export const PasswordRecovery = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [verifyToken, loading] = useFetchApi({
        url: `/api/auth/password/recovery/token/verify?token=${token}`,
        method: "GET"
    })

    const [password,setPassword] = useState("");
    const [changePasword,loadingToChangePassword] = useFetchApi({
       url:`/api/auth/password/change`
    })
    useEffect(() => {
        verifyToken()
            .then(data => {
                // console.log(data);
             })
            .catch(() => {
                window.location.href = "/login"
                return

            })
    }, [])

const submit=(e)=>{
    e.preventDefault();
    changePasword({body:JSON.stringify({
        token,
        password
    })})
    .then((data)=>{
        SWAlert.success({
            // preConfirm:()=>{
            //     window.location.href = "/login"
            // },
            title:data.message || "Password Cambio"
        })
    })
    .catch(()=>{
        SWAlert.error({
            title:"Algo salio mal"
        })
    })

}

    return (
        <form onSubmit={submit} className='form__password__recovery'>
            <div className="form__group">
                <label htmlFor="password">Password:</label>
                <input required minLength={5} onChange={(e)=>{
                  setPassword(e.target.value);
                }} type="password" name="password" placeholder='Ingresa la nueva contraseña' id="password" />
            </div>

            <button className="btn btn-primary">
                Cambiar contraseña
            </button>

            
        </form>
    )
}
