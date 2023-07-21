import React, { useContext } from 'react'
import { appContext } from '../../../../context/AppContext'
import { useState } from 'react';
import { useEffect } from 'react';

export const CreditsAndConnections = ({ formData, setFormData }) => {
    const { emby } = useContext(appContext);


    const creditsFiltered = emby.embyCredits.filter(credit => credit.admin == formData.adminID);

    const allconnections = creditsFiltered.reduce((acc, credit) => {
        if (!acc.includes(credit.connections)) {
            acc.push(credit.connections);
        }
        return acc;
    }, []).sort((a, b) => a - b);


    const [creditsByConnections, setCreditsByConnections] = useState([]);

    useEffect(() => {
        const allCredits = emby.embyCredits.filter(credit => credit.connections == formData.connections);
        setCreditsByConnections(allCredits);
    }, [formData.connections])



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
                        <select onChange={(e) => {
                            setFormData({ ...formData, connections: e.target.value });
                        }} defaultValue={""} name="connections" required>
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
                        <select required onChange={(e) => {
                            setFormData({ ...formData, credits: e.target.value });
                        }} defaultValue={""} name="credits">
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
