import React from 'react'

export const NovedadItem = ({ icon, message }) => {
    return (
        <li>
            <div className="details">
                <span>{icon}</span>
                <span>{message}</span>
            </div>
        </li>
    )
}
