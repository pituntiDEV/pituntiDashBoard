import React from 'react'
import "./Style.scss"
export const Circle = ({ title = "title", porcentage = "50", max = 100 }) => {
  const porcentajeUso = (porcentage / max) * 100
  return (
    <div className='circleChart'>

      <div className='porcentajes' style={{
        "--porcentaje": porcentage,
        "--color": porcentajeUso < 25 ? "#42b873" : porcentajeUso < 75 ? "#e79421" : "#c55c5c",
        "--max": max
      }} >
        <svg width="150" height="150">
          <circle r="65" cx="50%" cy="50%" pathLength={max} />
          <circle r="65" cx="50%" cy="50%" pathLength={max} />
        </svg>
        <span>

          {Math.round(porcentajeUso, 1)}%
          <small>{title}</small>
          {/* <small className='tiny'>{`${porcentage}/${max}`}</small> */}
        </span>
      </div>


    </div>
  )
}
