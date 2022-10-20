import React from 'react'

export const TrashIcon = (props) => {
  return (
    <i {...props} className={`fa-regular fa-trash-can delete ${props.className}`}></i>
  )
}
