import React from 'react'
import "./Activations.scss";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';
import { useState } from 'react';
import { Spinner } from '../../../../components/Spinner/Spinner';
import SWAlert from '../../../../components/SwAlert/SWAlert';
export const Activations = () => {
    const [email, setEmail] = useState("");
    const [ip, setIp] = useState('');
    const [adminMessage, setAdminMessage] = useState("");
    const [validUrl, setValidUrl] = useState(false);
    const { id } = useParams();
    const [validateUrl, loading] = useFetchApi({
        url: `/api/public/demos/validateURL/${id}`,
        method: "GET"
    })

    const [addDemo, loadingAddDemo] = useFetchApi({
        url: `/api/public/demos/activate/${id}`,
        method: "POST"
    })



    useEffect(() => {
        // Get the IP address from the server
        fetch('https://api.ipify.org')
            .then((response) => response.text())
            .then((data) => setIp(data));
    }, []);

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
        addDemo({ body: JSON.stringify({ email, ip }) })
            .then(data => {
                SWAlert.success({
                    title: "Demo enviado",
                    text: "Ve a https://app.plex.tv/desktop/#!/settings/manage-library-access y acepta la invitación."
                })
            })
            .catch(error => {
                SWAlert.error({
                    title: error.message
                })
            })
    }

    if (!loading && validUrl) return (
        <>
            {/* {ip} */}
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
