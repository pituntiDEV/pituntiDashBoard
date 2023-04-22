import React from 'react'
export const BtnPrimary = (props) => {
  const { title } = props
  return (
    <button {...props} className={`btn btn-primary ${props.className}`}>{title}</button>
  )
}
