import React, { useEffect, useState } from 'react'
import GraficaBarras from '../../../../components/Chart/GraficaBarras'
import useFetchApi from '../../../../hook/useFetchApi'
import "./ActiveUsers.scss";
export const ActiveUsers = () => {
    const [data,setData] =useState([]);
    const [getStatistics,loading] = useFetchApi({
        url:`/api/statistics/users/active`,
        method: 'GET',
    })
    const months=[
        "noda",
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "agos",
        "sep",
        "oct",
        "nov",
        "dic",
    ]
    useEffect(()=>{
        getStatistics()
            .then(data=>{
                const clean=data.map(({ _id, count,month,year }) => ({
                    x: months[_id.month]+"-"+_id.year,
                    y: count,
                    fill:"blue"
                  }));
                console.log(clean);
                setData(clean)

            })
    },[])
  return (
    <div className="graf">
        <h2>Usuarios por mes</h2>
        <GraficaBarras data={data} x="x" y="y" />
        
    </div>
  )
}
