import React from 'react'
import { SearchIcon } from '../../../../components/icons/SearchIcon'
import "./Search.scss";
export const Search = (props) => {
  return (
    <div  className={`gdrive__search ${props.className}`}>
       <input type="text" onChange={props.onChange} />
       <SearchIcon onClick={props.onClick} />
    </div>
  )
}
