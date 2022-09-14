import React from 'react'
import { SearchIcon } from '../../icons/SearchIcon';
import "./SearchInput.scss";
export const SearchInput = (props) => {
    return (
        <div className='search'>
            <input {...props} type="search" />
            <SearchIcon/>
        </div>
    )
}
