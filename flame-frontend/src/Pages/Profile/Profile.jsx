// src/Pages/Profile/Profile.jsx

import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaPlus, FaUser } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [students, setStudents] = useState(['Student1', 'Student2']); // Replace with actual student data
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleBatchCreation = () => {
    // Logic for creating a batch
    console.log(`Batch Created: ${batchName}`);
    setShowModal(false);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Total Runs',
        data: [10, 15, 20, 25],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Successful Runs',
        data: [7, 12, 18, 22],
        fill: false,
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Failed Runs',
        data: [3, 3, 2, 3],
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

          <Card className="br3 shadow-2 mt4">
            <Card.Header className="bg-light-gray flex items-center">
              <span>Manage Batches</span>
              <Button variant="success" className="ml-auto" onClick={() => setShowModal(true)}>
                <FaPlus className="mr2" /> Create Batch
              </Button>
            </Card.Header>
            <ListGroup variant="flush">
              {students.map((student, index) => (
                <ListGroupItem key={index} onClick={() => handleStudentClick(student)}>
                  <FaUser className="mr2" /> {student}
                </ListGroupItem>
              ))}
            </ListGroup>
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
          {selectedStudent && (
            <Card className="br3 shadow-2 mt4">
              <Card.Body>
                <Card.Title className="tc">Progress of {selectedStudent}</Card.Title>
                <Line data={data} options={options} />
              </Card.Body>
            </Card>
          )}
          </Col>
       
          
          

      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="batchName">
              <Form.Label>Batch Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter batch name"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleBatchCreation}>
              Create Batch
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profile;
