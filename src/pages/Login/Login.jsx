import React, { useState } from 'react'
import { Link } from 'react-router-dom';
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
                <h1>Login</h1>
                <input onChange={onChange} name="email" type="text" placeholder="Email" />
                <input onChange={onChange} name="password" type="password" placeholder="Password" />
                <button type="submit">Login</button>
                <label><Link to="/register">
                    Register
                </Link>
                </label>

            </form>
        </div>
    )
}
