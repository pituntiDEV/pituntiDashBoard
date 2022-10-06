import React from 'react'

export const BtnSecondary = (props) => {
    const {title} = props
  return (
    <button {...props} className='btn btn-secondary'>{title}</button>
  )
}
