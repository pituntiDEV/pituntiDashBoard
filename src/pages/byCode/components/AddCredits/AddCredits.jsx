import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';

export const AddCredits = ({ deviceToAddCredits,setOpenModal,setDevicesState }) => {

    //Sate
    const [availableCredits,setAvailableCredits] = useState([]);
    const [formData,setFormData] = useState({
        credits:0,
        deviceID:deviceToAddCredits._id
    })

    //Validat if is Owner
    const isOwner = deviceToAddCredits.admin == localStorage.getItem("_id");

    //Custom hooks

    const [addCredits] =useFetchApi({
        url:`/api/byCode/credits`,
        method: "POST",
    })
    const [getCredits] =useFetchApi({
        url:`/api/byCode/credits?provider=${deviceToAddCredits.admin}`,
        method: "GET",
    })

    useEffect(()=>{
       !isOwner && getCredits()
        .then(data=>{
           setAvailableCredits(data)
        }).catch(err=>{
            console.log(err);
        })
    },[deviceToAddCredits])

    const onChange =(e)=>{
       setFormData({...formData,credits:e.target.value})
    }
    const submit=async(e)=>{
        e.preventDefault();    
        try {
            const responce = await addCredits({
                body:JSON.stringify(formData)
            })
            console.log(responce);
            SWAlert.alert({
                title:`Creditos agregados a ${deviceToAddCredits.name}`
            })
            setOpenModal(false);
            setDevicesState(s=>!s)
        } catch (error) {
            console.log(error)
           SWAlert.error({
            title:error.message || "Error"
           })
        }
    }

    return (
        <form onSubmit={submit}>

            {isOwner ? <div className="form__group">
                <label htmlFor="credits">Credits:</label>
                <input placeholder='numero de creditos' onChange={onChange} min={"1"} required type="number" name="credist" id="credits" />
            </div>
                :
                <div className="form__group">
                    <label htmlFor="credits">Mes:</label>
                    <select onChange={onChange} name="credtis" defaultValue={""} id="credits">
                        <option value="" disabled>Selecciona Mes</option>
                        {
                            availableCredits.map((credits,index)=>{
                                return (
                                    <option key={credits._id} value={index+1}>{index+1}</option>
                                )
                            })
                        }
                    </select>
                </div>}


            <div className="button d-flex">
                <button  className='btn mt-3 flex-1 d-block btn-primary fs-3'>Agregar</button>
            </div>
        </form>
    )
}
