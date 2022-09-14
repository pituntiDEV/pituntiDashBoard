import React from 'react'
import { useGetSellersByUsers } from '../../../hook/useGetSellersByUsers';
import { InputWithIcon } from '../../icons/InputWithIcon/InputWithIcon';

import "./UsersFilter.scss";
export const UsersFilter = (props) => {

    const [sellers] = useGetSellersByUsers(props.users)
  return (
    <div className='filter'>
               <p> <InputWithIcon>
                <i class="fa-solid fa-filter bg-warning "></i>
                <p className='title pl-1'>Filter By:</p>
                </InputWithIcon></p>
                <div className='inputs'>
                    <div className='inputFilter'>
                    <small>Estado:</small>
                    <InputWithIcon>
                    <i class="fa-solid fa-battery-half"></i>
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
                        <i class="fa-solid fa-cash-register"></i>
                        {/* <select onChange={hanledChange}  name="" id="" defaultValue={''}> */}
                        <select {...props} name="seller" id="" defaultValue={''}>
                            <option value="" >All Sellers</option>
                            {sellers().map(seller => {
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
