import React from 'react'
import { Servers } from '../Servers'
import { Server } from './Server/Server'

export const Sessions = ({sessions}) => {

   
  return (
    <div>
        {
            sessions.map(session =>{
                return <Server session={session}/>
            })
        }
    </div>
  )
}
