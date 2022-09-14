import React from 'react'
import { InputWithIcon } from '../../../icons/InputWithIcon/InputWithIcon';
import "./ResellerConfig.scss";
export const ResellerConfig = ({ state, setState }) => {
    const changeInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const changeCheckbox = (e) => {
        setState({ ...state, [e.target.name]: e.target.checked })

    }
    return (
        <div className="reseller__config">

            <div className="form-group">
                <input onChange={changeCheckbox} checked={state.removeUsersLibs && "checked"} type="checkbox" name="removeUsersLibs" id="" />
                &nbsp;
                <label htmlFor="" className=""> Quitar libs Usuarios [Dias]?</label>
                {state.removeUsersLibs && <InputWithIcon>
                    <i className="fa-solid fa-user-lock"></i>
                    <input onChange={changeInput} type="number" value={state.removeUsersLibsDays} placeholder='Dias a quitar libs' name="removeUsersLibsDays" id="" />
                </InputWithIcon>}
            </div>

            <div className="form-group">
                <input onChange={changeCheckbox} checked={state.deleteUsers && "checked"} type="checkbox" name="deleteUsers" id="" />
                &nbsp;
                <label htmlFor="" className=""> Eliminar usuarios [Dias]?</label>
                {state.deleteUsers && <InputWithIcon>
                    <i className="fa-solid fa-user-xmark"></i>
                    <input onChange={changeInput} type="number" value={state.deleteUsersDays} placeholder='Dias a eliminar' name="deleteUsersDays" id="" />
                </InputWithIcon>}
            </div>

            <div className="form-group">
                
                <input onChange={changeCheckbox} checked={state.demos && "checked"} type="checkbox" name="demos" id="" />
                &nbsp;
                <label htmlFor="" className="">Permitir Demos?</label>
                {state.demos &&<div> Duracion:</div>}
                {state.demos &&
                    <InputWithIcon>
                        <i className="fa-solid fa-diagram-predecessor"></i>
                        <input min={1} onChange={changeInput} type="number" value={state.demosTime} placeholder='Dias a eliminar' name="demosTime" id="" />
                    </InputWithIcon>}
                {state.demos &&
                <>
                   
                    <InputWithIcon>
                        <i className="fa-regular fa-clock"></i>
                        <select
                            defaultValue={state.demosTimeFormat}
                            name="demosTimeFormat"
                            onChange={changeInput}
                            id="">
                            <option
                                value="minutes">
                                {state.demosTime >1 ? "Minutos":"Minuto"}
                            </option>
                            <option 
                                value="hours">
                                    {state.demosTime >1 ? "Horas":"Hora"}
                            </option>
                            <option 
                                value="days">
                                    {state.demosTime >1 ? "Dias":"Dia"}
                            </option>

                        </select>
                    </InputWithIcon>
                    </>}
            </div>

            {state.demos &&
                <div className="form-group">
                    <input
                        onChange={changeCheckbox}
                        checked={state.demosLimit && "checked"}
                        type="checkbox"
                        name="demosLimit" id=""
                    />&nbsp;
                    <label
                        htmlFor=""
                        className="">
                        Limitar demos por dia?
                    </label>

                    {state.demos &&
                        <InputWithIcon>
                            <i className="fa-solid fa-list-ol"></i>
                            <input
                                onChange={changeInput}
                                type="number"
                                value={state.demosForDay}
                                placeholder='Demos por dia' name="demosForDay" id="" />
                        </InputWithIcon>}
                </div>}

        </div>
    )
}
