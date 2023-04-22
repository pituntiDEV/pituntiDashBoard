import React, { useState } from 'react'
import useFetchApi from '../../../../hook/useFetchApi';
import { CheckIcon } from '../../../icons/CheckIcon';
import { SearchIcon } from '../../../icons/SearchIcon';
import { UserTieIcon } from '../../../icons/UserTieIcon';
import "./SearchReseller.scss";
export const SearchReseller = ({ state, setState, title }) => {
  //State
  const [resellers, setReseller] = useState([]);
  const [email, setEmail] = useState("");

  //Custom Hooks
  const [getResellers, loading] = useFetchApi({
    url: "/api/resellers/search/5",
  })

  const searchReseller = (e) => {
    setState({ ...state, reseller: "" })
    getResellers({
      body: JSON.stringify({
        email
      })
    })
      .then(data => {
        setReseller(data);
      })
  }
  return (
    <div className="find">
      <div className="search__reseller">
        <div className='input'>
          <input type="search" required onChange={(e) => {
            setEmail(e.target.value);
          }} placeholder={`${title || 'Buscar reseller'}`} value={state.name} />
        </div>
        <div onClick={searchReseller} className="icon">
          <SearchIcon />
        </div>

      </div>

      <div className="resellers">
        {resellers.length > 0 && <h3>Reseller:</h3>}
        <div className="resellers-container d-flex gap-3">
          {resellers.map(reseller => {
            return (
              <div onClick={() => {
                setState({ ...state, reseller: reseller._id })
              }} key={reseller._id} className={`p-2 reseller ${state.reseller == reseller._id && "selected"}`}>
                {state.reseller == reseller._id && <CheckIcon />}
                <small><UserTieIcon /> {reseller.name}</small>
                <p><small>{reseller.email}</small></p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
