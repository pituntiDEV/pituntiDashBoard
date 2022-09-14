import React from 'react'
import NewUserContext from '../../../context/NewUserContextProvider';
import { Buttons } from './Buttons';

export const UserInfo = () => {
     const {state,setState}=React.useContext(NewUserContext);
    const onChangeHandler =(e)=>{
        setState({...state,[e.target.name]:e.target.value});
    };
  return (
    <div className="newUser user-info">
        <h3>User info</h3>

  

       <div className="form-group">
         <label htmlFor="">Name:</label>
         <input 
            type="text" 
            className="form-control" 
            name="name"
            onChange={onChangeHandler}
            value={state.name}
            placeholder="Name"/>
       </div>

       <div className="form-group">
         <label htmlFor="">Email:</label>
         <input
            type="text" 
            className="form-control" 
            name="email"
            onChange={onChangeHandler}
            value={state.email}
            placeholder="Email"/>
       </div>

       <div className="form-group">
         <label htmlFor="">Detalles:</label>
         <input 
            type="text" 
            value={state.details} 
            className="form-control" 
            placeholder="Detaills"
            name="details"
            onChange={onChangeHandler}
        />
       </div>

       <Buttons />


    </div>
  )
}
