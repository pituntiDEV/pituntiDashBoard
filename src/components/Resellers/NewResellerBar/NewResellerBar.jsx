import React from 'react'
import "./NewResellerBar.scss";
export const NewResellerBar = (props) => {
  const {totalResellers}=props;
  return (
    <div className='new__reseller__bar'>
        <div className='new__reseller__counter'>
            Total: {totalResellers} {totalResellers > 1 ? "Resellers":"Reseller"}
        </div>
        <div {...props} className='new__reseller__btn'>
        
            <button>Agregar nuevo RESELLER</button>
        </div>
    </div>
  )
}
