import React, { useContext } from 'react'
import "./EmailGenerator.scss";
import { appContext } from '../../context/AppContext';
import { useRandomText } from '../../hook/useRandomText';
import { useEffect } from 'react';
export const EmailGenerator = ({ setFormData, formData }) => {
    const { state } = useContext(appContext);
    const myData = state.account_data;
    const dominio = myData.email.split('@')[0]
    const terminationEmail = myData.email.split('@')[1].split(".")[1];
    const [getRandomText, randomText] = useRandomText(15)
    const generarEmail = () => {
        getRandomText(8);
        setFormData({ ...formData, email: randomText + "@" + dominio + "." + terminationEmail })

    }

    //Effects
    useEffect(() => getRandomText(8), [])

    const onCHangeInputHandler = (e) => {
        setFormData({ ...formData, email: e.target.value })

    }
    return (
        <>
            <label htmlFor="email">Email:</label>
            <div className="EmailGenerator">
                <input type="email" value={formData.email} onChange={onCHangeInputHandler} required name="email" id="email" />
                <button className='btn btn-danger' type='button' onClick={generarEmail}>Generar</button>

            </div>
        </>
    )
}
