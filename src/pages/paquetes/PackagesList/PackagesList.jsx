import React, { useState } from 'react'
import { useEffect } from 'react';
import { BookIcon } from '../../../components/icons/BookIcon';
import { EditSquareIcon } from '../../../components/icons/EditSquareIcon';
import { ServerIcon } from '../../../components/icons/ServerIcon';
import useFetchApi from '../../../hook/useFetchApi';
import "./PackagesList.scss";
export const PackagesList = ({ server,newPackageState }) => {

  //States
  const [packages, setPackages] = useState([]);


  //Custom Hooks 
  const [getPackages, loadingGetPackages] = useFetchApi({
    url: `/api/package/plex/get/all`,
    method: 'GET',
  })



  useEffect(() => {
    getPackages().then(({ data }) => {
      setPackages(data);
      console.log(data);
    })
  }, [newPackageState])

  return (
    <div className="packages__list">

      <h2>Mis paquetes:</h2>
      <div className="packages_container">


        <div className="packages">
          {
            packages.map(pk => {
              return (
                <div className='package' key={pk._id}>
                   <div className="control">
                    <span><EditSquareIcon/></span>
                    <span className="num_libs"><BookIcon/> <small>{pk.libs.length}</small></span>

                  </div>

                  <div className="info">
                    <div className="img-container">
                      <img src={pk.account.data.user.thumb} alt="" />
                    </div>
                    <span>{pk.name}</span>
                    <span><ServerIcon/>  {pk.server.data.name}</span>
                  </div>
                 
                </div>
              )
            })
          }

        </div>

      </div>
    </div>

  )
}
