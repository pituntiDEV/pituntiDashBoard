import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react'
import { Pack } from '../../../../components/Pack/Pack';
import NewUserContext from '../../../../context/NewUserContextProvider';
import { useGetAccountPackage } from '../../../../hook/useGetAccountPackage';
import "./Plan.scss";

export const AdminRole = () => {
    const {state,setState}=useContext(NewUserContext);
    const [getPackages, loading] = useGetAccountPackage();
    const [packages,setPackages] = useState([]);
    
    useEffect(()=>{
        getPackages().then(data => {
            setPackages(data)
        });
    },[])

  const handleChange=(e)=>{
      setState({
       ...state,
       [e.target.name]:e.target.value
      })
  }
  return (
    <div>
        <div className="packages-container">
          {packages.map(pack=><Pack key={pack._id} pack={pack}/>)}
        </div>
        <form action="">
           <div className="fecha-espesifica">
              <div className="fecha">
                <input onChange={(e)=>{
                  setState({
                    ...state,
                    byDate:e.target.checked,
                    months:"",
                    date:""
                  });
                }} type="checkbox" checked={state.byDate && "checked"} name="byDate" id="" />
                <label htmlFor="">Fecha especifica?</label>
              </div>
              {state.byDate ? <div>
                <input onChange={handleChange} value={state.date}  type="date" name="date" id="" />
              </div>:(
                <div className="by-month">
                  <select name="months" onChange={handleChange} id="" defaultValue={state.months}>
                    <option value="" disabled>Seleccione fechas</option>
                    <option value="1">1 Mes</option>
                    <option value="2">2 Meses</option>
                    <option value="3">3 Meses</option>
                    <option value="6">6 Meses</option>
                    <option value="12">12 Meses</option>
                  </select>
                </div>

              )}
              <div className="conexiones">
                <p>Conexiones:</p>
                <input type="number" onChange={handleChange} value={state.conexion} min={1} name="conexion" />
              </div>
           </div>

        </form>
    </div>
  )
}
