import React from 'react'
import useFetchApi from '../../hook/useFetchApi'
import config from '../../config'
import { useEffect } from 'react'
import { Layout } from './Layout'
import "./SuperUser.scss";
export const SuperUser = () => {
  const [validateSuperUser,loadingValidateSuperUser] = useFetchApi({
    url:config.apiUrls.superUser.validate,
    method:"GET",
  })

  //Effects

  //Validando si es superUser
  useEffect(()=>{
    validateSuperUser().then()
    .catch(erro=>window.location.href="/")
  },[])

  return (
    <Layout>

    </Layout>
  )
}
