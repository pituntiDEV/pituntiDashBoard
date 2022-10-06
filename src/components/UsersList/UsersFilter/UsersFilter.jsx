import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useGetSellersByUsers } from '../../../hook/useGetSellersByUsers';
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';

import "./UsersFilter.scss";
export const UsersFilter = (props) => {

    const [getSellers,sellers] = useGetSellersByUsers(props.users)
    useEffect(()=>{
        getSellers()


    },[props])

  return (
    <div className='filter'>
               <div> <InputWithIcon>
                <i className="fa-solid fa-filter bg-warning "></i>
                <p className='title pl-1'>Filter By:</p>
                </InputWithIcon></div>
                <div className='inputs'>
                    <div className='inputFilter'>
                    <small>Estado:</small>
                    <InputWithIcon>
                    <i className="fa-solid fa-battery-half"></i>
                    <select {...props} name="state" id="" defaultValue={''}>
                        <option value="" disabled>Estado</option>
                        <option value="todos">Todos</option>
                        <option value="activos">Activos</option>
                        <option value="Vencidos">Vencidos</option>
                    </select>
                    </InputWithIcon>
                    </div>

                    <div className='inputFilter'>
                        <small> Seller:</small>
                        <InputWithIcon>
                        <i className="fa-solid fa-cash-register"></i>
                        {/* <select onChange={hanledChange}  name="" id="" defaultValue={''}> */}
                        <select {...props} name="seller" id="" defaultValue={''}>
                            <option value="" >All Sellers</option>
                            {sellers.map(seller => {
                                return (
                                    <option key={seller} value={seller}>{seller}</option>
                                )
                            })}

                        </select>

                        </InputWithIcon>

                    </div>
                </div>
            </div>
  )
}
