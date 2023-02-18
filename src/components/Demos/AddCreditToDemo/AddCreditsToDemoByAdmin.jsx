import React from 'react'
import { useForm } from 'react-hook-form'
import useFetchApi from '../../../hook/useFetchApi';
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary';
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary';
import SWAlert from '../../SwAlert/SWAlert';

export const AddCreditsToDemoByAdmin = ({ user,setOpenModal,setDemoState }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addCredits, loadingAddCredits] = useFetchApi({
        url: `/api/demos/credits/${user._id}`,
        method: 'POST',
    })
    const submit = (data) => {
        addCredits({
            body:JSON.stringify(data)
        }).then(data=>{
            SWAlert.alert({
                title:data.message || "EXITO"
            })
            setDemoState(s=>!s);
            setOpenModal(false)
        }).catch(error=>{
            SWAlert.error({
                title:error.message || "Algo salio mal"
            })
        })
    }
    return (
        <div className='admin'>
            <form onSubmit={handleSubmit(submit)} action="">
                <div className="form-group">
                    <label htmlFor="">Mes:</label>
                    <input min="1" type="number" {...register("credits", {
                        required: "*Requerido",
                        min: {
                            value: 1,
                            message: "Min 1"
                        }
                    })} />
                    <span className='text-danger'>{errors.credits?.message}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="">Conexiones:</label>
                    <input min="1" type="number" {...register("connections", {
                        required: "*Requerido",
                        min: {
                            value: 1,
                            message: "Min 1"
                        }
                    })} />
                    <span className='text-danger'>{errors.connections?.message}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="" className='text-muted'>
                        <input type="checkbox" {...register("removeLibs")} />
                        Quitar Libs despues de vencido en [dias]:
                    </label>
                    <input min={0} {...register("removeLibsDays", {
                        required: "*Requerido",
                        min: {
                            value: 0,
                            message: "Min 1"
                        }
                    })} type="number" />
                    <span className='text-danger'>{errors.removeLibsDays?.message}</span>
                </div>

                <div className="form-group">

                    <label htmlFor="" className='text-muted'><input type="checkbox" {...register("delete")} /> Eliminar Usuario despues de Vecido en:</label>
                    <input {...register("deleteDays", {
                        required: "*Requerido",
                        min: {
                            value: 0,
                            message: "Min 1"
                        }
                    })} min={0} type="number" />
                    <span className='text-danger'>{errors.deleteDays?.message}</span>
                </div>

                <div className="btns">
                    <BtnPrimary title="Agregar" />
                    <BtnSecondary title="Cancelar" />
                </div>

            </form>
        </div>
    )
}
