import React from 'react'
import { useContext,useState,useEffect } from 'react';
import NewUserContext from '../../../../context/NewUserContextProvider';
import useFetchApi from '../../../../hook/useFetchApi';
import { Buttons } from '../Buttons';
import { AdminRole } from './AdminRole';
import { ResellerRole } from './ResellerRole';

export const SelectPackage = () => {
    const {state,setState}=useContext(NewUserContext);
    const url = state.role == "admin" ? "/api/package/plex/get/all" : "/api/package/shared-with-me";
    const [shared, setShared] = useState([]);
    const [getPackages, loading] = useFetchApi({
        url,
        method: 'GET',
    })

    useEffect(() => {
        getPackages().then(data => {
            setShared(data);
        })
    }, [state.role])

    return (
        <div>

            {state.role == "admin" ? <AdminRole /> : loading ? "" : <ResellerRole state={state} setState={setState} data={shared.data} />}
            <Buttons  />
        </div>
    )
}
