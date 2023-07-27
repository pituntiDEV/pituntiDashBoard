import React, { useState } from 'react'
import { NoRegisterContext } from './NoRegisterContext'
import { AccountSelector } from './components/AccountSelector/AccountSelector'
import { UserList } from './components/UsersList/UsersList'

export const NoRegisterUsers = () => {

    return (
        <NoRegisterContext>
            <AccountSelector />

            <UserList />

        </NoRegisterContext>
    )
}
