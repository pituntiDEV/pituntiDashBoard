import React from 'react'
import { useState } from 'react';
import useFetchApi from '../../../../hook/useFetchApi';
import { InputWithIcon } from '../../../icons/InputWithIcon/InputWithIcon';
import SWAlert from '../../../SwAlert/SWAlert';
import "./EditResellerForm.scss";
export const EditResellerForm = ({ reseller, setNewResellerState, setOpenModal }) => {
    const { reseller: admin, } = reseller;

    //State
    const [resellerToEdit, setResellerToEdit] = useState({ ...reseller });


    //Custom Hooks
    const [updateReseller, loading] = useFetchApi({
        url: `/api/resellers/update/${resellerToEdit._id}`,
        method: 'PUT',
    })

    //OnChanges

    const inputOnChange = (e) => {
        setResellerToEdit({ ...resellerToEdit, [e.target.name]: e.target.value });
    }

    const onChangeCheckbox = (e) => {
        setResellerToEdit({ ...resellerToEdit, [e.target.name]: e.target.checked });
    }

    //Submit
    const submit = (e) => {
        e.preventDefault();
        updateReseller({ body: JSON.stringify(resellerToEdit) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Reseller updated"
                })
                setOpenModal(false);
                setNewResellerState(s => !s);
            })
            .catch((error) => {
                SWAlert.error({
                    title: error.message || "Algo salio mal"
                })
            })


    }
    return (
        <form onSubmit={submit} className='edit__reseller__form'>
            <div className="edit__reseller__form__container">
                <div className='form-group'>
                    <label htmlFor="">
                        <input type="checkbox" onChange={onChangeCheckbox} checked={resellerToEdit.removeUsersLibs
                        } name="removeUsersLibs" id="" />
                        Quitar libs Usuarios [Dias]?
                    </label>
                    <InputWithIcon>
                        <i className="fa-solid fa-user-lock"></i>
                        <input onChange={inputOnChange} type="number" value={resellerToEdit.removeUsersLibsDays
                        } name="removeUsersLibsDays" min="0" />
                    </InputWithIcon>
                </div>

                {/* Eliminar Usauarios */}
                <div className="form-group">
                    <input onChange={onChangeCheckbox} checked={resellerToEdit.deleteUsers} type="checkbox" name="deleteUsers" />
                    &nbsp;
                    <label htmlFor="" className=""> Eliminar usuarios [Dias]?</label>
                    <InputWithIcon>
                        <i className="fa-solid fa-user-xmark"></i>
                        <input onChange={inputOnChange} type="number" value={resellerToEdit.deleteUsersDays} placeholder='Dias a eliminar' name="deleteUsersDays" min="0" />
                    </InputWithIcon>
                </div>
                {/* Permitir Demos */}
                <div className="form-group">
                    <div>Demos:</div>
                    <InputWithIcon>
                        <i className="fa-solid fa-film"></i>
                        <select name="demos" defaultValue={resellerToEdit.demos} onChange={inputOnChange}>
                            <option value="" disabled>Permitir?</option>
                            <option value="true">Si</option>
                            <option value="false">NO</option>
                        </select>
                    </InputWithIcon>

                </div>
                <div className="form-group">


                    <div htmlFor="">Duracion por Demo:</div>
                    <div className="demos__time">

                        <i className="fa-regular fa-clock"></i>
                        <input onChange={inputOnChange} type="number" value={resellerToEdit.demosTime} placeholder='Dias a eliminar' name="demosTime" min="1" required />
                        <select
                            defaultValue={resellerToEdit.demosTimeFormat}
                            name="demosTimeFormat"
                            onChange={inputOnChange}
                            id="">
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <input
                        onChange={onChangeCheckbox}
                        checked={resellerToEdit.demosLimit && "checked"}
                        type="checkbox"
                        name="demosLimit" id=""
                    />&nbsp;
                    <label
                        htmlFor=""
                        className="">
                        Limitar demos por dia?
                    </label>


                    <InputWithIcon>
                        <i className="fa-solid fa-list-ol"></i>
                        <input
                            onChange={inputOnChange}
                            type="number"
                            value={resellerToEdit.demosForDay}
                            placeholder='Demos por dia' name="demosForDay" id="" />
                    </InputWithIcon>

                </div>
                <InputWithIcon>
                    <label htmlFor="minCreditsToShare">#</label>

                    <input type="number" onChange={inputOnChange} name="minCreditsToShare" value={resellerToEdit.minCreditsToShare} min={0} placeholder='Min creditos a compartir' id="minCreditsToShare" />


                </InputWithIcon>
            </div>

            <div className="buttons_edit">
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-secondary">Cancelar</button>
            </div>
        </form>
    )
}
