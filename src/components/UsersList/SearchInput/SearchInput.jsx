import React from 'react'
import { SearchIcon } from '../../icons/SearchIcon';
import "./SearchInput.scss";
export const SearchInput = (props) => {
    const {onChange,name,value,click} = props;
    return (
        <div className='search'>
            <input placeholder={`${props.placeholder || "Buscar usuario"}`} onChange={onChange} name={name} value={value}  type="search" />
            <SearchIcon onClick={click} />
        </div>
    )
}
