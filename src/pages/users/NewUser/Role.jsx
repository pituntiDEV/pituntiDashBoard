import React from 'react'
import { useContext } from 'react'
import NewUserContext from '../../../context/NewUserContextProvider';
import { Buttons } from './Buttons'

export const Role = () => {
    const {state,setRole}=useContext(NewUserContext);
    return (
       

            <div className="Roles">
                <h3>Activar como:</h3>
                <div className="role-container">
                    <div
                        className={`role ${state.role == "admin" && "active"}`}
                        onClick={() => {
                            setRole("admin")
                        }}
                    >
                        <span>Admin </span>
                    </div>

                    <div
                        className={`role ${state.role == "reseller" && "active"}`}
                        onClick={() => {
                            setRole("reseller")
                        }}
                    >
                        <span>Reseller</span>
                    </div>

                </div>
                <Buttons />
            </div>
           
    )
}
