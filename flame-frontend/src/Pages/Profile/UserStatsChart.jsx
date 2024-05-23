import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserStatsChart = ({ selectedStudent }) => {
  // Replace the sample data with actual student progress data
  const studentProgress = selectedStudent; // Assuming you have this data
  console.log(selectedStudent)
  const data = {
    labels: ['Total Runs', 'Successful Runs', 'Failed Runs'],
    datasets: [
      {
        label: 'Runs',
        
        data: [
          studentProgress.totalRuns || 45, 
          studentProgress.successfulRuns || 24, 
          studentProgress.failedRuns || 2
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
        <Card.Title className="tc">Progress of {selectedStudent.name}</Card.Title>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default UserStatsChart;
