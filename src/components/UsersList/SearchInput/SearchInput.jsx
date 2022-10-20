import React from 'react'
import { SearchIcon } from '../../icons/SearchIcon';
import "./SearchInput.scss";
export const SearchInput = (props) => {
    const {onChange,value,click} = props;
    return (
        <div className='search'>
            <input placeholder='Buscar usuario'onChange={onChange} value={value}  type="search" />
            <SearchIcon onClick={click} />
        </div>
    )
}
