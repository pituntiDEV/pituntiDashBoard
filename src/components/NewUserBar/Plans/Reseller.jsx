import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useFetchApi from '../../../hook/useFetchApi'
import { CoinsIcon } from '../../icons/CoinsIcon'
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon'

export const Reseller = ({ state, setState }) => {
    //State
    const [credits, setCredits] = useState([]);
    const [connections, setConnections] = useState([]);
    const [availableCredits, setAvailableCredits] = useState([]);
    //Custom Hooks
    const [getCredits, loading] = useFetchApi({
        url: `/api/credits/shared-available-by-provider/?provider=${state.server.ownerID}`,
        method: "GET",
    })



    //Effects
    useEffect(() => {
        getCredits()
            .then(( data ) => {
                setCredits(data);
                
                const conn = data.reduce((acc, credits) => {
                    if (!acc.includes(credits.conexion)) {
                        if(credits.new){
                            acc.push(credits.conexion);
                        }
                    }

                    return acc.sort();
                }, [])

                setConnections(conn)
            })
    }, [])


    //Functions
    const onChangeInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const connectionsChange = (e) => {
        const value = e.target.value;
        const filter = credits.filter(c => c.conexion == value);
        setAvailableCredits(filter);
        setState({...state,connections:value})

    }

    //Get credist
    return (
        <div className="reseller">
            <div className='form-group'>
                
                <label htmlFor="email">Connections:</label>
                <InputWithIcon>
                    <i className="fa-solid fa-satellite-dish"></i>
                    <select name="connections" onChange={connectionsChange} defaultValue={""} required>
                        <option disabled value="">Connections</option>
                        {
                            connections.map((conn) =>{
                                return (
                                    <option key={conn} value={conn}>{conn}</option>
                                )
                            })
                        }
                    </select>
                </InputWithIcon>
            </div>
            <div className='form-group'>
                <label htmlFor="email">Credits:</label>
                <InputWithIcon>
                    <CoinsIcon />
                    <select name="credits" onChange={onChangeInput} defaultValue={""} required id="">
                        <option value="" disabled>Creditos</option>
                        {availableCredits.map((c, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                    </select>
                </InputWithIcon>
            </div>
        </div>
    )
}
