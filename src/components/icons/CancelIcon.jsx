import React from 'react'

export const CancelIcon = ({...props}) => {
  return (
    <i {...props} className={`fa-solid fa-ban ${props.className}`}></i>
  )
}
