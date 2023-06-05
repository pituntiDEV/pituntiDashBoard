import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react'
import useFetchApi from '../../../../../hook/useFetchApi'
import { CoinsIcon } from '../../../../icons/CoinsIcon';
import { HouseWifiIcon } from '../../../../icons/HouseWifiIcon';
import { InfoIcon } from '../../../../icons/InfoIcon';
import { CoinPlusIcon } from '../../../../icons/InputWithIcon/CoinPlusIcon';
import { InputWithIcon } from '../../../../icons/InputWithIcon/InputWithIcon';
import SWAlert from '../../../../SwAlert/SWAlert';
import "./CreditsEdit.scss"
export const CreditsEdit = ({ reseller, setOpenModal, setResellersState }) => {
    //State
    const [credits, setCredits] = useState([]);
    const [getCredits, loadingCredits] = useFetchApi({
        url: `/api/resellers/credits/${reseller._id}`,
        method: 'GET',
    })

    const [addCredits, loadingAddCredits] = useFetchApi({
        url: `/api/resellers/add/credits/${reseller._id}`,
    })
    const [formData, setFormData] = useState({
        credits: "",
        conexion: "",
        description: ""
    });

    //Effects
    useEffect(() => {
        getCredits().then(data => {
            setCredits(data);
        });
    }, [])

    //Functions
    const inputOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();
        addCredits({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: data.message || "Creditos agregados"
                })
                setOpenModal(false);
                setResellersState(s => !s);
            }).catch(error => {
                SWAlert.error({
                    title: error.message || "Algo salio mal",
                })
            })
    }

    return (
        <div>
            <form className="credits__edit" onSubmit={submit}>
                <h3>Agregar creditos:</h3>
                <div className="form__container">
                    <div className='form-group'>
                        <label htmlFor="">Creditos</label>
                        <InputWithIcon>
                            <CoinsIcon />
                            <input onChange={inputOnChange} value={formData.credits} required type="number" min="1" className='form-control' name="credits" id="" />
                        </InputWithIcon>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Conecciones</label>
                        <InputWithIcon>
                            <HouseWifiIcon />
                            <input onChange={inputOnChange} value={formData.conexion} required type="number" min="1" className='form-control' name="conexion" id="" />
                        </InputWithIcon>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Description:</label>
                        <InputWithIcon>
                            <InfoIcon />
                            <input onChange={inputOnChange} value={formData.description} required type="text" className='form-control' name="description" id="" />
                        </InputWithIcon>
                    </div>
                </div>
                {!loadingAddCredits && <button className='btn btn-primary'>Agregar</button>}
            </form>

        </div>
    )
}
