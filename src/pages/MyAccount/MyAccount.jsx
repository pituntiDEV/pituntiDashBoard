import React from 'react'
import { AccountInfo } from './AccountInfo/AccountInfo'
import "./MyAccount.scss"
import { Welcome } from './Welcome/Welcome'
export const MyAccount = () => {
  return (
    <div className="my_account">
      
      {localStorage.getItem("email_to_info") ?<AccountInfo/>:<Welcome/>}
        
    </div>
  )
}
