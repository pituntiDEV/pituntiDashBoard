import React from 'react'
import { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../../components/SwAlert/SWAlert'
import { SearchInput } from '../../../../components/UsersList/SearchInput/SearchInput'
import useFetchApi from '../../../../hook/useFetchApi'
import "./NewUser.scss";
export const NewUser = () => {
    //States
    const [state, setState] = useState({
        email: "",
        user: null,
        date: null
    })

    const [newPlan, setNewPlan] = useState({
        user: "",
        plan: "",
        expireAt:""
    })

    //Custom Hooks
    const [searchUser, loadingSearch] = useFetchApi({
        url: `/api/super/search/${state.email}`,
        method: 'GET',
    })

    const search = () => {
        searchUser().then(data => {
            setState({ ...state, user: data })
            setNewPlan({ ...newPlan, user: data })
        }).catch(error => {
            SWAlert.error({
                title: error.message || "Algo salio mal"
            })
            setState({ ...state, user: null })
        })
    }
    const addNewPlan=(e)=>{
        e.preventDefault();
        console.log(newPlan);
    }


    return (
        <form onSubmit={addNewPlan} className='container'>
            <SearchInput click={search} onChange={(e) => setState({ ...state, email: e.target.value })} value={state.email} />

            {state.user && <div>Actual Plan:{state.user.plan} {state.user.expireAt && `Expera ${state.user.expireAt}`}</div>}
            {state.user &&
                <div className="planes ">
                    <div className='expireAt'>
                        <label htmlFor="">Nueva Fecha:</label>
                        <input type="date" required onChange={(e)=>{
                            setNewPlan({...newPlan,expireAt:e.target.value})
                        }} />
                    </div>
                    <div>
                        <label htmlFor="">Paquete:</label>
                        <select required name="plan" onChange={(e)=>{
                            setNewPlan({...newPlan, plan:e.target.value})
                        }} id="" className='plan'>
                            <option value="">Selecciona Paquete</option>
                            {
                                Array(20).fill(1).map((v, i) => {
                                    return <option key={(i + 1) * 25} value={(i + 1) * 25} >{(i + 1) * 25} Usuarios</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='cobro'>
                        <label htmlFor="">$Cantidad  a pagar:</label>
                        <input required type="number" />
                    </div>
                    <div className='cobro'>
                        <label htmlFor="">Comentarios:</label>
                        <textarea required name="" id="" cols="30" rows="1"></textarea>
                    </div>
                </div>}

                {state.user && 
                <div className="btns">
                    <BtnPrimary  title="Agregar"/>
                    <BtnSecondary title="Cancelar"/>
                </div>}
        </form>
    )
}
