import React from 'react'
import "./PasswordGenerator.scss";
import { usePlexPasswordGenerate } from '../../hook/usePlexPasswordGenerate';
export const PasswordGenerator = ({ formData, setFormData }) => {
    //Hooks
    const [generatePassword] = usePlexPasswordGenerate();

    //Functions
    const generarPassword = () => {
        setFormData({ ...formData, password: generatePassword() })
    }

    const onCHangeInputHandler = (e) => {
        setFormData({ ...formData, password: e.target.value })
    }
    return (
        <>
            <label htmlFor="password">Password:</label>
            <div className="PasswordGenerator">
                <input type="password" onChange={onCHangeInputHandler} minLength={10} value={formData.password} required name="password" id="password" />

                <button className='btn btn-danger' type='button' onClick={generarPassword}>Generar</button>

            </div >
            <small className='text-muted'>password:{formData.password}</small>
        </>
    )
}
