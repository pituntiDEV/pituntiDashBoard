import React from 'react'
import { useContext } from 'react';
import NewUserContext from '../../../context/NewUserContextProvider';


export const Buttons = ({disabled=false,submit=()=>{}, end = false }={}) => {
   const {state,setStep}= useContext(NewUserContext);
    return (
        <div className="form-group btns d-flex gap-3 p-3">
            {
                end ?
                    <button
                        className={`btn btn-success px-5 mt-3 ${disabled && "disabled"}`}
                        onClick={() => {
                            if(disabled){
                                return ;
                            }

                            submit()
                        
                        }}>
                        Finish

                    </button>
                    :
                    <button
                        className="btn btn-primary px-5 mt-3"
                        disabled={disabled &&   "disabled"}
                        onClick={() => {
                            setStep(state.step + 1);
                        }} >
                        Next

                    </button>
            }

            {state.step != 1 && <button
                className="btn btn-secondary px-5 mt-3"
                onClick={() => {
                    setStep(state.step - 1);
                }}>
                Prev
            </button>}

        </div>
    )
}
