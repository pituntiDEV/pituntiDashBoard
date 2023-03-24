import React from 'react';
import { VictoryBar, VictoryChart } from 'victory';

const GraficaBarras = ({data,x,y}) => {
  // const data = [
  //   { month: 'Enero', ventas: 120 },
  //   { month: 'Febrero', ventas: 19 },
  //   { month: 'Marzo', ventas: 3 },
  //   { month: 'Abril', ventas: 5 },
  //   { month: 'Mayo', ventas: 2 },
  //   { month: 'Junio', ventas: 3 },
  // ];

  return (
    <VictoryChart>
      <VictoryBar style={{
       data: { 
        fill: "rgb(77, 175, 207)",
        width:20 
      }
      }} data={data} x={x} y={y} />
    </VictoryChart>
  );
};

export default GraficaBarras;
