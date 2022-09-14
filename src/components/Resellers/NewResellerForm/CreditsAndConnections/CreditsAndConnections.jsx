import React from 'react'
import { InputWithIcon } from '../../../icons/InputWithIcon/InputWithIcon';
import "./CreditsAndConnections.scss";
export const CreditsAndConnections = ({state,setState}) => {
  return (
    <div className="credits__and__connections">
        
        <div className="credits box">
              <label htmlFor="credits">Credits:</label>
            <InputWithIcon>
            <i className="fa-solid fa-coins"></i>
              <input onChange={(e)=>setState({...state,credits:e.target.value})} value={state.credits} type="number" required min="1"/>
            </InputWithIcon>
        </div>
        <div className="connections box">
            <label htmlFor="connections">Connections:</label>
          <InputWithIcon>
            <i className="fa-solid fa-satellite-dish"></i>
              <input  onChange={(e)=>setState({...state,connections:e.target.value})} value={state.connections} type="number" required min="1"/>
          
          </InputWithIcon>
        </div>
    </div>
  )
}
