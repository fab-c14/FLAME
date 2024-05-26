import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserStatsChart = ({ selectedStudent }) => {
  if (!selectedStudent) {
    return (
      <Card className="br3 shadow-2 mt4">
        <Card.Body>
          <Card.Title className="tc">No Student Selected</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const studentProgress = selectedStudent;
  const data = {
    labels: ['Total Runs', 'Successful Runs', 'Failed Runs'],
    datasets: [
      {
        label: 'Runs',
        data: [
          studentProgress.totalRuns || 20,
          studentProgress.successfulRuns || 17.4,
          studentProgress.failedRuns || 3.6
        ],
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 99, 132)'
        ],
      }
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="br3 shadow-2 mt4">
      <Card.Body>
        <Card.Title className="tc">Progress of {studentProgress.name}</Card.Title>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default UserStatsChart;
