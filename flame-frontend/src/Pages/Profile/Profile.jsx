// src/Pages/Profile/Profile.jsx

import React from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic for logging out the user
    // For now, we can simply navigate to the login page
    navigate('/login');
  };

  // Data for the chart
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Total Runs',
        data: [10, 15, 20, 25], // Example data, replace with real data
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Successful Runs',
        data: [7, 12, 18, 22], // Example data, replace with real data
        fill: false,
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Failed Runs',
        data: [3, 3, 2, 3], // Example data, replace with real data
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container className="pa4">
      <Row>
        <Col xs={12} md={4} className="mb4">
          <Card className="br3 shadow-2">
            <Card.Body>
              <Card.Title className="f4">{user.name}</Card.Title>
              <Card.Subtitle className="mb2 text-muted">{user.email}</Card.Subtitle>
              <Card.Text>
                <strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}
              </Card.Text>
              <Button onClick={handleLogout} variant="danger" className="flex items-center">
                <FiLogOut className="mr2" /> Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card className="br3 shadow-2 mb4">
            <Card.Header className="bg-light-gray">User Statistics</Card.Header>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>Total Codes Run:</strong> {user.stats.totalRuns}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Successful Runs:</strong> {user.stats.successfulRuns}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Failed Runs:</strong> {user.stats.failedRuns}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Last Active:</strong> {new Date(user.stats.lastActive).toLocaleString()}
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="br3 shadow-2">
            <Card.Body>
              <Card.Title className="tc">Student Progress</Card.Title>
              <Line data={data} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
