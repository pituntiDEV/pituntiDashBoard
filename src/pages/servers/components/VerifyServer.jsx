import React from 'react'

import { useState } from 'react'
import Modal from '../../../components/modal/Modal'
import { NetworkWireCheckIcon } from '../../../components/icons/NetworkWireCheckIcon'
import useFetchApi from '../../../hook/useFetchApi'
import { Spinner } from '../../../components/Spinner/Spinner'
import { useEffect } from 'react'
import { VerifyServerForm } from './VerifyServerForm'




export const VerifyServer = ({ server }) => {

    return (
        <div>
            <VerifyServerForm server={server} />

        </div>
    )
}
