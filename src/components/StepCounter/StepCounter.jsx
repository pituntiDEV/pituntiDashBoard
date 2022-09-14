import React, { Fragment } from 'react'
import "./StepCounter.scss"
export const StepCounter = ({steps,step}) => {
    return (
    <div className="counter-steps">
        {Object.keys(steps).map((key, value) => {
            return (
                <Fragment key={key}>
                    <span
                        className={`counter 
                                ${key == step && "active"} 
                                ${step > key && "complete"}`}>
                        {key}
                    </span>
                   { Object.keys(steps).length > key && 
                   <span 
                   className={`line
                   ${key == step && "active"} 
                   ${step > key && "complete"}
                   `}>
                    </span>}
                </Fragment>
            )
        })
        }
    </div>
    )
}
