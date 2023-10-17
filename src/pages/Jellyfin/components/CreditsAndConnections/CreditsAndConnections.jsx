import React, { useContext } from 'react'
import { appContext } from '../../../../context/AppContext'
import { useState } from 'react';
import { useEffect } from 'react';

export const CreditsAndConnections = ({ formData, setFormData }) => {
    const { jellyfin } = useContext(appContext);
    const [creditsFiltered, setCreditsFiltered] = useState([])
    useEffect(() => {
        const filtered = jellyfin.jellyfinCredits.filter(credit => credit.admin == formData.adminID);
        setCreditsFiltered(filtered)


    }, [formData.adminID, formData.connections])


    const allconnections = creditsFiltered.reduce((acc, credit) => {
        if (!acc.includes(credit.connections)) {
            acc.push(credit.connections);
        }
        return acc;
    }, []).sort((a, b) => a - b);


    const [creditsByConnections, setCreditsByConnections] = useState([]);

    useEffect(() => {
        const allCredits = jellyfin.jellyfinCredits.filter(credit => credit.connections == formData.connections && String(credit.admin) == formData.adminID);
        setCreditsByConnections(allCredits);
    }, [formData.connections, formData.adminID])



    return (
        <div className='form__data'>



            {formData.admin ?
                (<>
                    <div className="form__group">
                        <label htmlFor="creditos">Creditos:</label>
                        <input type="number" min="1" required name="credits" onChange={(e) => {
                            setFormData({ ...formData, credits: e.target.value });
                        }} />
                    </div>

                    <div className="form__group">
                        <label htmlFor="connetions">Conexiones:</label>
                        <input type="number" min="1" required name="connections" onChange={(e) => {
                            setFormData({ ...formData, connections: e.target.value });
                        }} />
                    </div>
                </>)
                :
                <>
                    <div className="form__group">
                        <label htmlFor="connections">Conexiones:</label>
                        <select value={formData.connections} onChange={(e) => {
                            setFormData({ ...formData, connections: e.target.value });
                        }} name="connections" required>
                            <option value="" disabled> -- Seleccione -- </option>
                            {
                                allconnections.map(connection => {
                                    return <option key={connection} value={connection}>{connection}</option>

                                })
                            }
                        </select>
                    </div>


                    <div className="form__group">
                        <label htmlFor="credits">Creditos:</label>
                        <select value={formData.credits} required onChange={(e) => {
                            setFormData({ ...formData, credits: e.target.value });
                        }} name="credits">
                            <option value="" disabled> -- Seleccione -- </option>
                            {
                                creditsByConnections.map((credit, i) => {
                                    return <option key={i} value={i + 1}>{i + 1}</option>

                                })
                            }
                        </select>
                    </div>

                </>
            }
        </div>
    )
}
