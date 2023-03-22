import React, { useState } from 'react'
import { Devices } from './components/Devices/Devices'
import { Shared } from './components/Shared/Shared'

export const ByCode = () => {

  const [devicesState, setDevicesState] = useState(false);
  return (
    <div>

            <Shared setDevicesState={setDevicesState}/>
          <Devices  devicesState={devicesState} setDevicesState={setDevicesState}/>
    </div>
  )
}
