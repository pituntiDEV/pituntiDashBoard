import React, { useEffect, useState } from 'react'
import useFetchApi from '../../../hook/useFetchApi'

export const AddCreditsByReseller = ({send,user,register,errors}) => {
 //state
 const [state,setState] = useState({
  connections:[],
  credits:[],
 });
 const [connNumber,setConnNumber] = useState("");
  //Custom Hooks
  const [getCredits] = useFetchApi({
    url:`/api/credits/shared-available-by-provider/?provider=${user.admin._id}`,
    method: 'GET',
  })

  //Effects
  useEffect(()=>{
    getCredits().then((myCreditsAvailables)=>{
    
      //Buscando las conecciones disponibles
     const conn = myCreditsAvailables.reduce((acc,credit)=>{
      if(!acc.includes(credit.conexion)){
          acc.push(credit.conexion);
      }
      return acc.sort((a,b)=>a-b);
     },[]);


    //Buscando creditos disponibles
     const availableCredits = myCreditsAvailables.filter(credit=>credit.conexion==connNumber);
     setState({...state,connections:conn,credits:availableCredits})
    })
  },[send,connNumber])


 const inputChange=(e)=>{
  const value = e.target.value
  setConnNumber(value)
 }
 
  return (
    <div className='form_by_admin'>
       <div className="form-group">
      <label htmlFor="">Conecciones</label>
      <select {...register("connections",{
        required: true,
        min:1
      })} onChange={inputChange} defaultValue={""} className='input' >
        <option value="" disabled>Connecions</option>
        {
          state.connections.map(conn=>{
            return <option key={conn} value={conn}>{conn}</option>
          })
        }

      </select>

      {errors.connections?.type == "min" && <small className='text-danger'>Min:1</small>}
      {errors.connections?.type == "required" && <small className='text-danger'>Is Required</small>}
    </div>

    <div className="form-group">
      <label htmlFor="">Creditos:</label>
      <select {...register("credits",{
        required: true,
        min: 1,
      })} defaultValue={""}  className='input'>
        <option value="" disabled>Creditos</option>
        {
          state.credits.map((credit,i)=>{
            return <option key={credit._id} value={i+1}>{i+1}</option>
          })
        }
      </select>
      {errors.credits?.type == "min" && <small className='text-danger'>Min:1</small>}
      {errors.credits?.type == "required" && <small className='text-danger'>Is Required</small>}
    </div>
    
   
    
  </div>
  )
}
