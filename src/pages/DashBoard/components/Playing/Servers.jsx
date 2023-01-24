import React from 'react'

export const Servers = ({ playing }) => {
 
  return (
    <div>
      <h1>{playing.server.data.name}:</h1>

      {
        playing.sessions.map((session)=>{
          return (
            <div key={session.Session.id}>
                 {session.userDB.name}
            </div>
          )
        })
      }
    </div>
  )
}
