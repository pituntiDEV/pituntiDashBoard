import React from 'react'
import { useState } from 'react'
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../../../components/Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../../../components/SwAlert/SWAlert'
import { SearchInput } from '../../../../components/UsersList/SearchInput/SearchInput'
import useFetchApi from '../../../../hook/useFetchApi'
import "./NewUser.scss";
export const NewUser = ({setOpenModal}) => {
    //States
    const [state, setState] = useState({
        email: "",
        user: null,
        date: null
    })

    const [newPlan, setNewPlan] = useState({
        user: "",
        plan: "",
        expireAt: "",
        payment:"",
    })

    //Custom Hooks
    const [searchUser, loadingSearch] = useFetchApi({
        url: `/api/super/search/${state.email}`,
        method: 'GET',
    })

    const [newSale,loadingNewSale] = useFetchApi({
        url:`/api/sales`,
        method: 'POST',
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
    const addNewPlan = (e) => {
        e.preventDefault();
        newSale({
            body: JSON.stringify(newPlan)
        }).then(data=>{
            SWAlert.alert({
                title:"Plan Agregado",
            })
            setOpenModal(false);
            // console.log(data)
        }).catch((error)=>{
            SWAlert.error({
                title:"error"
            })
            // console.log(error);
        })
    }


    return (
        <form onSubmit={addNewPlan} className='container'>
            <SearchInput click={search} onChange={(e) => setState({ ...state, email: e.target.value })} value={state.email} />

            {state.user && <div>Actual Plan:{state.user.plan} {state.user.expireAt && `Expira ${state.user.expireAt}`}</div>}
            {state.user &&
                <div className="planes ">

                    <div className='expireAt'>
                        <label htmlFor="">Nueva Fecha:</label>
                        {/* <input type="date" required onChange={(e) => {
                            setNewPlan({ ...newPlan, expireAt: e.target.value })
                        }} /> */}

                        <select  required onChange={(e) => {
                            setNewPlan({ ...newPlan, expireAt: e.target.value })
                        }} defaultValue="">
                            <option value="" disabled> Meses a agregar </option>
                            <option value="1">1 mes</option>
                            <option value="2">2 meses</option>
                            <option value="3">3 meses</option>
                            <option value="6">6 meses</option>
                            <option value="9">9 meses</option>
                            <option value="12">12 meses</option>

                        </select>
                    </div>

                    <div>
                        <label htmlFor="">Plan:</label>
                        <select required name="plan" onChange={(e) => {
                            setNewPlan({ ...newPlan, plan: e.target.value })
                        }} id="" className='plan'>
                            <option value="">Selecciona plan</option>
                            {
                                Array(20).fill(1).map((v, i) => {
                                    return <option key={(i + 1) * 25} value={(i + 1) * 25} >{(i + 1) * 25} Usuarios</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='cobro'>
                        <label htmlFor="">$Cantidad  a pagar:</label>
                        <input required type="number" onChange={(e)=>{
                            setNewPlan({...newPlan,payment:e.target.value})
                        }} />
                    </div>
                    <div className='cobro'>
                        <label htmlFor="">Comentarios:</label>
                        <textarea required  cols="30" rows="1" onChange={(e)=>{
                            setNewPlan({ ...newPlan,comments:e.target.value});
                        }}></textarea>
                    </div>
                </div>}

            {state.user &&
                <div className="btns">
                    <BtnPrimary title="Agregar" />
                    <BtnSecondary title="Cancelar" />
                </div>}
        </form>
    )
}
