import React from 'react'
import "./Loading.scss"
export const Loading = () => {
  return (
    <div className="loading-container">
       <div className="loading-content">
       <h1>
            Loading
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </h1>
       </div>
    </div>
  )
}
