import React from 'react'

export const Options = ({ register, state, setState }) => {

    //Functions
    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <details>
                <summary>Options</summary>
                <div className="options">
                    <div className="option">
                        <label htmlFor="">Expire At:</label>
                        <div className="data">
                            
                            <input min="1" {...register("expireAt",{
                                required: true,
                                min:{
                                    value:1,
                                    message:"Min 1"
                                }
                            })} type="number" />

                            <select  {...register("format",{
                                 required: true,
                            })} >
                                <option value="hour">Hours</option>
                                <option value="day">Days</option>
                            </select>
                        </div>
                    </div>
                    <div className="option">
                        <label htmlFor="">Eliminar despues de vencido en:</label>
                        <div className="data">
                            <input min="0" {...register("deleteAt",{
                                min:0
                            })}  type="number"/>
                            <select {...register("formatToDelete")}>
                                <option value="hour">Hours</option>
                                <option value="day">Days</option>
                            </select>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    )
}
