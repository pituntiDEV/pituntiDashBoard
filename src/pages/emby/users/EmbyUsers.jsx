import React, { useState } from 'react'
import { useEffect } from 'react'
import useFetchApi from '../../../hook/useFetchApi'
import { EmbyUsersList } from './components/EmbyUsersList/EmbyUsersList'
import { Header } from './components/Header/Header'
import { EmbyUsersContext } from './EmbyUsersContext'

export default function EmbyUsers() {
  return (
    <EmbyUsersContext>
      <Header />
      <EmbyUsersList />
    </EmbyUsersContext>
  )
}
