import React from 'react'

export const AuthData = ({user}) => {
  return (
    <div>
        <div className="email"><span className='fw-bold m-2'>Email:</span>{user.auth.email}</div>
        <div className="password"><span className='fw-bold m-2'>Password:</span> {user.auth.password}</div>
    </div>
  )
}
