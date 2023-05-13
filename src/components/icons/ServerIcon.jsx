import React from 'react'
import Modal from '../modal/Modal'
import { useState } from 'react'

export const ServerIcon = (props) => {
  return (
    <i {...props} className={`fa-solid fa-server ${props.className}`}></i>
  )
}
