import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BtnPrimary } from '../../components/Buttons/BtnSucess/BtnPrimary';
import SWAlert from '../../components/SwAlert/SWAlert';
import useFetch from '../../hook/useFetchApi';

import "./Login.scss";
export const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [fetch, loading] = useFetch({ url: "/api/auth/login" })

    const login = (e) => {
        e.preventDefault();
        fetch({
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(data => {
            if (!data.error) {
                const token = data.data?.token;
                const _id = data.data?._id;
                localStorage.setItem("access-token",token);
                localStorage.setItem("_id",_id);
                SWAlert.success({
                    title: 'Success',
                });
            }
            setTimeout(()=>{
                window.location = "/users"
            },1000)
        }).catch(err => {
            console.log(err);
            SWAlert.error({
                text: err.message.msg
            });
        })

    }

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="Login">
            <form onSubmit={login}>
                <h1> <i className="fa-solid fa-lock"></i> LOGIN</h1>
                <input onChange={onChange} name="email" type="text" placeholder="Email" />
                <input onChange={onChange} name="password" type="password" placeholder="Password" />
                <BtnPrimary title="Login"/>
                <label><Link to="/register">
                    Register
                </Link>
                </label>
             <p className='estado_de_mi_cuenta'>
               <a href="/my-account"> Estado de mi cuenta</a>
               
             </p>
             <p>
             <a href="/password/recovery/form">Olvide mi contraseña</a>
             </p>

             <div className="logo">
             <img src="/assets/img/logo250x250.png" className='logo'/>
             </div>
            </form>
        </div>
    )
}
