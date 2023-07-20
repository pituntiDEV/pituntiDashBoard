import React, { useContext, useState } from 'react'

import { NewUserBar } from '../../components/NewUserBar/NewUserBar'
import { UsersList } from '../../components/UsersList/UsersList'
import useFetchApi from '../../hook/useFetchApi'
import config from '../../config'
import { useEffect } from 'react'
import { Spinner } from '../../components/Spinner/Spinner'
import { Context, PlexUsersContext } from './PlexUsersContext';


export const Users = () => {

  return (
    <PlexUsersContext>
      <Context.Consumer>
        {({ loading }) => (
          <div className='Users container' style={{ position: "relative" }}>
            {loading ? <div className='loading'><Spinner /></div>
              : <>
                <NewUserBar users={[]} />
                <UsersList users={[]} />
              </>
            }
          </div>

        )

        }

      </Context.Consumer>

    </PlexUsersContext>
  )
}
