import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loading } from '../../components/Loading/Loading';
import useFetchApi from '../../hook/useFetchApi'

export const ProtectedPage = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [checkLogin] = useFetchApi({
        url: `/api/auth/myID`,
        method: 'GET',
    })

    useEffect(() => {

        checkLogin().then(data => {
            setUserId(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, [])
    if (!userId && !loading) {
        return <Navigate to='/login' />
    }
    return (
        <>
            {loading?<Loading/>:children}
        </>
    )
}
