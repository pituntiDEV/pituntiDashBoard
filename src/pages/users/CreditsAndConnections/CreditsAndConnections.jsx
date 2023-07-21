import React, { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContext'
import { useEffect } from 'react';
import "./PlexCreditsAndConnections.scss";
export const CreditsAndConnections = ({ formData, setFormData }) => {
    const { plex } = useContext(appContext);
    const [connections, setConnections] = useState([]);
    const [credits, setCredits] = useState([]);
    const creditsByProvider = plex.plexCredits.filter(c => c.admin == formData.admin).sort((a, b) => a.conexion - b.conexion);
    useEffect(() => {
        const numConn = creditsByProvider.reduce((acc, c) => {
            if (!acc.includes(c.conexion)) {
                acc.push(c.conexion)
            }
            return acc
        }, [])

        setConnections(numConn)

    }, [formData.servers, formData.admin]);

    useEffect(() => {
        const creditsByConnections = creditsByProvider.filter(c => c.conexion == formData.connections);
        setCredits(creditsByConnections)
    }, [formData.connections, formData.admin])

    return (
        <div className='PlexCreditsAndConnections'>

            <div className="optionsCredits">

                <label htmlFor="">Conexiones:</label>
                <select required defaultValue={""} name="connections" onChange={(e) => setFormData({ ...formData, connections: e.target.value })}>
                    <option value="" disabled>--Seleccione una conexión--</option>
                    {
                        connections.map(c => <option key={c} value={c}>{c}</option>)
                    }

                </select>

            </div>

            <div className="optionsCredits">
                <label htmlFor="">Creditos:</label>
                <select required name="credits" defaultValue={""} onChange={(e) => setFormData({ ...formData, credits: e.target.value })}>
                    <option value="" disabled>--Seleccione creditos--</option>
                    {
                        credits.map((c, i) => <option key={c._id} value={i + 1}>{i + 1}</option>)
                    }
                </select>
            </div>

        </div>
    )
}
