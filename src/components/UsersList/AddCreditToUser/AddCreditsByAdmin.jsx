import React from 'react'

export const AddCreditsByAdmin = ({ register, errors }) => {
  
  return (
    <div className='form_by_admin'>
      <div className="form-group">
        <label htmlFor="">Creditos:</label>
        <input className='input' type="number" min="1" {...register("credits", {
          required: true,
          min: 1
        })} />
        {errors.credits?.type == "min" && <small className='text-danger'>Min:1</small>}
        {errors.credits?.type == "required" && <small className='text-danger'>Is Required</small>}
      </div>
      <div className="form-group">
        <label htmlFor="">Conecciones</label>
        <input className="input" type="number" min="1"  {...register("connections", {
          required: true,
          min: 1
        })} />

        {errors.connections?.type == "min" && <small className='text-danger'>Min:1</small>}
        {errors.connections?.type == "required" && <small className='text-danger'>Is Required</small>}
      </div>
    </div>
  )
}
