import React from 'react'

export const AuthData = ({user}) => {
    const  copySomething=async()=> {
        try {
          const toCopy = `
Email:${user.auth.email}\n
Password:${user.auth.password}
          `
          await navigator.clipboard.writeText(toCopy);
          console.log('Text or Page URL copied');
        }
        catch (err) {
          console.error('Failed to copy: ', err);
        }
      }

     
  return (
    <div>
        <div className="email"><span className='fw-bold m-2'>Email:</span>{user.auth.email}</div>
        <div className="password"><span className='fw-bold m-2'>Password:</span> {user.auth.password}</div>
        <button className='btn btn-info' onClick={copySomething}>Copy</button>
    </div>
  )
}
