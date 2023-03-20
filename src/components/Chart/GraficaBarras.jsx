
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { LinearScale } from 'chart.js';
Line.register(LinearScale);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My Dataset',
      data: [10, 20, 30, 40, 50, 60, 70],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const GraficaBarras = () => (
 <div>
   <Line data={data} options={options} />

 </div>
);

export default GraficaBarras;