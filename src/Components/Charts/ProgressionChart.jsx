import React from 'react';
import { Doughnut } from 'react-chartjs-2';




import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pending } from '@mui/icons-material';
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressionChart = ({ completed, inProgress, pending }) => {
  const data = {
    labels: ['Completed', 'In Progress', 'Pending'], 
    datasets: [
      {
        label: 'Project Progression',
        data: [completed, inProgress, pending], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 206, 86, 0.6)', 
          'rgba(255, 99, 132, 0.6)', 
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 206, 86, 1)', 
          'rgba(255, 99, 132, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Progression',
      },
    },
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
export default ProgressionChart;
