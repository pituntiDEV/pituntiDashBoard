import React, { useEffect } from 'react'
import { useState } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';

export const ResellerRole = ({ data = [], setState, state } = {}) => {
    const [credits, setCredits] = useState([]);
    const [conexiones, setConeciones] = useState([]);
    const [numCredits, setNumCredits] = useState(state.maxCredits);

    const [req, loading] = useFetchApi({
        url: `/api/credits/shared-available/?provider=${state?.provider?.admin?._id}`,
        method: 'GET',
    })
    useEffect(() => {

        if (state.provider) {
            req().then(data => {
                const creditsData = {};
                data.data.map(credito => {
                    creditsData[credito.conexion] = creditsData[credito.conexion] + 1 || 1;
                });

                const creditos = data.data.map(credito => {
                    return credito.conexion
                })
                setConeciones([... new Set(creditos)]);
                setCredits(data.data)
            })

        }


    }, [state.provider])

    useEffect(() => {
        const creditos = credits.filter(c => c.conexion == state.conexion);
        setState({...state,maxCredits:creditos.length})
        setNumCredits(creditos.length);
    }, [state.conexion,credits])

    //Functionns
    const handleOnChange = (e) => {
        const idProvider = e.target.value;
        const providerSelected = data.find(provider => provider.admin._id == idProvider)
        setState({ ...state, package: "", conexion: "", creditos: 0, provider: providerSelected });

    }



    return (<div className="ResellerRole">
        <div className="select-container">
            <select defaultValue={state.provider} onChange={handleOnChange}>
                <option value="" disabled >Seleccione proveedor</option>
                {data && data.map(reseller => {
                    return (
                        <option key={reseller.admin._id} value={reseller.admin._id}>
                            {reseller?.admin?.email}
                        </option>
                        
                    )
                })}
            </select>
        </div>

        <div className="package-container">

            {state.provider && <h3>Selecciona Paquete</h3>}
            <div className="packages">

                {
                    state.provider && state.provider.packages.map(pack => {
                        return (
                            <div className={`package ${state.package._id == pack._id && "selected"}`} onClick={() => {
                                setState({ ...state, package: pack})
                            }} key={pack._id}>
                                {pack.name}
                            </div>
                        )
                    })
                }
            </div>



            <div className={`facturar ${state.package && conexiones.length > 0 && "show"}`}>

                <div className='conexiones box'>Coneciones:
                    <select className='input' value={state.conexion} onChange={(e) => {
                        setState({ ...state, conexion: e.target.value })
                    }}>
                        <option value="" disabled>Conn {state.conexion}</option>
                        {conexiones.sort(function (a, b) { return a - b }).map(conexion => {
                            return (<option key={conexion} value={conexion}>
                                {conexion}
                            </option>)
                        })}
                    </select>
                </div>
                <div className='creditos box'>
                    <label htmlFor="">Creditos</label>
                    <input className='input' onChange={(e) => {
                        setState({ ...state, creditos: e.target.value })
                    }} type="number" value={state.creditos} id="" min={1} max={numCredits} />
                    {state.conexion && `Max: ${numCredits}`}
                </div>

            </div>
            {
                conexiones.length < 1 && state.provider &&
                <p className="bg-danger mx-5 my-5 text-center  text-white p-2 m-2">
                    No tienes creditos
                </p>
            }

        </div>
    </div>)
}