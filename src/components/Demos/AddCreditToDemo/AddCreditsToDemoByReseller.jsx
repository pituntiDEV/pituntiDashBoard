import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useFetchApi from '../../../hook/useFetchApi'
import { BtnPrimary } from '../../Buttons/BtnSucess/BtnPrimary'
import { BtnSecondary } from '../../Buttons/BtnSucess/BtnSecondary'
import SWAlert from '../../SwAlert/SWAlert'

export const AddCreditsToDemoByReseller = ({ user,setOpenModal,setDemoState }) => {
  //State
  const [credits,setCredits]= useState([])
  const [availableCredits , setAvailableCredits] = useState([])
  const [connections,setConnections] = useState([])
  //Custom Hooks
  const [addCredits,loadingAddCredits] = useFetchApi({
    url:`/api/demos/credits/reseller/${user._id}`
  })

  const [getCredits, loading] = useFetchApi({
    url: `/api/credits/shared-available-by-provider/?provider=${user.admin}`,
    method: "GET",
})

  const {register,handleSubmit,watch,getValues,formState:{errors}}= useForm()

  //Effects
  useEffect(()=>{
    getCredits().then(data=>{
      const connectionsAvailable = data.reduce((acc,c)=>{
        if(!acc.includes(c.conexion)){
          if(c.new){
            acc.push(c.conexion);
          }
        }
        return acc;
      },[])
      setConnections(connectionsAvailable.sort((a,b)=>a-b));
      setCredits(data)
    })
  },[])

  useEffect(()=>{
    setAvailableCredits(credits.filter(c=>c.conexion==getValues("connections") && c.new===true));
  },[watch("connections")])

  //Functions
  const submit=(data)=>{
    addCredits({
      body: JSON.stringify(data)
    }).then(data=>{
      SWAlert.alert({
        title:data.message || "Success"
      })
      setOpenModal(false);
      setDemoState(d=>!d);
    }).catch(error=>{
      SWAlert.error({
        title:error.message || "Algo salio mal"
      })
    })
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="form-group">
        <label htmlFor="">Conexiones:</label>
        <select required {...register("connections",{
          required:"*Requerido"
        })}>
          <option value="">Seleccione:</option>
          {
            connections.map(conn=>{
              return <option>{conn}</option>
            })
          }
        </select>

        <span className='text-danger'>{errors.connections?.message}</span>
      </div>

      <div className="form-group mt-3">
        <label htmlFor="">Creditos:</label>
        <select required {...register("credits",{
          required:"*Requerido"
        })}>
          <option value="">Seleccione:</option>
          {
            availableCredits.map((c,i)=><option key={c._id}>{i+1}</option>)
          }
        </select>
        <span className='text-danger'>{errors.connections?.message}</span>
      </div>

    {!loadingAddCredits && <div className="btns">
        <BtnPrimary title="Agregar"/>
        <BtnSecondary title="Cancelar"/>
      </div>}
    </form>
  )
}
