import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

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
      <VictoryBar 
      cornerRadius={{ topLeft:10,topRight:5}}
      theme={VictoryTheme.material}
      barRatio={0.8}
      alignment="start" style={{
       data: { 
        fill:  "#c43a31",
        width:30 
      }
      }} data={data} x={x} y={y} />
    </VictoryChart>
  );
};

export default GraficaBarras;
