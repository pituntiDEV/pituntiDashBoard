import React from 'react'
import "./Loading.scss"
export const Loading = ({ title }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <h1>
          {title || "Loading"}
          <span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        <div className="img">
          <hr />
          <img src="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif" alt="" />
        </div>
        </h1>
      </div>

    </div>
  )
}
