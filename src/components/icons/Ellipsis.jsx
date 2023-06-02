import React from 'react'

export const Ellipsis = (props) => {
    return (
        <i {...props} className={`fa-solid fa-ellipsis ${props.className}`}></i>
    )
}
