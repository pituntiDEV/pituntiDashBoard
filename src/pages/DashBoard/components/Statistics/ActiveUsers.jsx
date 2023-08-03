import React, { useEffect, useState } from 'react'
import GraficaBarras from '../../../../components/Chart/GraficaBarras'
import useFetchApi from '../../../../hook/useFetchApi'
import "./ActiveUsers.scss";
import { Pie3DChart } from '../../../../components/Chart/Pie3DChart';
import { useGetAllUsers } from '../../../../hook/plex/useGetAllUsers';
import utils from "../../../../utils/date/index"
export const ActiveUsers = () => {
  const [data, setData] = useState([]);

  const [users] = useGetAllUsers();
  const usersActive = users.filter(u => !utils.isExpired(u.expireAt));
  const usersExpired = users.filter(u => utils.isExpired(u.expireAt));

  const dataToPie = [
    ["Task", "Users Status"],
    ["Activos", usersActive.length],
    ["Vencidos", usersExpired.length]
  ]


  const [getStatistics, loading] = useFetchApi({
    url: `/api/statistics/users/active`,
    method: 'GET',
  })
  const months = [
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
  useEffect(() => {
    getStatistics()
      .then(data => {
        const clean = data.map(({ _id, count, month, year }) => ({
          x: months[_id.month] + "-" + _id.year,
          y: count,
          fill: "blue"
        }));
        setData(clean)

      })
  }, [])
  return (
    <div className="graf">
      <h2>Usuarios</h2>
      <div className="info-users">
        <div className="users-count">
          <GraficaBarras data={data} x="x" y="y" />
        </div>

        <div className="pie">
          <Pie3DChart data={dataToPie} />

        </div>


      </div>

    </div>
  )
}
