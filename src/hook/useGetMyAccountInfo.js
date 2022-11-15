import React from 'react'
import useFetchApi from './useFetchApi'

export const useGetMyAccountInfo = () => {
  const [getMyInfo,loading] = useFetchApi({
    url:`/api/auth/my-info`,
    method: 'GET',
  })
 return [getMyInfo,loading]
}
