import React from 'react'
import "./Activations.scss";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';
import { useState } from 'react';
import { Spinner } from '../../../../components/Spinner/Spinner';
export const Activations = () => {
    const [email, setEmail] = useState("");
    const [adminMessage, setAdminMessage] = useState("");
    const [validUrl, setValidUrl] = useState(false);
    const { id } = useParams();
    const [validateUrl, loading] = useFetchApi({
        url: `/api/public/demos/validateURL/${id}`,
        method: "GET"
    })
    useEffect(() => {
        validateUrl()
            .then((data) => {
                setValidUrl(true);
                setAdminMessage(data.message)
            })
            .catch(() => setValidUrl(false))
    }, [])

    if (loading) return <Spinner />
    if (!loading && !validUrl) return (
        <h2>404 Not Found</h2>
    )


    const submit = (e) => {
        e.preventDefault();
    }

    if (!loading && validUrl) return (
        <>
            <h2>{adminMessage}</h2>
            <div className='public_demos_activation'>
                <form onSubmit={submit} className="activation_form">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} required type="email" placeholder='Email' name="email" id="" />
                    <button className='btn-add'>Agregar</button>

                </form>

            </div>

        </>
    )
}
