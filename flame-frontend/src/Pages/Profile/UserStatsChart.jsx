import React from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserStatsChart = ({ selectedStudent }) => {
  // Replace the sample data with actual student progress data
  const studentProgress = selectedStudent; // Assuming you have this data

  const data = {
    datasets: [
      {
        label: 'Total Runs',
        data: studentProgress.totalRuns || 0, // Replace with actual total runs data
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Successful Runs',
        data: studentProgress.successfulRuns || [24, 32, 43, 2],
        fill: false,
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Failed Runs',
        data: studentProgress.failedRuns || 0,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide x-axis labels (weeks)
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="br3 shadow-2 mt4">
      <Card.Body>
        <Card.Title className="tc">Progress of {selectedStudent.name}</Card.Title>
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default UserStatsChart;
