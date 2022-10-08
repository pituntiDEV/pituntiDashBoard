import React from 'react'

import { Chart } from "react-google-charts";


export const Lineal = ({data:users,server}) => {
  const data = [
    ["Element", "Reproduciendo", { role: "style" }],
    ["Users", users, "gold"],
  ];
  
  const options = {
    title: "Plex Playing Logs "+server.data.name,
    hAxis: { title: "", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };
  return (
    <Chart
    chartType="ColumnChart"
    data={data}
    options={options}
    legendToggle
  />
  )
}
