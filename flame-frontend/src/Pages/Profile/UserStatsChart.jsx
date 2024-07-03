import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const UserStatsChart = ({selectedStudent}) => {
  // const selectedStudent = useSelector(state => state.student.selectedStudent);

  if (!selectedStudent) {
    return (
      <Card className="br3 shadow-2 mt4">
        <Card.Body>
          <Card.Title className="tc">No Student Selected</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const studentProgress = selectedStudent.stats;
  // Assuming this data is available

  const barData = {
    labels: ['Total Runs', 'Successful Runs', 'Failed Runs'],
    datasets: [
      {
        label: 'Runs',
        data: [
          studentProgress.totalRuns,
          studentProgress.successfulRuns,
          studentProgress.failedRuns
        ],
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 99, 132)'
        ],
      }
    ],
  };

  const lineData = {
    labels: solvedQuestions.map(q => new Date(q.date).toLocaleDateString()), // Example label
    datasets: [
      {
        label: 'Solved Questions',
        data: solvedQuestions.map(q => q.count),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
    <Card className="br3 shadow-2 mt2">
      <Card.Header className="bg-light-gray">{selectedStudent.name} Statistics</Card.Header>
      <Card.Body>
        <Card.Title className="tc">Progress of {selectedStudent.name}</Card.Title>
      
        <ListGroup variant="flush" className="mt3">
          <ListGroupItem>
            <strong>Total Codes Run:</strong> {studentProgress.totalRuns}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Successful Runs:</strong> {studentProgress.successfulRuns}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Failed Runs:</strong> {studentProgress.failedRuns}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Last Active:</strong> {new Date(studentProgress.lastActive).toLocaleString()}
          </ListGroupItem>
        </ListGroup>
        <hr/>
        <Bar data={barData} options={options} />
        <hr/>
        <Line data={lineData} options={options} />
      </Card.Body>
      <Card.Footer>
        <div className="mt3">
          <Button variant="danger" className="mr2 dib glow">
            Solved Questions
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default UserStatsChart;
